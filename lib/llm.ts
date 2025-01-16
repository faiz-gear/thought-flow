import { FlowData } from './stores/flow-store'
import { useSettingsStore } from './stores/settings-store'

export async function decomposeWorkflow(
  text: string,
  flowData: FlowData | null,
  nodeId: string | null,
  onPart: (part: { text: string; ratio: number }) => void
) {
  const settings = useSettingsStore.getState().settings

  const response = await fetch('/api/workflow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      flowData,
      nodeId,
      settings
    })
  })

  if (!response.ok) {
    throw new Error('Failed to decompose workflow')
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('Failed to get response reader')
  }

  let buffer = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = new TextDecoder().decode(value)
    buffer += chunk

    try {
      const result = JSON.parse(buffer)
      if (Array.isArray(result)) {
        result.forEach(onPart)
        break
      }
    } catch (e) {
      // Continue accumulating chunks until we have valid JSON
    }
  }
}
