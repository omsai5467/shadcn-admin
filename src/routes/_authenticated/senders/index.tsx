import { createFileRoute } from '@tanstack/react-router'
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
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Mail,
  User,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit,
  Globe,
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/_authenticated/senders/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [senders, setSenders] = useState([
    {
      id: 1,
      email: 'hello@example.com',
      name: 'Marketing Team',
      domain: 'example.com',
      status: 'Active',
      emailsSent: 15420,
      lastUsed: '2025-10-25',
      createdAt: '2025-09-15',
      verified: true,
    },
    {
      id: 2,
      email: 'support@example.com',
      name: 'Support Team',
      domain: 'example.com',
      status: 'Active',
      emailsSent: 8934,
      lastUsed: '2025-10-26',
      createdAt: '2025-09-20',
      verified: true,
    },
    {
      id: 3,
      email: 'newsletter@testmail.io',
      name: 'Newsletter',
      domain: 'testmail.io',
      status: 'Pending',
      emailsSent: 0,
      lastUsed: 'Never',
      createdAt: '2025-10-24',
      verified: false,
    },
  ])

  const [search, setSearch] = useState('')

  const filteredSenders = senders.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const addSender = (senderData: any) => {
    const newSender = {
      id: Date.now(),
      email: `${senderData.email}@${senderData.domain}`,
      name: senderData.name,
      domain: senderData.domain,
      status: 'Pending',
      emailsSent: 0,
      lastUsed: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
      verified: false,
    }
    setSenders([newSender, ...senders])
  }

  const updateSender = (id: number, updatedData: any) => {
    setSenders(senders.map(s =>
      s.id === id
        ? { ...s, ...updatedData, email: `${updatedData.email}@${updatedData.domain}` }
        : s
    ))
  }

  const deleteSender = (id: number) => {
    setSenders(senders.filter(s => s.id !== id))
  }

  const totalSenders = senders.length
  const activeSenders = senders.filter(s => s.status === 'Active').length
  const totalEmailsSent = senders.reduce((acc, s) => acc + s.emailsSent, 0)

  return (
    <UsersProvider>
      <Header fixed>
        <Search
          placeholder="Search senders..."
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
                Email Senders
              </h2>
              <p className="text-muted-foreground mt-1">
                Manage sender identities for bulk email campaigns
              </p>
            </div>
            <AddSenderDialog onAdd={addSender} />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatsCard
              icon={<Mail className="w-5 h-5" />}
              label="Total Senders"
              value={totalSenders}
              color="blue"
            />
            <StatsCard
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="Active Senders"
              value={activeSenders}
              color="green"
            />
            <StatsCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Emails Sent"
              value={totalEmailsSent.toLocaleString()}
              color="purple"
            />
          </div>

          {/* Senders Grid */}
          <AnimatePresence mode="popLayout">
            {filteredSenders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <Mail className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">No senders found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create your first sender to start sending bulk emails
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSenders.map((sender, index) => (
                  <SenderCard
                    key={sender.id}
                    sender={sender}
                    index={index}
                    onDelete={deleteSender}
                    onUpdate={updateSender}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </Main>
    </UsersProvider>
  )
}

function StatsCard({ icon, label, value, color }: any) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400',
    green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400',
  }

  // @ts-ignore
  // @ts-ignore
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

function SenderCard({ sender, index, onDelete, onUpdate }: any) {
  const isActive = sender.status === 'Active'

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
        {/* Decorative corner gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-foreground truncate">
                  {sender.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">{sender.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-2">
            {sender.verified && (
              <div className="p-1.5 rounded-full bg-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          {isActive ? (
            <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Active
            </Badge>
          ) : (
            <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              <Clock className="w-3 h-3 mr-1" />
              Pending Verification
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Domain</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{sender.domain}</span>
          </div>

          <div className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Emails Sent</span>
            </div>
            <span className="text-sm font-semibold text-primary">
              {sender.emailsSent.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Created {sender.createdAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Last: {sender.lastUsed}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <EditSenderDialog sender={sender} onUpdate={onUpdate} />
          <DeleteConfirmDialog sender={sender} onDelete={onDelete} />
        </div>
      </div>
    </motion.div>
  )
}

function EditSenderDialog({ sender, onUpdate }: any) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: sender.name,
    email: sender.email.split('@')[0],
    domain: sender.domain,
  })

  const availableDomains = ['example.com', 'testmail.io']

  const handleUpdate = () => {
    if (formData.name.trim() && formData.email.trim()) {
      onUpdate(sender.id, formData)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
        >
          <Edit className="w-3.5 h-3.5 mr-1.5" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary" />
            Edit Sender
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update sender information
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Sender Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Sender Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Marketing Team"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Email Local Part */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Email Address
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="hello"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <span className="flex items-center text-muted-foreground font-medium">@</span>
              <select
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {availableDomains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Full email: {formData.email || 'hello'}@{formData.domain}
            </p>
          </div>

          <Button
            onClick={handleUpdate}
            disabled={!formData.name.trim() || !formData.email.trim()}
            className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DeleteConfirmDialog({ sender, onDelete }: any) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(sender.id)
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
            Delete Sender
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
            Are you sure you want to delete this sender?
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><strong>Name:</strong> {sender.name}</p>
            <p><strong>Email:</strong> {sender.email}</p>
            <p><strong>Emails Sent:</strong> {sender.emailsSent.toLocaleString()}</p>
          </div>
        </motion.div>

        <DialogFooter className="mt-6 flex gap-2 sm:gap-2">
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
                Delete Sender
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AddSenderDialog({ onAdd }: any) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'example.com',
  })

  const availableDomains = ['example.com', 'testmail.io']

  const handleAdd = () => {
    if (formData.name.trim() && formData.email.trim()) {
      onAdd(formData)
      setFormData({ name: '', email: '', domain: 'example.com' })
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
          Add Sender
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Create New Sender
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new sender identity for your bulk email campaigns
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Sender Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Sender Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Marketing Team"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Email Local Part */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Email Address
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="hello"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <span className="flex items-center text-muted-foreground font-medium">@</span>
              <select
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {availableDomains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Full email: {formData.email || 'hello'}@{formData.domain}
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700 dark:text-blue-300">
              <p className="font-semibold mb-1">Verification Required</p>
              <p>After creation, you'll need to verify this sender before sending emails.</p>
            </div>
          </div>

          <Button
            onClick={handleAdd}
            disabled={!formData.name.trim() || !formData.email.trim()}
            className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Sender
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}