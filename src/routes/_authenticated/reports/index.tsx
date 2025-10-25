import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header.tsx'
import { Search } from '@/components/search.tsx'
import { ThemeSwitch } from '@/components/theme-switch.tsx'
import { ProfileDropdown } from '@/components/profile-dropdown.tsx'
import UsersProvider from '@/features/users/context/users-context.tsx'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  CheckCircle2,
  MousePointerClick,
  AlertCircle,
  XCircle,
  BarChart2,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'

export const Route = createFileRoute('/_authenticated/reports/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')

  // Dummy stats data
  const stats = {
    totalSent: 125000,
    delivered: 121800,
    opened: 68500,
    clicked: 22500,
    bounced: 3200,
    unsubscribed: 740,
  }

  const rates = {
    deliveryRate: (stats.delivered / stats.totalSent) * 100,
    openRate: (stats.opened / stats.delivered) * 100,
    clickRate: (stats.clicked / stats.delivered) * 100,
    bounceRate: (stats.bounced / stats.totalSent) * 100,
    unsubRate: (stats.unsubscribed / stats.totalSent) * 100,
  }

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

      <main className="p-6 space-y-6 mt-20">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight">Bulk Email Reports</h2>
          <p className="text-muted-foreground text-sm">
            Overview of your email sending performance and engagement metrics.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <MetricCard
              icon={<Mail className="w-5 h-5" />}
              label="Total Sent"
              value={stats.totalSent.toLocaleString()}
              subValue="All campaigns"
              color="blue"
            />
            <MetricCard
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="Delivered"
              value={stats.delivered.toLocaleString()}
              subValue={`${rates.deliveryRate.toFixed(1)}% delivery`}
              color="green"
              trend="up"
            />
            <MetricCard
              icon={<Activity className="w-5 h-5" />}
              label="Opened"
              value={stats.opened.toLocaleString()}
              subValue={`${rates.openRate.toFixed(1)}% open rate`}
              color="orange"
              trend="up"
            />
            <MetricCard
              icon={<MousePointerClick className="w-5 h-5" />}
              label="Clicked"
              value={stats.clicked.toLocaleString()}
              subValue={`${rates.clickRate.toFixed(1)}% click rate`}
              color="purple"
              trend="up"
            />
            <MetricCard
              icon={<AlertCircle className="w-5 h-5" />}
              label="Bounced"
              value={stats.bounced.toLocaleString()}
              subValue={`${rates.bounceRate.toFixed(1)}%`}
              color="red"
              trend="down"
            />
            <MetricCard
              icon={<XCircle className="w-5 h-5" />}
              label="Unsubscribed"
              value={stats.unsubscribed.toLocaleString()}
              subValue={`${rates.unsubRate.toFixed(1)}%`}
              color="gray"
              trend="down"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="p-5 border border-border shadow-sm bg-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">Engagement Breakdown</h4>
                <BarChart2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                You can integrate a bar or area chart here showing open, click, and bounce trends.
              </p>
            </Card>

            <Card className="p-5 border border-border shadow-sm bg-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">Performance Ratio</h4>
                <PieChart className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Add a pie or radial chart here to visualize sent vs delivered vs bounced ratios.
              </p>
            </Card>
          </div>

          {/* Export / Actions */}
          <div className="flex justify-end mt-6">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              Export Full Report
            </Button>
          </div>
        </motion.div>
      </main>
    </UsersProvider>
  )
}

// MetricCard Component (same style as CampaignAnalytics)
function MetricCard({ icon, label, value, subValue, color, trend }: any) {
  const trendIcon =
    trend === 'up' ? (
      <ArrowUpRight className="w-4 h-4" />
    ) : trend === 'down' ? (
      <ArrowDownRight className="w-4 h-4" />
    ) : null

  const colorClasses: any = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-emerald-600 dark:text-emerald-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    red: 'text-red-600 dark:text-red-400',
    gray: 'text-gray-600 dark:text-gray-400',
  }

  return (
    <div className="relative bg-card border border-border rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        {trendIcon && <span className={colorClasses[color]}>{trendIcon}</span>}
      </div>
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      {subValue && <p className="text-xs text-muted-foreground mt-1">{subValue}</p>}
    </div>
  )
}
