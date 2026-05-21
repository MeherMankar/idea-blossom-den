import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { SearchHeader } from "@/components/telegram/search-header"
import { FilterTabs } from "@/components/telegram/filter-tabs"
import { ArchivedChats } from "@/components/telegram/archived-chats"
import { ChatItem } from "@/components/telegram/chat-item"
import { FabButton } from "@/components/telegram/fab-button"
import { Sidebar } from "@/components/telegram/sidebar"
import { ProfilePage } from "@/components/telegram/profile-page"
import { AuthFlow } from "@/components/telegram/auth/auth-flow"
import { SettingsPage } from "@/components/telegram/settings-page"
import { ContactsListPage } from "@/components/telegram/contacts-list-page"
import { BottomNav } from "@/components/telegram/bottom-nav"
import { UserProvider } from "@/contexts/user-context"
import { ProtectionManagerPage } from "@/components/telegram/protection-manager-page"
import { SpamMasterPage } from "@/components/telegram/spam-master-page"
import { CleanupPage } from "@/components/telegram/cleanup-page"
import { AutomationPage } from "@/components/telegram/automation-page"
import { SessionManagerPage } from "@/components/telegram/session-manager-page"

import { chats } from "@/lib/mock-data"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Telegram Chat" },
      { name: "description", content: "Telegram-style chat list webapp" },
    ],
  }),
  component: IndexPage,
})

const tabs = [
  { id: "all", icon: "all" as const, count: 297 },
  { id: "bots", icon: "bots" as const, count: 5 },
  { id: "people", icon: "people" as const, count: 3 },
  { id: "groups", icon: "groups" as const, count: 91 },
]

function IndexPage() {
  return (
    <UserProvider>
      <TelegramChatList />
    </UserProvider>
  )
}

function TelegramChatList() {
  const [searchValue, setSearchValue] = useState("")
  const [activeTab, setActiveTab] = useState("people")
  const [activeNavTab, setActiveNavTab] = useState<"chats" | "contacts" | "settings" | "profile">("chats")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAuthFlowOpen, setIsAuthFlowOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isContactsOpen, setIsContactsOpen] = useState(false)
  const [isProtectionManagerOpen, setIsProtectionManagerOpen] = useState(false)
  const [isSpamMasterOpen, setIsSpamMasterOpen] = useState(false)
  const [isCleanupOpen, setIsCleanupOpen] = useState(false)
  const [isAutomationOpen, setIsAutomationOpen] = useState(false)
  const [isSessionManagerOpen, setIsSessionManagerOpen] = useState(false)

  const handleNavTabChange = (tab: "chats" | "contacts" | "settings" | "profile") => {
    setActiveNavTab(tab)
    if (tab === "contacts") {
      setIsContactsOpen(true)
    } else if (tab === "settings") {
      setIsSettingsOpen(true)
    } else if (tab === "profile") {
      setIsProfileOpen(true)
    }
  }

  return (
    <div className="dark">
      <div className="min-h-screen bg-[#17212b] text-foreground max-w-md mx-auto relative pb-16">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onProfileClick={() => setIsProfileOpen(true)}
          onAddAccountClick={() => setIsAuthFlowOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
          onContactsClick={() => setIsContactsOpen(true)}
          onProtectionManagerClick={() => setIsProtectionManagerOpen(true)}
          onSpamMasterClick={() => setIsSpamMasterOpen(true)}
          onCleanupClick={() => setIsCleanupOpen(true)}
          onAutomationClick={() => setIsAutomationOpen(true)}
          onSessionManagerClick={() => setIsSessionManagerOpen(true)}
        />
        <SettingsPage isOpen={isSettingsOpen} onClose={() => { setIsSettingsOpen(false); setActiveNavTab("chats") }} />
        <ProfilePage isOpen={isProfileOpen} onClose={() => { setIsProfileOpen(false); setActiveNavTab("chats") }} />
        <ContactsListPage isOpen={isContactsOpen} onClose={() => { setIsContactsOpen(false); setActiveNavTab("chats") }} />
        <ProtectionManagerPage isOpen={isProtectionManagerOpen} onClose={() => setIsProtectionManagerOpen(false)} />
        <SpamMasterPage isOpen={isSpamMasterOpen} onClose={() => setIsSpamMasterOpen(false)} />
        <CleanupPage isOpen={isCleanupOpen} onClose={() => setIsCleanupOpen(false)} />
        <AutomationPage isOpen={isAutomationOpen} onClose={() => setIsAutomationOpen(false)} />
        <SessionManagerPage isOpen={isSessionManagerOpen} onClose={() => setIsSessionManagerOpen(false)} />
        <AuthFlow
          isOpen={isAuthFlowOpen}
          onClose={() => setIsAuthFlowOpen(false)}
          onSuccess={() => setIsAuthFlowOpen(false)}
        />

        <SearchHeader
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onMenuClick={() => setIsSidebarOpen(true)}
          title="People"
        />

        <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="divide-y divide-[#242f3d]">
          {chats.map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </div>

        <FabButton onClick={() => setIsContactsOpen(true)} />
        
        <BottomNav 
          activeTab={activeNavTab} 
          onTabChange={handleNavTabChange}
          unreadCount={297}
        />
      </div>
    </div>
  )
}
