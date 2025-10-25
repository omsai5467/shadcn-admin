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
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Send,
  Calendar,
  Trash2,
  Edit,
  Eye,
  Mail,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  MousePointer,
  AlertTriangle,
  Play,
  Pause,
  Copy,
  LayoutGrid,
  List as ListIcon,
  FileText,
  Target,
  Zap,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/_authenticated/campaigns/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Black Friday Sale 2024',
      subject: '🔥 50% OFF Everything - Black Friday Special!',
      status: 'sent',
      sender: 'hello@example.com',
      contactList: 'Newsletter Subscribers',
      totalRecipients: 15420,
      sent: 15420,
      delivered: 15200,
      opened: 8520,
      clicked: 3420,
      bounced: 220,
      unsubscribed: 45,
      spam: 12,
      scheduled: null,
      sentAt: '2024-11-25 09:00:00',
      createdAt: '2024-11-20',
      openRate: 56.05,
      clickRate: 22.21,
      bounceRate: 1.43,
      unsubRate: 0.29,
    },
    {
      id: 2,
      name: 'Product Launch - New Feature',
      subject: 'Introducing Our Revolutionary New Feature 🚀',
      status: 'scheduled',
      sender: 'product@example.com',
      contactList: 'Product Launch List',
      totalRecipients: 8934,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      spam: 0,
      scheduled: '2025-11-01 10:00:00',
      sentAt: null,
      createdAt: '2024-10-25',
      openRate: 0,
      clickRate: 0,
      bounceRate: 0,
      unsubRate: 0,
    },
    {
      id: 3,
      name: 'Weekly Newsletter #42',
      subject: 'Your Weekly Tech Digest - October Edition',
      status: 'sending',
      sender: 'newsletter@example.com',
      contactList: 'Newsletter Subscribers',
      totalRecipients: 12500,
      sent: 7800,
      delivered: 7650,
      opened: 3200,
      clicked: 890,
      bounced: 150,
      unsubscribed: 8,
      spam: 3,
      scheduled: null,
      sentAt: '2024-10-26 08:00:00',
      createdAt: '2024-10-24',
      openRate: 41.83,
      clickRate: 11.61,
      bounceRate: 1.96,
      unsubRate: 0.10,
    },
    {
      id: 4,
      name: 'Beta Testing Invitation',
      subject: 'You\'re Invited: Join Our Exclusive Beta Program',
      status: 'draft',
      sender: 'beta@example.com',
      contactList: 'Beta Testers',
      totalRecipients: 542,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      spam: 0,
      scheduled: null,
      sentAt: null,
      createdAt: '2024-10-26',
      openRate: 0,
      clickRate: 0,
      bounceRate: 0,
      unsubRate: 0,
    },
  ])

  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(search.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(search.toLowerCase()) ||
    campaign.status.toLowerCase().includes(search.toLowerCase())
  )

  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id))
  }

  const duplicateCampaign = (campaign: any) => {
    const newCampaign = {
      ...campaign,
      id: Date.now(),
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      spam: 0,
      scheduled: null,
      sentAt: null,
      createdAt: new Date().toISOString().split('T')[0],
      openRate: 0,
      clickRate: 0,
      bounceRate: 0,
      unsubRate: 0,
    }
    setCampaigns([newCampaign, ...campaigns])
  }

  // Stats
  const totalCampaigns = campaigns.length
  const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0)
  const totalOpened = campaigns.reduce((acc, c) => acc + c.opened, 0)
  const totalClicked = campaigns.reduce((acc, c) => acc + c.clicked, 0)
  const avgOpenRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(2) : 0
  const avgClickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(2) : 0

  if (selectedCampaign) {
    return (
      <UsersProvider>
        <Header fixed>
          <Search placeholder="Search campaigns..." />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <CampaignAnalytics
            campaign={selectedCampaign}
            onBack={() => setSelectedCampaign(null)}
          />
        </Main>
      </UsersProvider>
    )
  }

  return (
    <UsersProvider>
      <Header fixed>
        <Search
          placeholder="Search campaigns..."
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
                Email Campaigns
              </h2>
              <p className="text-muted-foreground mt-1">
                Create, manage and analyze your email marketing campaigns
              </p>
            </div>
            <div className="flex items-center gap-3">
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
              <CreateCampaignDialog />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatsCard
              icon={<Send className="w-5 h-5" />}
              label="Total Campaigns"
              value={totalCampaigns}
              color="blue"
            />
            <StatsCard
              icon={<Mail className="w-5 h-5" />}
              label="Emails Sent"
              value={totalSent.toLocaleString()}
              color="purple"
            />
            <StatsCard
              icon={<Eye className="w-5 h-5" />}
              label="Avg Open Rate"
              value={`${avgOpenRate}%`}
              color="green"
            />
            <StatsCard
              icon={<MousePointer className="w-5 h-5" />}
              label="Avg Click Rate"
              value={`${avgClickRate}%`}
              color="orange"
            />
            <StatsCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Total Clicks"
              value={totalClicked.toLocaleString()}
              color="teal"
            />
          </div>

          {/* Campaigns View */}
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <Send className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">No campaigns found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create your first campaign to start sending emails
                </p>
              </motion.div>
            ) : viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign, index) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    index={index}
                    onDelete={deleteCampaign}
                    onDuplicate={duplicateCampaign}
                    onViewAnalytics={() => setSelectedCampaign(campaign)}
                  />
                ))}
              </div>
            ) : (
              <CampaignTable
                campaigns={filteredCampaigns}
                onDelete={deleteCampaign}
                onDuplicate={duplicateCampaign}
                onViewAnalytics={setSelectedCampaign}
              />
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
    orange: 'from-orange-500/20 to-orange-500/5 text-orange-600 dark:text-orange-400',
    teal: 'from-teal-500/20 to-teal-500/5 text-teal-600 dark:text-teal-400',
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

const getStatusConfig = (status: string) => {
  const configs = {
    sent: {
      icon: CheckCircle2,
      label: 'Sent',
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-500/30',
    },
    sending: {
      icon: Activity,
      label: 'Sending',
      bg: 'bg-blue-500/20',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-500/30',
    },
    scheduled: {
      icon: Clock,
      label: 'Scheduled',
      bg: 'bg-purple-500/20',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-500/30',
    },
    draft: {
      icon: FileText,
      label: 'Draft',
      bg: 'bg-gray-500/20',
      text: 'text-gray-700 dark:text-gray-400',
      border: 'border-gray-500/30',
    },
    paused: {
      icon: Pause,
      label: 'Paused',
      bg: 'bg-amber-500/20',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-500/30',
    },
    failed: {
      icon: XCircle,
      label: 'Failed',
      bg: 'bg-red-500/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-500/30',
    },
  }
  return configs[status] || configs.draft
}

function CampaignCard({ campaign, index, onDelete, onDuplicate, onViewAnalytics }: any) {
  const statusConfig = getStatusConfig(campaign.status)
  const StatusIcon = statusConfig.icon

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
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground truncate mb-1">
                {campaign.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                {campaign.subject}
              </p>
              <Badge className={`${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          {campaign.status === 'sent' || campaign.status === 'sending' ? (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-muted-foreground">Open Rate</span>
                </div>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {campaign.openRate.toFixed(1)}%
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <MousePointer className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs text-muted-foreground">Click Rate</span>
                </div>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {campaign.clickRate.toFixed(1)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-4 mb-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">
                {campaign.totalRecipients.toLocaleString()} recipients
              </p>
              {campaign.scheduled && (
                <p className="text-xs text-muted-foreground mt-1">
                  Scheduled: {new Date(campaign.scheduled).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Details */}
          <div className="space-y-2 mb-4 pb-4 border-b border-border/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">From:</span>
              <span className="font-medium text-foreground truncate ml-2">{campaign.sender}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">List:</span>
              <span className="font-medium text-foreground truncate ml-2">{campaign.contactList}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium text-foreground">{campaign.createdAt}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {(campaign.status === 'sent' || campaign.status === 'sending') && (
              <Button
                size="sm"
                onClick={() => onViewAnalytics(campaign)}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
                Analytics
              </Button>
            )}
            {campaign.status === 'draft' && (
              <Button
                size="sm"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Send Now
              </Button>
            )}
            {campaign.status === 'scheduled' && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Edit className="w-3.5 h-3.5 mr-1.5" />
                Reschedule
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDuplicate(campaign)}
              className="hover:bg-primary/10"
            >
              <Copy className="w-3.5 h-3.5" />
            </Button>
            <DeleteCampaignDialog campaign={campaign} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CampaignTable({ campaigns, onDelete, onDuplicate, onViewAnalytics }: any) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Campaign</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Recipients</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Open Rate</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Click Rate</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
          </tr>
          </thead>
          <tbody>
          {campaigns.map((campaign: any, index: number) => {
            const statusConfig = getStatusConfig(campaign.status)
            const StatusIcon = statusConfig.icon

            return (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-foreground">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-xs">{campaign.subject}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-foreground">
                      {campaign.sent > 0 ? `${campaign.sent.toLocaleString()} / ` : ''}
                      {campaign.totalRecipients.toLocaleString()}
                    </span>
                </td>
                <td className="px-6 py-4">
                  {campaign.sent > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-[80px]">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${Math.min(campaign.openRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {campaign.openRate.toFixed(1)}%
                        </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {campaign.sent > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-[80px]">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.min(campaign.clickRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {campaign.clickRate.toFixed(1)}%
                        </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString() : campaign.createdAt}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {(campaign.status === 'sent' || campaign.status === 'sending') && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewAnalytics(campaign)}
                        className="hover:bg-primary/10 hover:text-primary hover:border-primary"
                      >
                        <BarChart3 className="w-3.5 h-3.5 mr-1" />
                        Analytics
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDuplicate(campaign)}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <DeleteCampaignDialog campaign={campaign} onDelete={onDelete} />
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

function CampaignAnalytics({ campaign, onBack }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-muted"
      >
        <ArrowUpRight className="w-4 h-4 mr-2 rotate-180" />
        Back to Campaigns
      </Button>

      {/* Campaign Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{campaign.name}</h2>
            <p className="text-muted-foreground">{campaign.subject}</p>
          </div>
          <Badge className={`${getStatusConfig(campaign.status).bg} ${getStatusConfig(campaign.status).text} border ${getStatusConfig(campaign.status).border}`}>
            {getStatusConfig(campaign.status).label}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          icon={<Send className="w-5 h-5" />}
          label="Total Sent"
          value={campaign.sent.toLocaleString()}
          subValue={`${campaign.totalRecipients.toLocaleString()} recipients`}
          color="blue"
        />
        <MetricCard
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="Delivered"
          value={campaign.delivered.toLocaleString()}
          subValue={`${((campaign.delivered / campaign.sent) * 100).toFixed(2)}% delivery rate`}
          color="green"
          trend="up"
        />
        <MetricCard
          icon={<Eye className="w-5 h-5" />}
          label="Opened"
          value={campaign.opened.toLocaleString()}
          subValue={`${campaign.openRate.toFixed(2)}% open rate`}
          color="purple"
          trend="up"
        />
        <MetricCard
          icon={<MousePointer className="w-5 h-5" />}
          label="Clicked"
          value={campaign.clicked.toLocaleString()}
          subValue={`${campaign.clickRate.toFixed(2)}% click rate`}
          color="orange"
          trend="up"
        />
      </div>

      {/* Engagement Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2"></div>
      {/* Engagement Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <MetricCard
          icon={<AlertCircle className="w-5 h-5" />}
          label="Bounced"
          value={campaign.bounced.toLocaleString()}
          subValue={`${campaign.bounceRate.toFixed(2)}% bounce rate`}
          color="red"
          trend="down"
        />
        <MetricCard
          icon={<XCircle className="w-5 h-5" />}
          label="Unsubscribed"
          value={campaign.unsubscribed.toLocaleString()}
          subValue={`${campaign.unsubRate.toFixed(2)}%`}
          color="gray"
          trend="down"
        />
        <MetricCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Marked Spam"
          value={campaign.spam.toLocaleString()}
          subValue={`${((campaign.spam / campaign.sent) * 100).toFixed(2)}%`}
          color="amber"
          trend="down"
        />
      </div>

      {/* Timeline / Scheduled Info */}
      {campaign.scheduled && (
        <div className="mb-8 p-4 bg-muted/20 rounded-xl border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Scheduled Send</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(campaign.scheduled).toLocaleString()}
          </p>
        </div>
      )}

      {/* Optional Charts */}
      <div className="mb-8 p-4 bg-card border border-border rounded-xl shadow-sm">
        <h4 className="text-lg font-semibold text-foreground mb-4">Engagement Chart</h4>
        <p className="text-sm text-muted-foreground">(You can integrate chart library here like Chart.js, Recharts, or ApexCharts)</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {campaign.status === 'draft' && (
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="w-4 h-4 mr-2" />
            Send Campaign
          </Button>
        )}
        {campaign.status === 'scheduled' && (
          <Button size="sm" variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Reschedule
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={onBack}>
          <ArrowUpRight className="w-4 h-4 mr-2 rotate-180" />
          Back
        </Button>
      </div>
    </motion.div>
  )
}

// MetricCard Component
function MetricCard({ icon, label, value, subValue, color, trend }: any) {
  const trendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : null

  const colorClasses: any = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-emerald-600 dark:text-emerald-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    red: 'text-red-600 dark:text-red-400',
    gray: 'text-gray-600 dark:text-gray-400',
    amber: 'text-amber-600 dark:text-amber-400',
  }

  return (
    <div className="relative bg-card border border-border rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        {trendIcon && <trendIcon className={`w-4 h-4 ${colorClasses[color]}`} />}
      </div>
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      {subValue && <p className="text-xs text-muted-foreground mt-1">{subValue}</p>}
    </div>
  )
}

// DeleteCampaignDialog Component
function DeleteCampaignDialog({ campaign, onDelete }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="hover:bg-red-100 text-red-600 border-red-500">
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Campaign</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{campaign.name}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onDelete(campaign.id)}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Placeholder CreateCampaignDialog
function CreateCampaignDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary/90 flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Enter campaign details here...
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

