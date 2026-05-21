import { ArrowLeft, Shield, Zap, Forward, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProtectionManagerPageProps {
  isOpen: boolean
  onClose: () => void
}

const protectionTools = [
  {
    icon: Shield,
    label: "Session Destroyer",
    description: "Terminate unauthorized sessions",
    color: "bg-red-500",
  },
  {
    icon: Zap,
    label: "OTP Destroyer",
    description: "Invalidate OTP codes",
    color: "bg-orange-500",
  },
  {
    icon: Forward,
    label: "OTP Forward",
    description: "Forward OTP to secure location",
    color: "bg-blue-500",
  },
  {
    icon: Clock,
    label: "Temp Bypass",
    description: "Temporary security bypass",
    color: "bg-purple-500",
  },
]

export function ProtectionManagerPage({ isOpen, onClose }: ProtectionManagerPageProps) {
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
        <h1 className="text-xl font-medium text-white">Protection Manager</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Hero Section */}
        <div className="bg-[#242f3d] rounded-xl p-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4 mx-auto">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-center text-white font-semibold text-lg mb-2">
            Account Protection
          </h2>
          <p className="text-center text-gray-400 text-sm">
            Advanced security tools to protect your account from unauthorized access
          </p>
        </div>

        {/* Protection Tools */}
        <div className="bg-[#242f3d] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <span className="text-sky-400 text-sm font-medium">Security Tools</span>
          </div>
          {protectionTools.map((tool, index) => (
            <button
              key={tool.label}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors",
                index !== protectionTools.length - 1 && "border-b border-white/5"
              )}
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", tool.color)}>
                <tool.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-medium">{tool.label}</p>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Warning */}
        <p className="text-gray-500 text-xs text-center mt-4 px-4">
          Use these tools responsibly. Misuse may result in account restrictions.
        </p>
      </div>
    </div>
  )
}
