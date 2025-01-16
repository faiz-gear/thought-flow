import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useSettingsStore } from '@/lib/stores/settings-store'
import { Settings2 } from 'lucide-react'

export function SettingsForm() {
  const { settings, updateSettings } = useSettingsStore()

  const handleTemperatureChange = (value: number[]) => {
    updateSettings({ temperature: value[0] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent" aria-label="Settings">
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>模型设置</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              模型
            </Label>
            <Input
              id="model"
              value={settings.modelName}
              className="col-span-3"
              onChange={(e) => updateSettings({ modelName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="temperature" className="text-right">
              温度
            </Label>
            <div className="col-span-3">
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={handleTemperatureChange}
              />
              <span className="text-sm text-muted-foreground mt-1 block">{settings.temperature}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiKey" className="text-right">
              API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={settings.openAIApiKey}
              className="col-span-3"
              onChange={(e) => updateSettings({ openAIApiKey: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="baseUrl" className="text-right">
              Base URL
            </Label>
            <Input
              id="baseUrl"
              value={settings.baseURL}
              className="col-span-3"
              onChange={(e) => updateSettings({ baseURL: e.target.value })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
