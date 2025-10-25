function EditListDialog({ list, onUpdate }: any) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: list.name,
    description: list.description,
    tags: list.tags,
  })
  const [tagSearch, setTagSearch] = useState('')

  const predefinedTags = ['Newsletter', 'Product', 'Launch', 'Beta', 'Testing', 'Marketing', 'Sales', 'Support', 'VIP', 'Active']

  const filteredPredefinedTags = predefinedTags.filter(tag =>
    tag.toLowerCase().includes(tagSearch.toLowerCase()) && !formData.tags.includes(tag)
  )

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t: string) => t !== tag) })
  }

  const handleUpdate = () => {
    if (formData.name.trim()) {
      onUpdate(list.id, formData)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
        >
          <Edit className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" />
            Edit Contact List
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              List Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Tags
            </label>

            <div className="mb-3">
              <div className="flex gap-2 mb-2">
                <div className="relative flex-1">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search or add custom tag..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && tagSearch.trim()) {
                        e.preventDefault()
                        if (!formData.tags.includes(tagSearch.trim())) {
                          setFormData({ ...formData, tags: [...formData.tags, tagSearch.trim()] })
                        }
                        setTagSearch('')
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <Button
                  onClick={() => {
                    if (tagSearch.trim() && !formData.tags.includes(tagSearch.trim())) {
                      setFormData({ ...formData, tags: [...formData.tags, tagSearch.trim()] })
                      setTagSearch('')
                    }
                  }}
                  size="sm"
                  disabled={!tagSearch.trim()}
                >
                  Add
                </Button>
              </div>

              {filteredPredefinedTags.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {filteredPredefinedTags.map(tag => {
                      const color = getTagColor(tag)
                      return (
                        <Badge
                          key={tag}
                          className={`cursor-pointer ${color.bg} ${color.text} border ${color.border} hover:opacity-80 transition-opacity`}
                          onClick={() => {
                            setFormData({ ...formData, tags: [...formData.tags, tag] })
                            setTagSearch('')
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag: string) => {
                  const color = getTagColor(tag)
                  return (
                    <Badge
                      key={tag}
                      className={`gap-1.5 ${color.bg} ${color.text} border ${color.border}`}
                    >
                      {tag}
                      <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => removeTag(tag)} />
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>

          <Button
            onClick={handleUpdate}
            disabled={!formData.name.trim()}
            className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header.tsx'
import { Search } from '@/components/search.tsx'
import { ThemeSwitch } from '@/components/theme-switch.tsx'
import { ProfileDropdown } from '@/components/profile-dropdown.tsx'
import { Main } from '@/components/layout/main'
import UsersProvider from '@/features/users/context/users-context.tsx'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Users,
  Calendar,
  Trash2,
  Edit,
  Eye,
  Upload,
  FileText,
  Mail,
  AlertCircle,
  CheckCircle2,
  ListChecks,
  TrendingUp,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  LayoutGrid,
  List as ListIcon,
  Tag as TagIcon
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/_authenticated/contact-lists/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [contactLists, setContactLists] = useState([
    {
      id: 1,
      name: 'Newsletter Subscribers',
      description: 'Active newsletter subscribers from Q4 2024',
      totalContacts: 15420,
      validEmails: 15200,
      bounced: 220,
      createdAt: '2025-09-15',
      updatedAt: '2025-10-20',
      tags: ['Newsletter', 'Active'],
      contacts: generateContacts(15420),
    },
    {
      id: 2,
      name: 'Product Launch List',
      description: 'Interested users for new product launch',
      totalContacts: 8934,
      validEmails: 8900,
      bounced: 34,
      createdAt: '2025-10-01',
      updatedAt: '2025-10-25',
      tags: ['Product', 'Launch'],
      contacts: generateContacts(8934),
    },
    {
      id: 3,
      name: 'Beta Testers',
      description: 'Early adopters and beta program participants',
      totalContacts: 542,
      validEmails: 540,
      bounced: 2,
      createdAt: '2025-10-10',
      updatedAt: '2025-10-24',
      tags: ['Beta', 'Testing'],
      contacts: generateContacts(542),
    },
  ])

  const [search, setSearch] = useState('')
  const [selectedList, setSelectedList] = useState(null)
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')

  const filteredLists = contactLists.filter((list) =>
    list.name.toLowerCase().includes(search.toLowerCase()) ||
    list.description.toLowerCase().includes(search.toLowerCase()) ||
    list.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const addContactList = (listData: any) => {
    const newList = {
      id: Date.now(),
      ...listData,
      totalContacts: listData.contacts.length,
      validEmails: listData.contacts.length,
      bounced: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    setContactLists([newList, ...contactLists])
  }

  const deleteList = (id: number) => {
    setContactLists(contactLists.filter(l => l.id !== id))
  }

  const updateList = (id: number, updatedData: any) => {
    setContactLists(contactLists.map(l =>
      l.id === id ? { ...l, ...updatedData, updatedAt: new Date().toISOString().split('T')[0] } : l
    ))
  }

  const totalContacts = contactLists.reduce((acc, list) => acc + list.totalContacts, 0)
  const totalLists = contactLists.length
  const avgContactsPerList = Math.round(totalContacts / totalLists) || 0

  if (selectedList) {
    return (
      <UsersProvider>
        <Header fixed>
          <Search placeholder="Search contacts..." />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <ContactListDetail
            list={selectedList}
            onBack={() => setSelectedList(null)}
            onUpdate={updateList}
          />
        </Main>
      </UsersProvider>
    )
  }

  return (
    <UsersProvider>
      <Header fixed>
        <Search
          placeholder="Search contact lists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Contact Lists
              </h2>
              <p className="text-muted-foreground mt-1">
                Organize and manage your email contact lists
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'card' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('card')}
                  className="px-3"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
              </div>
              <AddContactListDialog onAdd={addContactList} />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatsCard
              icon={<ListChecks className="w-5 h-5" />}
              label="Total Lists"
              value={totalLists}
              color="blue"
            />
            <StatsCard
              icon={<Users className="w-5 h-5" />}
              label="Total Contacts"
              value={totalContacts.toLocaleString()}
              color="green"
            />
            <StatsCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Avg per List"
              value={avgContactsPerList.toLocaleString()}
              color="purple"
            />
          </div>

          {/* Contact Lists Grid/List */}
          <AnimatePresence mode="popLayout">
            {filteredLists.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">No contact lists found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create your first contact list to start sending campaigns
                </p>
              </motion.div>
            ) : viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLists.map((list, index) => (
                  <ContactListCard
                    key={list.id}
                    list={list}
                    index={index}
                    onDelete={deleteList}
                    onView={() => setSelectedList(list)}
                    onUpdate={updateList}
                  />
                ))}
              </div>
            ) : (
              <ContactListTable
                lists={filteredLists}
                onDelete={deleteList}
                onView={setSelectedList}
                onUpdate={updateList}
              />
            )}
          </AnimatePresence>
        </div>
      </Main>
    </UsersProvider>
  )
}

function generateContacts(count: number) {
  const contacts = []
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'example.com']
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']

  for (let i = 0; i < Math.min(count, 100); i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const domain = domains[Math.floor(Math.random() * domains.length)]

    contacts.push({
      id: i + 1,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${domain}`,
      name: `${firstName} ${lastName}`,
      status: Math.random() > 0.1 ? 'valid' : 'bounced',
      addedAt: new Date(2025, 9, Math.floor(Math.random() * 26) + 1).toISOString().split('T')[0],
    })
  }

  return contacts
}

const TAG_COLORS = [
  { bg: 'bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500/30' },
  { bg: 'bg-purple-500/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-500/30' },
  { bg: 'bg-pink-500/20', text: 'text-pink-700 dark:text-pink-400', border: 'border-pink-500/30' },
  { bg: 'bg-orange-500/20', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-500/30' },
  { bg: 'bg-teal-500/20', text: 'text-teal-700 dark:text-teal-400', border: 'border-teal-500/30' },
  { bg: 'bg-indigo-500/20', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-500/30' },
  { bg: 'bg-cyan-500/20', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-500/30' },
  { bg: 'bg-rose-500/20', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-500/30' },
]

function getTagColor(tag: string) {
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return TAG_COLORS[hash % TAG_COLORS.length]
}

function StatsCard({ icon, label, value, color }: any) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400',
    green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-card border border-border rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50`} />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

function ContactListCard({ list, index, onDelete, onView, onUpdate }: any) {
  const validPercentage = Math.round((list.validEmails / list.totalContacts) * 100)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground truncate">
                  {list.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {list.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {list.tags.map((tag: string) => {
              const color = getTagColor(tag)
              return (
                <Badge
                  key={tag}
                  className={`text-xs ${color.bg} ${color.text} border ${color.border}`}
                >
                  {tag}
                </Badge>
              )
            })}
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Total Contacts</span>
              </div>
              <span className="text-sm font-bold text-primary">
                {list.totalContacts.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-foreground">Valid Emails</span>
              </div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {validPercentage}%
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {list.createdAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{list.updatedAt}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onView}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              View Contacts
            </Button>
            <EditListDialog list={list} onUpdate={onUpdate} />
            <DeleteListDialog list={list} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ContactListTable({ lists, onDelete, onView, onUpdate }: any) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tags</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contacts</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Valid Rate</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
          </tr>
          </thead>
          <tbody>
          {lists.map((list: any, index: number) => {
            const validPercentage = Math.round((list.validEmails / list.totalContacts) * 100)
            return (
              <motion.tr
                key={list.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{list.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{list.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {list.tags.map((tag: string) => {
                      const color = getTagColor(tag)
                      return (
                        <Badge
                          key={tag}
                          className={`text-xs ${color.bg} ${color.text} border ${color.border}`}
                        >
                          {tag}
                        </Badge>
                      )
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary">
                      {list.totalContacts.toLocaleString()}
                    </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${validPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {validPercentage}%
                      </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {list.createdAt}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onView(list)}
                      className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      View
                    </Button>
                    <EditListDialog list={list} onUpdate={onUpdate} />
                    <DeleteListDialog list={list} onDelete={onDelete} />
                  </div>
                </td>
              </motion.tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ContactListDetail({ list, onBack, onUpdate }: any) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchContact, setSearchContact] = useState('')
  const contactsPerPage = 20

  const filteredContacts = list.contacts.filter((contact: any) =>
    contact.email.toLowerCase().includes(searchContact.toLowerCase()) ||
    contact.name.toLowerCase().includes(searchContact.toLowerCase())
  )

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage)
  const startIndex = (currentPage - 1) * contactsPerPage
  const endIndex = startIndex + contactsPerPage
  const currentContacts = filteredContacts.slice(startIndex, endIndex)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lists
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {list.name}
            </h2>
            <p className="text-muted-foreground mt-1">{list.description}</p>
          </div>
          <AddContactsToListDialog list={list} onUpdate={onUpdate} />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Contacts</p>
          <p className="text-2xl font-bold text-foreground">{list.totalContacts.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Valid Emails</p>
          <p className="text-2xl font-bold text-emerald-600">{list.validEmails.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Bounced</p>
          <p className="text-2xl font-bold text-destructive">{list.bounced}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
          <p className="text-2xl font-bold text-primary">
            {Math.round((list.validEmails / list.totalContacts) * 100)}%
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts by email or name..."
          value={searchContact}
          onChange={(e) => setSearchContact(e.target.value)}
          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Contacts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Added Date</th>
            </tr>
            </thead>
            <tbody>
            {currentContacts.map((contact: any, index: number) => (
              <motion.tr
                key={contact.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-foreground">{contact.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{contact.email}</td>
                <td className="px-6 py-4">
                  {contact.status === 'valid' ? (
                    <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                      Valid
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30">
                      Bounced
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{contact.addedAt}</td>
              </motion.tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-muted/30 px-6 py-4 flex items-center justify-between border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} contacts
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-9"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AddContactListDialog({ onAdd }: any) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [] as string[],
    contacts: [] as any[],
  })
  const [currentTag, setCurrentTag] = useState('')
  const [importMethod, setImportMethod] = useState<'csv' | 'text'>('csv')
  const [textInput, setTextInput] = useState('')
  const [tagSearch, setTagSearch] = useState('')

  const predefinedTags = ['Newsletter', 'Product', 'Launch', 'Beta', 'Testing', 'Marketing', 'Sales', 'Support', 'VIP', 'Active']

  const filteredPredefinedTags = predefinedTags.filter(tag =>
    tag.toLowerCase().includes(tagSearch.toLowerCase()) && !formData.tags.includes(tag)
  )

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const emails = extractEmails(text)
    setFormData({ ...formData, contacts: emails })
  }

  const handleTextImport = () => {
    const emails = extractEmails(textInput)
    setFormData({ ...formData, contacts: emails })
  }

  const extractEmails = (text: string) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const matches = text.match(emailRegex) || []
    const uniqueEmails = [...new Set(matches)]

    return uniqueEmails.map((email, index) => ({
      id: index + 1,
      email: email,
      name: email.split('@')[0].replace(/[._]/g, ' '),
      status: 'valid',
      addedAt: new Date().toISOString().split('T')[0],
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] })
      setCurrentTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  const handleCreate = () => {
    if (formData.name.trim() && formData.contacts.length > 0) {
      onAdd(formData)
      setFormData({ name: '', description: '', tags: [], contacts: [] })
      setTextInput('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create List
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Create Contact List
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add contacts via CSV upload or paste emails directly
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* List Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              List Name *
            </label>
            <input
              type="text"
              placeholder="Newsletter Subscribers"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Description
            </label>
            <textarea
              placeholder="Describe this contact list..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Tags
            </label>

            {/* Tag Input with Search */}
            <div className="mb-3">
              <div className="flex gap-2 mb-2">
                <div className="relative flex-1">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search or add custom tag..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && tagSearch.trim()) {
                        e.preventDefault()
                        if (!formData.tags.includes(tagSearch.trim())) {
                          setFormData({ ...formData, tags: [...formData.tags, tagSearch.trim()] })
                        }
                        setTagSearch('')
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <Button
                  onClick={() => {
                    if (tagSearch.trim() && !formData.tags.includes(tagSearch.trim())) {
                      setFormData({ ...formData, tags: [...formData.tags, tagSearch.trim()] })
                      setTagSearch('')
                    }
                  }}
                  size="sm"
                  disabled={!tagSearch.trim()}
                >
                  Add
                </Button>
              </div>

              {/* Predefined Tags */}
              {filteredPredefinedTags.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {filteredPredefinedTags.map(tag => {
                      const color = getTagColor(tag)
                      return (
                        <Badge
                          key={tag}
                          className={`cursor-pointer ${color.bg} ${color.text} border ${color.border} hover:opacity-80 transition-opacity`}
                          onClick={() => {
                            setFormData({ ...formData, tags: [...formData.tags, tag] })
                            setTagSearch('')
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => {
                  const color = getTagColor(tag)
                  return (
                    <Badge
                      key={tag}
                      className={`gap-1.5 ${color.bg} ${color.text} border ${color.border}`}
                    >
                      {tag}
                      <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => removeTag(tag)} />
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>

          {/* Import Method Toggle */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Import Contacts *
            </label>
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                variant={importMethod === 'csv' ? 'default' : 'outline'}
                onClick={() => setImportMethod('csv')}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
              <Button
                type="button"
                variant={importMethod === 'text' ? 'default' : 'outline'}
                onClick={() => setImportMethod('text')}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-2" />
                Paste Text
              </Button>
            </div>

            {importMethod === 'csv' ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-primary font-semibold">Click to upload</span> or drag and drop
                  <br />
                  CSV or TXT files with email addresses
                </label>
              </div>
            ) : (
              <div>
                <textarea
                  placeholder="Paste emails here (one per line or comma-separated)&#10;&#10;Examples:&#10;john@example.com&#10;jane@example.com, bob@company.com&#10;alice@test.io"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-mono text-sm"
                />
                <Button
                  onClick={handleTextImport}
                  className="mt-2 w-full"
                  disabled={!textInput.trim()}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Detect & Import Emails
                </Button>
              </div>
            )}
          </div>

          {/* Imported Contacts Preview */}
          {formData.contacts.length > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {formData.contacts.length} emails detected and ready to import
                </p>
              </div>
              <div className="max-h-32 overflow-y-auto text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                {formData.contacts.slice(0, 10).map((contact, i) => (
                  <div key={i}>• {contact.email}</div>
                ))}
                {formData.contacts.length > 10 && (
                  <div className="font-semibold">... and {formData.contacts.length - 10} more</div>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={handleCreate}
            disabled={!formData.name.trim() || formData.contacts.length === 0}
            className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create List with {formData.contacts.length} Contacts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AddContactsToListDialog({ list, onUpdate }: any) {
  const [open, setOpen] = useState(false)
  const [importMethod, setImportMethod] = useState<'csv' | 'text'>('csv')
  const [textInput, setTextInput] = useState('')
  const [newContacts, setNewContacts] = useState<any[]>([])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const emails = extractEmails(text, list.contacts.length)
    setNewContacts(emails)
  }

  const handleTextImport = () => {
    const emails = extractEmails(textInput, list.contacts.length)
    setNewContacts(emails)
  }

  const extractEmails = (text: string, startId: number) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const matches = text.match(emailRegex) || []
    const uniqueEmails = [...new Set(matches)]

    return uniqueEmails.map((email, index) => ({
      id: startId + index + 1,
      email: email,
      name: email.split('@')[0].replace(/[._]/g, ' '),
      status: 'valid',
      addedAt: new Date().toISOString().split('T')[0],
    }))
  }

  const handleAdd = () => {
    if (newContacts.length > 0) {
      const updatedContacts = [...list.contacts, ...newContacts]
      onUpdate(list.id, {
        contacts: updatedContacts,
        totalContacts: updatedContacts.length,
        validEmails: updatedContacts.filter((c: any) => c.status === 'valid').length,
      })
      setNewContacts([])
      setTextInput('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Contacts
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Add Contacts to {list.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Import more contacts via CSV or paste text
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Import Method Toggle */}
          <div className="flex gap-2 mb-4">
            <Button
              type="button"
              variant={importMethod === 'csv' ? 'default' : 'outline'}
              onClick={() => setImportMethod('csv')}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </Button>
            <Button
              type="button"
              variant={importMethod === 'text' ? 'default' : 'outline'}
              onClick={() => setImportMethod('text')}
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              Paste Text
            </Button>
          </div>

          {importMethod === 'csv' ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload-add"
              />
              <label
                htmlFor="csv-upload-add"
                className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-primary font-semibold">Click to upload</span> or drag and drop
                <br />
                CSV or TXT files with email addresses
              </label>
            </div>
          ) : (
            <div>
              <textarea
                placeholder="Paste emails here...&#10;&#10;john@example.com&#10;jane@example.com, bob@company.com"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-mono text-sm"
              />
              <Button
                onClick={handleTextImport}
                className="mt-2 w-full"
                disabled={!textInput.trim()}
              >
                <Mail className="w-4 h-4 mr-2" />
                Detect & Import Emails
              </Button>
            </div>
          )}

          {/* Preview */}
          {newContacts.length > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {newContacts.length} new emails ready to add
                </p>
              </div>
              <div className="max-h-32 overflow-y-auto text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                {newContacts.slice(0, 10).map((contact, i) => (
                  <div key={i}>• {contact.email}</div>
                ))}
                {newContacts.length > 10 && (
                  <div className="font-semibold">... and {newContacts.length - 10} more</div>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={handleAdd}
            disabled={newContacts.length === 0}
            className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {newContacts.length} Contacts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


function DeleteListDialog({ list, onDelete }: any) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(list.id)
      setIsDeleting(false)
      setOpen(false)
    }, 600)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Delete Contact List
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This action cannot be undone
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg"
        >
          <p className="text-sm text-foreground mb-2">
            Are you sure you want to delete this contact list?
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><strong>Name:</strong> {list.name}</p>
            <p><strong>Contacts:</strong> {list.totalContacts.toLocaleString()}</p>
            <p><strong>Created:</strong> {list.createdAt}</p>
          </div>
        </motion.div>

        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete List
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}