import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header.tsx'
import { Search } from '@/components/search.tsx'
import { ThemeSwitch } from '@/components/theme-switch.tsx'
import { ProfileDropdown } from '@/components/profile-dropdown.tsx'
import { Main } from '@/components/layout/main'
import UsersProvider from '@/features/users/context/users-context.tsx'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Send,
  Eye,
  MousePointer,
  XCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/_authenticated/reports/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState('30days')
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  // Mock data - replace with real API data
  const overallStats = {
    totalCampaigns: 127,
    totalEmailsSent: 1245680,
    avgOpenRate: 24.3,
    avgClickRate: 3.8,
    avgBounceRate: 1.2,
    totalDelivered: 1230542,
    totalOpened: 302621,
    totalClicked: 47336,
    totalBounced: 14938,
    totalUnsubscribed: 2450,
    totalSpam: 340,
  }

  const campaignPerformance = [
    { id: 1, name: 'Black Friday Sale', sent: 45000, opened: 13500, clicked: 2700, openRate: 30, clickRate: 6, revenue: '$125,400' },
    { id: 2, name: 'Newsletter Oct', sent: 32000, opened: 7680, clicked: 1152, openRate: 24, clickRate: 3.6, revenue: '$12,200' },
    { id: 3, name: 'Product Launch', sent: 28000, opened: 8400, clicked: 2240, openRate: 30, clickRate: 8, revenue: '$89,500' },
    { id: 4, name: 'Welcome Series', sent: 15000, opened: 5250, clicked: 1050, openRate: 35, clickRate: 7, revenue: '$34,200' },
    { id: 5, name: 'Cart Abandonment', sent: 12000, opened: 4800, clicked: 1200, openRate: 40, clickRate: 10, revenue: '$67,800' },
  ]

  const timelineData = [
    { date: 'Oct 20', sent: 12400, opened: 2976, clicked: 446 },
    { date: 'Oct 21', sent: 15200, opened: 3648, clicked: 578 },
    { date: 'Oct 22', sent: 18600, opened: 4464, clicked: 744 },
    { date: 'Oct 23', sent: 21000, opened: 5040, clicked: 840 },
    { date: 'Oct 24', sent: 19800, opened: 4752, clicked: 792 },
    { date: 'Oct 25', sent: 16500, opened: 3960, clicked: 660 },
    { date: 'Oct 26', sent: 14200, opened: 3408, clicked: 568 },
  ]

  const topPerformers = {
    subjects: [
      { text: '🔥 50% OFF - Last Chance!', openRate: 42.5, campaigns: 3 },
      { text: 'Your exclusive invitation inside', openRate: 38.2, campaigns: 5 },
      { text: 'Quick question about your order', openRate: 35.8, campaigns: 2 },
      { text: 'New arrivals you\'ll love', openRate: 31.4, campaigns: 8 },
    ],
    devices: [
      { name: 'Mobile', percentage: 65, count: 196703 },
      { name: 'Desktop', percentage: 28, count: 84733 },
      { name: 'Tablet', percentage: 7, count: 21183 },
    ],
    locations: [
      { country: 'United States', opens: 89450, clicks: 13417, flag: '🇺🇸' },
      { country: 'United Kingdom', opens: 45230, clicks: 6784, flag: '🇬🇧' },
      { country: 'Canada', opens: 32140, clicks: 4821, flag: '🇨🇦' },
      { country: 'Australia', opens: 28900, clicks: 4335, flag: '🇦🇺' },
      { country: 'Germany', opens: 24680, clicks: 3702, flag: '🇩🇪' },
    ],
  }

  const engagementByTime = [
    { hour: '12 AM', opens: 234 },
    { hour: '3 AM', opens: 156 },
    { hour: '6 AM', opens: 890 },
    { hour: '9 AM', opens: 2340 },
    { hour: '12 PM', opens: 3200 },
    { hour: '3 PM', opens: 2890 },
    { hour: '6 PM', opens: 3450 },
    { hour: '9 PM', opens: 1890 },
  ]

  return (
    <UsersProvider>
      <Header fixed>
        <Search
          placeholder="Search reports..."
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Reports & Analytics
              </h2>
              <p className="text-muted-foreground mt-1">
                Track your email campaign performance and insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard
              icon={<Send className="w-5 h-5" />}
              label="Total Sent"
              value={overallStats.totalEmailsSent.toLocaleString()}
              change={12.5}
              trend="up"
              color="blue"
            />
            <MetricCard
              icon={<Eye className="w-5 h-5" />}
              label="Avg Open Rate"
              value={`${overallStats.avgOpenRate}%`}
              change={3.2}
              trend="up"
              color="green"
            />
            <MetricCard
              icon={<MousePointer className="w-5 h-5" />}
              label="Avg Click Rate"
              value={`${overallStats.avgClickRate}%`}
              change={-0.8}
              trend="down"
              color="purple"
            />
            <MetricCard
              icon={<Target className="w-5 h-5" />}
              label="Campaigns"
              value={overallStats.totalCampaigns}
              change={5}
              trend="up"
              color="orange"
            />
          </div>

          {/* Engagement Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Email Performance Timeline</h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Sent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground">Opened</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-muted-foreground">Clicked</span>
                  </div>
                </div>
              </div>
              <TimelineChart data={timelineData} />
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-6">Engagement Funnel</h3>
              <EngagementFunnel stats={overallStats} />
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Top Campaigns</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Campaign</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Sent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Opens</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Clicks</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Open Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Click Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Revenue</th>
                </tr>
                </thead>
                <tbody>
                {campaignPerformance.map((campaign, index) => (
                  <motion.tr
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="font-medium text-foreground">{campaign.name}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {campaign.sent.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {campaign.opened.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {campaign.clicked.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${campaign.openRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{campaign.openRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${campaign.clickRate * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{campaign.clickRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {campaign.revenue}
                        </span>
                    </td>
                  </motion.tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Best Performing Subjects */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Top Subject Lines
              </h3>
              <div className="space-y-4">
                {topPerformers.subjects.map((subject, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-primary pl-4 py-2"
                  >
                    <p className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                      {subject.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {subject.campaigns} campaigns
                      </span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {subject.openRate}% opens
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Device Breakdown
              </h3>
              <div className="space-y-4">
                {topPerformers.devices.map((device, index) => (
                  <motion.div
                    key={device.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{device.name}</span>
                      <span className="text-sm font-bold text-foreground">{device.percentage}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${device.percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-orange-500'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {device.count.toLocaleString()} opens
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Engagement by Time */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Best Time to Send
              </h3>
              <div className="space-y-3">
                {engagementByTime.map((time, index) => {
                  const maxOpens = Math.max(...engagementByTime.map(t => t.opens))
                  const percentage = (time.opens / maxOpens) * 100

                  return (
                    <div key={time.hour}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-muted-foreground">{time.hour}</span>
                        <span className="text-xs font-semibold text-foreground">{time.opens}</span>
                      </div>
                      <div className="bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Geographic Performance */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Top Performing Locations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topPerformers.locations.map((location, index) => (
                <motion.div
                  key={location.country}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="text-4xl mb-3 text-center">{location.flag}</div>
                  <h4 className="font-semibold text-foreground text-center mb-3">{location.country}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Opens:</span>
                      <span className="font-semibold text-foreground">{location.opens.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Clicks:</span>
                      <span className="font-semibold text-foreground">{location.clicks.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Main>
    </UsersProvider>
  )
}

function MetricCard({ icon, label, value, change, trend, color }: any) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400',
    green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400',
    orange: 'from-orange-500/20 to-orange-500/5 text-orange-600 dark:text-orange-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
            {icon}
          </div>
          {change && (
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </motion.div>
  )
}

function TimelineChart({ data }: any) {
  const maxValue = Math.max(...data.map((d: any) => d.sent))

  return (
    <div className="space-y-4">
      {data.map((item: any, index: number) => (
        <div key={item.date} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground min-w-[60px]">{item.date}</span>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-blue-600 dark:text-blue-400">{item.sent.toLocaleString()}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{item.opened.toLocaleString()}</span>
              <span className="text-purple-600 dark:text-purple-400">{item.clicked.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.sent / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-blue-500 h-2 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.opened / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
              className="bg-emerald-500 h-2 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.clicked / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
              className="bg-purple-500 h-2 rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function EngagementFunnel({ stats }: any) {
  const stages = [
    { label: 'Sent', value: stats.totalEmailsSent, percentage: 100, color: 'bg-blue-500' },
    { label: 'Delivered', value: stats.totalDelivered, percentage: (stats.totalDelivered / stats.totalEmailsSent) * 100, color: 'bg-emerald-500' },
    { label: 'Opened', value: stats.totalOpened, percentage: (stats.totalOpened / stats.totalEmailsSent) * 100, color: 'bg-purple-500' },
    { label: 'Clicked', value: stats.totalClicked, percentage: (stats.totalClicked / stats.totalEmailsSent) * 100, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">{stage.label}</span>
            <span className="text-xs text-muted-foreground">{stage.percentage.toFixed(1)}%</span>
          </div>
          <div className="bg-muted rounded-lg h-12 flex items-center overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stage.percentage}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${stage.color} h-full flex items-center justify-end pr-4`}
            >
              <span className="text-white font-bold text-sm">{stage.value.toLocaleString()}</span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}