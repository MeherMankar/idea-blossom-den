import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Zap,
  Wifi,
  Activity,
  MessageSquareReply,
} from "lucide-react"

interface AutomationPageProps {
  isOpen: boolean
  onClose: () => void
}

const automationItems = [
  {
    icon: Wifi,
    label: "Online Maker",
    description: "Keep your account appearing online",
  },
  {
    icon: Activity,
    label: "Activity Simulator",
    description: "Simulate typing and reading activity",
  },
  {
    icon: MessageSquareReply,
    label: "Auto Reply",
    description: "Automatically reply to messages",
  },
]

export function AutomationPage({ isOpen, onClose }: AutomationPageProps) {
  const handleAutomationAction = (label: string) => {
    console.log(`Automation action triggered: ${label}`)
    // TODO: Implement automation actions
  }

  return (
    <div
      style={{ zIndex: 70 }}
      className={cn(
        "fixed top-0 right-0 h-screen w-full max-w-md bg-[#17212b] flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-3 bg-[#17212b] border-b border-white/10">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-medium text-white">Automation</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Question Header */}
        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-base font-semibold text-white flex items-center gap-3">
            <Zap className="h-5 w-5 text-yellow-500" />
            What would you like to automate?
          </p>
        </div>

        {/* Automation Items List */}
        <div className="flex-1">
          <ul role="list">
            {automationItems.map(({ icon: Icon, label, description }) => (
              <li key={label} className="border-b border-white/10">
                <button
                  onClick={() => handleAutomationAction(label)}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors group"
                >
                  <Icon className="h-6 w-6 text-yellow-500 transition-colors flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <span className="text-[15px] font-semibold block text-white">
                      {label}
                    </span>
                    <span className="text-[13px] text-gray-400">
                      {description}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
