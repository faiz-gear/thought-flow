import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChatSettings {
  modelName: string
  temperature: number
  openAIApiKey: string
  baseURL: string
}

interface SettingsStore {
  settings: ChatSettings
  updateSettings: (settings: Partial<ChatSettings>) => void
}

const defaultSettings: ChatSettings = {
  modelName: 'deepseek-chat',
  temperature: 1,
  openAIApiKey: '',
  baseURL: ''
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }))
    }),
    {
      name: 'chat-settings'
    }
  )
)
