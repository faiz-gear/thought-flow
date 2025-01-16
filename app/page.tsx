'use client'

import { FlowChart } from '@/components/non-duplicate-level-wise-sequential-flow-chart'
import { SettingsForm } from '@/components/settings-form'

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <header className="fixed top-0 left-0 right-0 h-14 bg-background border-b z-50 flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">工作流程拆解</h1>
        <SettingsForm />
      </header>
      <div className="pt-14">
        <FlowChart />
      </div>
    </main>
  )
}
