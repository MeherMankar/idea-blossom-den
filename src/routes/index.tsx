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
import { UserProvider } from "@/contexts/user-context"

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
  { id: "all", label: "All", count: 122 },
  { id: "people", label: "People", count: 2 },
  { id: "bots", label: "Bots", count: 14 },
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
  const [activeTab, setActiveTab] = useState("all")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAuthFlowOpen, setIsAuthFlowOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isContactsOpen, setIsContactsOpen] = useState(false)

  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onProfileClick={() => setIsProfileOpen(true)}
          onAddAccountClick={() => setIsAuthFlowOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
          onContactsClick={() => setIsContactsOpen(true)}
        />
        <SettingsPage isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        <ProfilePage isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <ContactsListPage isOpen={isContactsOpen} onClose={() => setIsContactsOpen(false)} />
        <AuthFlow
          isOpen={isAuthFlowOpen}
          onClose={() => setIsAuthFlowOpen(false)}
          onSuccess={() => setIsAuthFlowOpen(false)}
        />

        <SearchHeader
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="divide-y divide-border/30">
          <ArchivedChats preview="Rss, MP3 320kbps, Lossless Music Co..." />
          {chats.map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </div>

        <FabButton onClick={() => setIsContactsOpen(true)} />
      </div>
    </div>
  )
}
