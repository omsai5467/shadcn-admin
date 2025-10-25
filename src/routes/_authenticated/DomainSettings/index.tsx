"use client"

import { createFileRoute } from "@tanstack/react-router"
import UsersProvider from "@/features/users/context/users-context"
import { Header } from "@/components/layout/header"
import { Search } from "@/components/search"
import { ThemeSwitch } from "@/components/theme-switch"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Main } from "@/components/layout/main"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Check, Copy, Loader2, Plus, Calendar, RefreshCw, Shield, Mail, AlertCircle } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Route = createFileRoute("/_authenticated/DomainSettings/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [domains, setDomains] = useState([
    {
      id: 1,
      name: "example.com",
      status: "Verified",
      spf: "v=spf1 include:_spf.google.com ~all",
      dkim: "DKIM pass (google._domainkey.example.com)",
      dmarc: "DMARC pass (p=reject)",
      createdAt: "2025-10-01",
      updatedAt: "2025-10-20",
    },
    {
      id: 2,
      name: "testmail.io",
      status: "Pending",
      spf: "v=spf1 -all",
      dkim: "DKIM fail (no key found)",
      dmarc: "DMARC fail (p=none)",
      createdAt: "2025-09-28",
      updatedAt: "2025-10-18",
    },
  ])

  const [search, setSearch] = useState("")

  const filteredDomains = domains.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  const addDomain = (domainName: string) => {
    const newDomain = {
      id: Date.now(),
      name: domainName,
      status: "Pending",
      spf: "v=spf1 -all",
      dkim: "DKIM not found",
      dmarc: "DMARC not found",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    setDomains([newDomain, ...domains])
  }

  return (
    <UsersProvider>
      <Header fixed>
        <Search
          placeholder="Search domains..."
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
                Domain Settings
              </h2>
              <p className="text-muted-foreground mt-1">
                Manage and verify your email domains
              </p>
            </div>
            <AddDomainDialog onAdd={addDomain} />
          </div>

          <AnimatePresence mode="popLayout">
            {filteredDomains.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">No domains found</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDomains.map((domain, index) => (
                  <DomainCard key={domain.id} domain={domain} index={index} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </Main>
    </UsersProvider>
  )
}

function DomainCard({ domain, index }: { domain: any; index: number }) {
  const isVerified = domain.status === "Verified"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Decorative corner gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground truncate">
                {domain.name}
              </h3>
            </div>
            {isVerified ? (
              <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 shadow-sm">
                <Check className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 shadow-sm">
                <RefreshCw className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            )}
          </div>
        </div>

        {/* DNS Status Indicators */}
        <div className="space-y-3 mb-6">
          <DNSStatusItem
            label="SPF"
            status={domain.spf.includes("pass") || domain.spf.includes("include") ? "pass" : "fail"}
          />
          <DNSStatusItem
            label="DKIM"
            status={domain.dkim.includes("pass") ? "pass" : "fail"}
          />
          <DNSStatusItem
            label="DMARC"
            status={domain.dmarc.includes("pass") ? "pass" : "fail"}
          />
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Created {domain.createdAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{domain.updatedAt}</span>
          </div>
        </div>

        {/* Action Button */}
        <VerifyDialog domain={domain} />
      </div>
    </motion.div>
  )
}

function DNSStatusItem({ label, status }: { label: string; status: "pass" | "fail" }) {
  return (
    <div className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {status === "pass" ? (
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <Check className="w-4 h-4" />
          <span className="text-xs font-semibold">Pass</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-semibold">Fail</span>
        </div>
      )}
    </div>
  )
}

function VerifyDialog({ domain }: { domain: any }) {
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 1200)
  }

  const handleVerify = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Shield className="w-4 h-4 mr-2" />
          View DNS Records
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            DNS Records — {domain.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Copy these DNS configurations to verify your domain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {["spf", "dkim", "dmarc"].map((key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold uppercase text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  {key}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(key, domain[key])}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {copied === key ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 border border-border/50 backdrop-blur-sm">
                <p className="text-xs font-mono break-all text-foreground/80">{domain[key]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            onClick={handleVerify}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Re-Verify Domain
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AddDomainDialog({ onAdd }: { onAdd: (domain: string) => void }) {
  const [domain, setDomain] = useState("")
  const [open, setOpen] = useState(false)

  const handleAdd = () => {
    if (domain.trim()) {
      onAdd(domain.trim())
      setDomain("")
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
          Add Domain
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Add New Domain
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the domain name to add and verify DNS records
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <Button
            onClick={handleAdd}
            disabled={!domain.trim()}
            className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add & Show Records
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}