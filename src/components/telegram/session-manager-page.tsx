import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  KeyRound,
  FileKey,
  FileText,
  FolderArchive,
  Database,
  LogIn,
} from "lucide-react"

interface SessionManagerPageProps {
  isOpen: boolean
  onClose: () => void
}

const sessionOptions = [
  {
    category: "Create Session",
    items: [
      { icon: FileKey, label: "Session File Login", description: "Login using a .session file" },
      { icon: FileText, label: "String Session", description: "Login using a string session" },
      { icon: FolderArchive, label: "Bulk Import (ZIP)", description: "Import multiple sessions from ZIP" },
      { icon: Database, label: "TData Import", description: "Import from Telegram Desktop tdata" },
    ]
  },
  {
    category: "Login",
    items: [
      { icon: LogIn, label: "Login via Session", description: "Use existing session to login" },
    ]
  }
]

export function SessionManagerPage({ isOpen, onClose }: SessionManagerPageProps) {

  const handleOptionClick = (label: string) => {
    console.log(`Session Manager action: ${label}`)
    // TODO: Implement session actions
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
        <h1 className="text-xl font-medium text-white">Session Manager</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Title Header */}
        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-base font-semibold text-white flex items-center gap-3">
            <KeyRound className="h-5 w-5 text-[#2AABEE]" />
            Manage your sessions
          </p>
        </div>

        {/* Session Options */}
        {sessionOptions.map((section) => (
          <div key={section.category}>
            {/* Section Header */}
            <div className="px-4 py-3 bg-[#0e1621]">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.category}
              </p>
            </div>

            {/* Section Items */}
            <ul role="list">
              {section.items.map(({ icon: Icon, label, description }) => (
                <li key={label} className="border-b border-white/10">
                  <button
                    onClick={() => handleOptionClick(label)}
                    className="w-full flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors group"
                  >
                    <Icon className="h-6 w-6 text-[#2AABEE] transition-colors flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <span className="text-[15px] font-semibold block text-white">
                        {label}
                      </span>
                      <span className="text-[13px] text-gray-400">{description}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
