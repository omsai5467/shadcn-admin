import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Send, Calendar, Trash2, Edit, Eye, Mail, Users, TrendingUp, Clock, CheckCircle2, XCircle, AlertCircle, BarChart3, MousePointer, AlertTriangle, Play, Pause, Copy, LayoutGrid, List as ListIcon, FileText, Target, Zap, PieChart, ArrowUpRight, ArrowDownRight, Activity, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Header } from '@/components/layout/header.tsx'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown.tsx'
import { Search } from '@/components/search.tsx'
import { ThemeSwitch } from '@/components/theme-switch.tsx'
import UsersProvider from '@/features/users/context/users-context.tsx'


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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Engagement Funnel */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Engagement Funnel
          </h3>
          <div className="space-y-4">
            <FunnelItem label="Sent" value={campaign.sent} total={campaign.sent} color="blue" />
            <FunnelItem label="Delivered" value={campaign.delivered} total={campaign.sent} color="green" />
            <FunnelItem label="Opened" value={campaign.opened} total={campaign.sent} color="purple" />
            <FunnelItem label="Clicked" value={campaign.clicked} total={campaign.sent} color="orange" />
          </div>
        </div>

        {/* Issues & Problems */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Issues & Problems
          </h3>
          <div className="space-y-4">
            <IssueItem
              icon={<XCircle className="w-5 h-5 text-red-500" />}
              label="Bounced"
              value={campaign.bounced}
              percentage={campaign.bounceRate}
              color="red"
            />
            <IssueItem
              icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
              label="Spam Reports"
              value={campaign.spam}
              percentage={((campaign.spam / campaign.sent) * 100).toFixed(2)}
              color="amber"
            />
            <IssueItem
              icon={<Users className="w-5 h-5 text-gray-500" />}
              label="Unsubscribed"
              value={campaign.unsubscribed}
              percentage={campaign.unsubRate}
              color="gray"
            />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Campaign Details</h4>
          <div className="space-y-3">
            <DetailRow label="Sender" value={campaign.sender} />
            <DetailRow label="Contact List" value={campaign.contactList} />
            <DetailRow label="Created" value={campaign.createdAt} />
            {campaign.sentAt && <DetailRow label="Sent At" value={new Date(campaign.sentAt).toLocaleString()} />}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Performance Metrics</h4>
          <div className="space-y-3">
            <DetailRow
              label="Unique Opens"
              value={`${campaign.opened.toLocaleString()} (${campaign.openRate.toFixed(2)}%)`}
            />
            <DetailRow
              label="Unique Clicks"
              value={`${campaign.clicked.toLocaleString()} (${campaign.clickRate.toFixed(2)}%)`}
            />
            <DetailRow
              label="Click-to-Open Rate"
              value={`${((campaign.clicked / campaign.opened) * 100).toFixed(2)}%`}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Deliverability</h4>
          <div className="space-y-3">
            <DetailRow
              label="Delivery Rate"
              value={`${((campaign.delivered / campaign.sent) * 100).toFixed(2)}%`}
            />
            <DetailRow
              label="Bounce Rate"
              value={`${campaign.bounceRate.toFixed(2)}%`}
            />
            <DetailRow
              label="Unsub Rate"
              value={`${campaign.unsubRate.toFixed(2)}%`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MetricCard({ icon, label, value, subValue, color, trend }: any) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400',
    green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400',
    orange: 'from-orange-500/20 to-orange-500/5 text-orange-600 dark:text-orange-400',
  }

  return (
    <div className="relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-md">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-xs text-muted-foreground">{subValue}</p>
      </div>
    </div>
  )
}

function FunnelItem({ label, value, total, color }: any) {
  const percentage = ((value / total) * 100).toFixed(1)
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value.toLocaleString()} ({percentage}%)</span>
      </div>
      <div className="bg-muted rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${colorClasses[color]} h-3 rounded-full`}
        />
      </div>
    </div>
  )
}

function IssueItem({ icon, label, value, percentage, color }: any) {
  const colorClasses = {
    red: 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/30',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
    gray: 'text-gray-600 dark:text-gray-400 bg-gray-500/10 border-gray-500/30',
  }

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className={`text-xs ${colorClasses[color]}`}>{percentage}% of sent</p>
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}

function DetailRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  )
}

function CreateCampaignDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    sender: '',
    contactList: '',
    content: '',
    previewText: '',
  })
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [templateSearch, setTemplateSearch] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!isFullscreen && open) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Campaign
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Create Campaign
            </DialogTitle>
            <DialogDescription>
              Launch the campaign builder to create your email
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <Button
              onClick={() => setIsFullscreen(true)}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Open Campaign Builder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!isFullscreen) {
    return (
      <Button
        size="lg"
        onClick={() => {
          setOpen(true)
          setIsFullscreen(true)
        }}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create Campaign
      </Button>
    )
  }

  const templates = [
    { id: 1, name: 'Modern Newsletter', category: 'Newsletter', preview: '<div style="font-family: Arial; padding: 20px; background: #f5f5f5;"><div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px;"><h1 style="color: #333;">Welcome to our Newsletter</h1><p>Your content goes here...</p></div></div>' },
    { id: 2, name: 'Product Launch', category: 'Marketing', preview: '<div style="font-family: Arial; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"><div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px;"><h1 style="color: #667eea;">Introducing Our New Product</h1><p style="color: #666;">Get ready for something amazing...</p></div></div>' },
    { id: 3, name: 'Promotional Sale', category: 'Marketing', preview: '<div style="font-family: Arial; padding: 20px; background: #fff;"><div style="max-width: 600px; margin: 0 auto; border: 3px solid #ff6b6b; padding: 30px;"><h1 style="color: #ff6b6b; text-align: center;">50% OFF EVERYTHING!</h1><p style="text-align: center;">Limited time offer...</p></div></div>' },
    { id: 4, name: 'Minimalist Design', category: 'Newsletter', preview: '<div style="font-family: Georgia; padding: 40px; background: #fff;"><div style="max-width: 500px; margin: 0 auto;"><h2 style="font-weight: 300; color: #000;">Clean & Simple</h2><p style="line-height: 1.8; color: #555;">Elegant content design...</p></div></div>' },
  ]

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(templateSearch.toLowerCase())
  )

  const handleTemplateSelect = (template: any) => {
    setFormData({ ...formData, content: template.preview })
    setStep(3)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Campaign
        </Button>
      </DialogTrigger>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <div className="flex h-full">
              {/* Sidebar - Steps */}
              <div className="w-64 bg-muted/30 border-r border-border p-6 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">New Campaign</h2>
                </div>

                <div className="space-y-2 flex-1">
                  <StepItem
                    number={1}
                    title="Basic Info"
                    active={step === 1}
                    completed={step > 1}
                    onClick={() => setStep(1)}
                  />
                  <StepItem
                    number={2}
                    title="Choose Template"
                    active={step === 2}
                    completed={step > 2}
                    onClick={() => setStep(2)}
                  />
                  <StepItem
                    number={3}
                    title="Design Email"
                    active={step === 3}
                    completed={step > 3}
                    onClick={() => setStep(3)}
                  />
                  <StepItem
                    number={4}
                    title="Review & Send"
                    active={step === 4}
                    completed={false}
                    onClick={() => setStep(4)}
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsFullscreen(false)
                    setOpen(false)
                  }}
                  className="w-full mt-6"
                >
                  <X className="w-4 h-4 mr-2" />
                  Close Builder
                </Button>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <div className="flex-1 overflow-y-auto p-8">
                    <h3 className="text-2xl font-bold mb-6">Campaign Details</h3>
                    <div className="max-w-2xl space-y-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Campaign Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Black Friday Sale 2024"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Internal name for your reference</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email Subject *
                        </label>
                        <input
                          type="text"
                          placeholder="🔥 Don't miss our biggest sale of the year!"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Preview Text (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="This appears next to the subject in inbox..."
                          value={formData.previewText}
                          onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            From Email *
                          </label>
                          <select
                            value={formData.sender}
                            onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          >
                            <option value="">Select sender...</option>
                            <option value="hello@example.com">hello@example.com</option>
                            <option value="support@example.com">support@example.com</option>
                            <option value="newsletter@example.com">newsletter@example.com</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Contact List *
                          </label>
                          <select
                            value={formData.contactList}
                            onChange={(e) => setFormData({ ...formData, contactList: e.target.value })}
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          >
                            <option value="">Select list...</option>
                            <option value="Newsletter Subscribers">Newsletter Subscribers (15,420)</option>
                            <option value="Product Launch List">Product Launch List (8,934)</option>
                            <option value="Beta Testers">Beta Testers (542)</option>
                          </select>
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.subject || !formData.sender || !formData.contactList}
                        className="w-full bg-primary hover:bg-primary/90 mt-8"
                        size="lg"
                      >
                        Continue to Templates
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Template Selection */}
                {step === 2 && (
                  <div className="flex-1 overflow-y-auto p-8">
                    <h3 className="text-2xl font-bold mb-6">Campaign Details</h3>
                    <div className="max-w-2xl space-y-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Campaign Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Black Friday Sale 2024"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Internal name for your reference</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email Subject *
                        </label>
                        <input
                          type="text"
                          placeholder="🔥 Don't miss our biggest sale of the year!"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Preview Text (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="This appears next to the subject in inbox..."
                          value={formData.previewText}
                          onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            From Email *
                          </label>
                          <select
                            value={formData.sender}
                            onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          >
                            <option value="">Select sender...</option>
                            <option value="hello@example.com">hello@example.com</option>
                            <option value="support@example.com">support@example.com</option>
                            <option value="newsletter@example.com">newsletter@example.com</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Contact List *
                          </label>
                          <select
                            value={formData.contactList}
                            onChange={(e) => setFormData({ ...formData, contactList: e.target.value })}
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          >
                            <option value="">Select list...</option>
                            <option value="Newsletter Subscribers">Newsletter Subscribers (15,420)</option>
                            <option value="Product Launch List">Product Launch List (8,934)</option>
                            <option value="Beta Testers">Beta Testers (542)</option>
                          </select>
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.subject || !formData.sender || !formData.contactList}
                        className="w-full bg-primary hover:bg-primary/90 mt-8"
                        size="lg"
                      >
                        Continue to Templates
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Template Selection */}
                {step === 2 && (
                  <div className="flex-1 overflow-y-auto p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">Choose a Template</h3>
                      <p className="text-muted-foreground">Start with a professional template or build from scratch</p>
                    </div>

                    <div className="mb-6">
                      <input
                        type="text"
                        placeholder="Search templates..."
                        value={templateSearch}
                        onChange={(e) => setTemplateSearch(e.target.value)}
                        className="w-full max-w-md px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Blank Template */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary transition-all bg-card"
                        onClick={() => setStep(3)}
                      >
                        <div className="text-center">
                          <Plus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <h4 className="font-semibold mb-2">Start from Scratch</h4>
                          <p className="text-sm text-muted-foreground">Build your own custom design</p>
                        </div>
                      </motion.div>

                      {/* Template Cards */}
                      {filteredTemplates.map((template, index) => (
                        <motion.div
                          key={template.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all bg-card"
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <div className="h-48 bg-muted flex items-center justify-center p-4 overflow-hidden">
                            <div
                              className="scale-50 origin-top-left w-[200%]"
                              dangerouslySetInnerHTML={{ __html: template.preview }}
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold mb-1">{template.name}</h4>
                            <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Email Editor */}
                {step === 3 && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Editor Toolbar */}
                    <div className="border-b border-border p-4 flex items-center justify-between bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Import HTML
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground mr-2">Preview:</span>
                        <div className="flex items-center bg-muted rounded-lg p-1">
                          <Button
                            size="sm"
                            variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                            onClick={() => setPreviewMode('desktop')}
                            className="px-3"
                          >
                            Desktop
                          </Button>
                          <Button
                            size="sm"
                            variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                            onClick={() => setPreviewMode('mobile')}
                            className="px-3"
                          >
                            Mobile
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                      {/* HTML Editor Side */}
                      <div className="w-1/2 border-r border-border flex flex-col">
                        <div className="p-4 border-b border-border bg-muted/20">
                          <h4 className="font-semibold">HTML Editor</h4>
                          <p className="text-xs text-muted-foreground">Edit your email HTML code</p>
                        </div>
                        <div className="flex-1 overflow-hidden">
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full h-full p-4 bg-background border-0 focus:outline-none focus:ring-0 font-mono text-sm resize-none"
                        placeholder="<html>&#10;  <body>&#10;    <h1>Your email content here...</h1>&#10;    <p>Start typing or paste your HTML</p>&#10;  </body>&#10;</html>"
                      />
                        </div>
                      </div>

                      {/* Preview Side */}
                      <div className="w-1/2 flex flex-col bg-muted/10">
                        <div className="p-4 border-b border-border bg-muted/20">
                          <h4 className="font-semibold">Live Preview</h4>
                          <p className="text-xs text-muted-foreground">See how your email looks</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center">
                          <motion.div
                            key={previewMode}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`bg-white shadow-2xl ${
                              previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[600px]'
                            } transition-all duration-300`}
                          >
                            {/* Email Preview Header */}
                            <div className="border-b border-gray-200 p-4 bg-gray-50">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm text-gray-900">{formData.sender || 'sender@example.com'}</p>
                                  <p className="text-xs text-gray-500 truncate">to: recipient@example.com</p>
                                </div>
                              </div>
                              <h3 className="font-bold text-gray-900">{formData.subject || 'Email Subject'}</h3>
                              {formData.previewText && (
                                <p className="text-sm text-gray-600 mt-1">{formData.previewText}</p>
                              )}
                            </div>

                            {/* Email Content */}
                            <div
                              className="p-4"
                              dangerouslySetInnerHTML={{
                                __html: formData.content || '<p style="color: #999; text-align: center; padding: 40px;">Your email preview will appear here...</p>'
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="border-t border-border p-4 flex justify-between bg-muted/30">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        <ArrowUpRight className="w-4 h-4 mr-2 rotate-180" />
                        Back to Templates
                      </Button>
                      <Button
                        onClick={() => setStep(4)}
                        disabled={!formData.content}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Continue to Review
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Send */}
                {step === 4 && (
                  <div className="flex-1 overflow-y-auto p-8">
                    <h3 className="text-2xl font-bold mb-6">Review & Send</h3>

                    <div className="max-w-4xl space-y-6">
                      {/* Campaign Summary */}
                      <div className="bg-card border border-border rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Campaign Summary</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <DetailRow label="Campaign Name" value={formData.name} />
                          <DetailRow label="Subject Line" value={formData.subject} />
                          <DetailRow label="From Email" value={formData.sender} />
                          <DetailRow label="Contact List" value={formData.contactList} />
                          {formData.previewText && <DetailRow label="Preview Text" value={formData.previewText} />}
                        </div>
                      </div>

                      {/* Final Preview */}
                      <div className="bg-card border border-border rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Final Email Preview</h4>
                        <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <div
                            className="bg-white max-w-[600px] mx-auto"
                            dangerouslySetInnerHTML={{ __html: formData.content }}
                          />
                        </div>
                      </div>

                      {/* Send Options */}
                      <div className="flex gap-4">
                        <Button
                          size="lg"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Send Now
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="flex-1"
                        >
                          <Clock className="w-5 h-5 mr-2" />
                          Schedule Send
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="flex-1"
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          Save as Draft
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

function StepItem({ number, title, active, completed, onClick }: any) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        active ? 'bg-primary text-primary-foreground' : completed ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'hover:bg-muted'
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
        active ? 'bg-primary-foreground text-primary' : completed ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'
      }`}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : number}
      </div>
      <span className="font-medium">{title}</span>
    </motion.div>
  )
}

function DeleteCampaignDialog({ campaign, onDelete }: any) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(campaign.id)
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
            Delete Campaign
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
            Are you sure you want to delete this campaign?
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><strong>Name:</strong> {campaign.name}</p>
            <p><strong>Status:</strong> {campaign.status}</p>
            <p><strong>Recipients:</strong> {campaign.totalRecipients.toLocaleString()}</p>
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
                Delete Campaign
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}