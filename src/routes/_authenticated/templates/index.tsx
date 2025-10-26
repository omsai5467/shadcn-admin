import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Edit, Copy, Trash2, Download, Upload, LayoutGrid, List as ListIcon, Monitor, Smartphone, Code, Sparkles, Star, Calendar, Mail, CheckCircle2, X, FileText, Zap, Tag as TagIcon, ArrowLeft, Save, RefreshCw, ExternalLink, Filter, SortAsc, Search as SearchIcon } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router'
import Users from '@/features/users'
export const Route = createFileRoute('/_authenticated/templates/')({
  component: AdvancedEmailTemplates,
})

 function AdvancedEmailTemplates() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Modern Newsletter',
      description: 'Clean and professional newsletter template with hero section',
      category: 'Newsletter',
      tags: ['Modern', 'Clean', 'Professional'],
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iI2Y1ZjVmNSIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI3MDAiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNzAiIHk9IjcwIiB3aWR0aD0iNDYwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzY2N2VlYSIvPjxyZWN0IHg9IjcwIiB5PSIyNDAiIHdpZHRoPSI0NjAiIGhlaWdodD0iMjAiIGZpbGw9IiNjY2MiLz48cmVjdCB4PSI3MCIgeT0iMjgwIiB3aWR0aD0iNDYwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZGRkIi8+PHJlY3QgeD0iNzAiIHk9IjMwMCIgd2lkdGg9IjQ2MCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2RkZCIvPjwvc3ZnPg==',
      html: '<div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;"><div style="max-width: 600px; margin: 0 auto; background: white; padding: 0;"><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 40px; text-align: center;"><h1 style="color: white; margin: 0; font-size: 32px;">Welcome to Our Newsletter</h1><p style="color: rgba(255,255,255,0.9); margin-top: 10px;">Stay updated with our latest news</p></div><div style="padding: 40px;"><h2 style="color: #333; margin-top: 0;">Hello there!</h2><p style="color: #666; line-height: 1.6;">Thank you for subscribing to our newsletter. We\'re excited to share our latest updates, insights, and exclusive offers with you.</p><p style="color: #666; line-height: 1.6;">Stay tuned for amazing content!</p><div style="text-align: center; margin-top: 30px;"><a href="#" style="display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold;">Read More</a></div></div></div></div>',
      createdAt: '2024-10-15',
      updatedAt: '2024-10-15',
      usedCount: 45,
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Product Launch',
      description: 'Eye-catching template for product announcements',
      category: 'Marketing',
      tags: ['Product', 'Launch', 'Bold'],
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3NjRiYTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0idXJsKCNhKSIvPjxyZWN0IHg9IjUwIiB5PSIxMDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ3aGl0ZSIgcng9IjEwIi8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMzAwIiByPSI4MCIgZmlsbD0iIzY2N2VlYSIvPjxyZWN0IHg9IjEwMCIgeT0iNDIwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjNjY3ZWVhIiByeD0iNSIvPjwvc3ZnPg==',
      html: '<div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;"><div style="max-width: 600px; margin: 0 auto; background: white; padding: 60px 40px; border-radius: 10px; text-align: center;"><div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center;"><span style="font-size: 48px;">🚀</span></div><h1 style="color: #333; margin: 0 0 20px; font-size: 36px;">Introducing Our New Product</h1><p style="color: #666; font-size: 18px; line-height: 1.6; margin-bottom: 30px;">Get ready for something amazing that will transform the way you work.</p><a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 18px 50px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">Learn More</a></div></div>',
      createdAt: '2024-10-18',
      updatedAt: '2024-10-18',
      usedCount: 32,
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Promotional Sale',
      description: 'High-converting sales and discount template',
      category: 'Marketing',
      tags: ['Sale', 'Promo', 'Discount'],
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSI1MDAiIGhlaWdodD0iNzAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjZiNmIiIHN0cm9rZS13aWR0aD0iNiIvPjx0ZXh0IHg9IjMwMCIgeT0iMjUwIiBmb250LXNpemU9IjgwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmNmI2YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+NTAlPC90ZXh0Pjx0ZXh0IHg9IjMwMCIgeT0iMzIwIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmNmI2YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+T0ZGPC90ZXh0PjxyZWN0IHg9IjE1MCIgeT0iNDAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZmY2YjZiIiByeD0iNSIvPjwvc3ZnPg==',
      html: '<div style="font-family: Arial, sans-serif; padding: 20px; background: white;"><div style="max-width: 600px; margin: 0 auto; border: 5px solid #ff6b6b; padding: 40px;"><div style="text-align: center;"><h1 style="color: #ff6b6b; font-size: 72px; margin: 0; font-weight: bold;">50% OFF</h1><h2 style="color: #ff6b6b; font-size: 36px; margin: 10px 0 30px; font-weight: bold;">EVERYTHING!</h2><p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 30px;">Limited time offer. Don\'t miss out on incredible savings across our entire store!</p><p style="color: #666; font-size: 14px; margin-bottom: 30px;">Sale ends Sunday, October 27, 2025</p><a href="#" style="display: inline-block; background: #ff6b6b; color: white; padding: 20px 60px; text-decoration: none; font-weight: bold; font-size: 18px; border-radius: 5px;">SHOP NOW</a></div></div></div>',
      createdAt: '2024-10-20',
      updatedAt: '2024-10-20',
      usedCount: 89,
      isFavorite: true,
    },
  ])

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [sortBy, setSortBy] = useState('recent')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['all', 'Newsletter', 'Marketing', 'Event', 'Transactional']

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = templates.filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'usage':
          return b.usedCount - a.usedCount
        case 'favorites':
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [templates, search, selectedCategory, sortBy])

  const toggleFavorite = (id) => {
    setTemplates(templates.map(t =>
      t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
    ))
  }

  const deleteTemplate = (id) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id))
    }
  }

  const duplicateTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      usedCount: 0,
      isFavorite: false,
    }
    setTemplates([newTemplate, ...templates])
  }

  const saveTemplate = (templateData) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(templates.map(t =>
        t.id === editingTemplate.id
          ? { ...templateData, id: t.id, updatedAt: new Date().toISOString().split('T')[0], usedCount: t.usedCount }
          : t
      ))
    } else {
      // Create new template
      const newTemplate = {
        ...templateData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        usedCount: 0,
        isFavorite: false,
      }
      setTemplates([newTemplate, ...templates])
    }
    setEditingTemplate(null)
  }

  const totalTemplates = templates.length
  const favoriteTemplates = templates.filter(t => t.isFavorite).length
  const totalUsage = templates.reduce((acc, t) => acc + t.usedCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Email Templates
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Create, manage and reuse your email templates
              </p>
            </div>
            <button
              onClick={() => setEditingTemplate({})}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Template
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={<FileText className="w-5 h-5" />}
            label="Total Templates"
            value={totalTemplates}
            color="blue"
          />
          <StatsCard
            icon={<Star className="w-5 h-5" />}
            label="Favorites"
            value={favoriteTemplates}
            color="amber"
          />
          <StatsCard
            icon={<Zap className="w-5 h-5" />}
            label="Total Usage"
            value={totalUsage}
            color="purple"
          />
          <StatsCard
            icon={<Sparkles className="w-5 h-5" />}
            label="This Month"
            value="12"
            color="green"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="recent">Recent</option>
                <option value="name">Name</option>
                <option value="usage">Most Used</option>
                <option value="favorites">Favorites</option>
              </select>

              <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category === 'all' ? 'All Templates' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates View */}
        <AnimatePresence mode="popLayout">
          {filteredAndSortedTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <p className="text-lg text-slate-600 dark:text-slate-400">No templates found</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                Create your first template to get started
              </p>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedTemplates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  onPreview={() => setPreviewTemplate(template)}
                  onEdit={() => setEditingTemplate(template)}
                  onToggleFavorite={() => toggleFavorite(template.id)}
                  onDuplicate={() => duplicateTemplate(template)}
                  onDelete={() => deleteTemplate(template.id)}
                />
              ))}
            </div>
          ) : (
            <TemplateTable
              templates={filteredAndSortedTemplates}
              onPreview={setPreviewTemplate}
              onEdit={setEditingTemplate}
              onToggleFavorite={toggleFavorite}
              onDuplicate={duplicateTemplate}
              onDelete={deleteTemplate}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <TemplatePreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onEdit={() => {
              setEditingTemplate(previewTemplate)
              setPreviewTemplate(null)
            }}
            onUse={() => {
              setTemplates(templates.map(t =>
                t.id === previewTemplate.id ? { ...t, usedCount: t.usedCount + 1 } : t
              ))
              alert('Template ready to use in campaign!')
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {editingTemplate && (
          <TemplateEditorModal
            template={editingTemplate}
            onClose={() => setEditingTemplate(null)}
            onSave={saveTemplate}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function StatsCard({ icon, label, value, color }) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400',
    green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-50`} />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

function TemplateCard({ template, index, onPreview, onEdit, onToggleFavorite, onDuplicate, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Template Preview Thumbnail */}
        <div className="relative h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
            <button
              onClick={onPreview}
              className="px-6 py-2 bg-white/90 text-slate-900 rounded-lg font-medium hover:bg-white transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Quick Preview
            </button>
          </div>

          {/* Favorite Badge */}
          <button
            onClick={onToggleFavorite}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Star className={`w-5 h-5 ${template.isFavorite ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
          </button>
        </div>

        {/* Template Info */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white truncate mb-1">{template.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{template.description}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg font-medium">
              {template.category}
            </span>
            {template.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{template.createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Used {template.usedCount}x</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onPreview}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={onDuplicate}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TemplateTable({ templates, onPreview, onEdit, onToggleFavorite, onDuplicate, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">Template</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Usage</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Created</th>
            <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
          </tr>
          </thead>
          <tbody>
          {templates.map((template, index) => (
            <motion.tr
              key={template.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.03 }}
              className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{template.name}</p>
                      {template.isFavorite && <Star className="w-4 h-4 fill-amber-500 text-amber-500" />}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{template.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg font-medium">
                    {template.category}
                  </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold">{template.usedCount}</span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                {template.createdAt}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onPreview(template)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                  <button
                    onClick={() => onToggleFavorite(template.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Star className={`w-4 h-4 ${template.isFavorite ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                  </button>
                  <button
                    onClick={() => onEdit(template)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicate(template)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(template.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TemplatePreviewModal({ template, onClose, onEdit, onUse }) {
  const [previewMode, setPreviewMode] = useState('desktop')
  const [showCode, setShowCode] = useState(false)

  const downloadHTML = () => {
    const blob = new Blob([template.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold">{template.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{template.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {!showCode && (
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    previewMode === 'desktop' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    previewMode === 'mobile' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </button>
              </div>
            )}
            <button
              onClick={downloadHTML}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              {showCode ? 'Preview' : 'Code'}
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8">
          {showCode ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-900 dark:bg-black rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono">
                  <code>{template.html}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-center">
              <motion.div
                key={previewMode}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`bg-white shadow-2xl rounded-lg overflow-hidden ${
                  previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[600px]'
                } transition-all duration-300`}
                style={{
                  minHeight: previewMode === 'mobile' ? '667px' : 'auto'
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: template.html }} />
              </motion.div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Created {template.createdAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Used {template.usedCount} times</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Template
            </button>
            <button
              onClick={onUse}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Use in Campaign
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function TemplateEditorModal({ template, onClose, onSave }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: template.name || '',
    description: template.description || '',
    category: template.category || 'Newsletter',
    tags: template.tags || [],
    html: template.html || '',
  })
  const [previewMode, setPreviewMode] = useState('desktop')
  const [tagInput, setTagInput] = useState('')
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const predefinedTags = ['Modern', 'Clean', 'Professional', 'Bold', 'Minimal', 'Elegant', 'Sale', 'Promo', 'Welcome', 'Event', 'Product', 'Launch', 'Discount']

  const handleSave = () => {
    // Generate thumbnail from HTML
    const thumbnail = template.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjMwMCIgeT0iNDAwIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5OZXcgVGVtcGxhdGU8L3RleHQ+PC9zdmc+'

    onSave({
      ...formData,
      thumbnail
    })
    setUnsavedChanges(false)
  }

  const handleImportHTML = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    setFormData({ ...formData, html: text })
    setUnsavedChanges(true)
    setStep(2)
  }

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
      setTagInput('')
      setUnsavedChanges(true)
    }
  }

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
    setUnsavedChanges(true)
  }

  const handleClose = () => {
    if (unsavedChanges && !confirm('You have unsaved changes. Are you sure you want to close?')) {
      return
    }
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex"
    >
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">{template.name ? 'Edit Template' : 'New Template'}</h2>
        </div>

        <div className="space-y-2 flex-1">
          <StepItem
            number={1}
            title="Template Info"
            active={step === 1}
            completed={step > 1}
            onClick={() => setStep(1)}
          />
          <StepItem
            number={2}
            title="Design HTML"
            active={step === 2}
            completed={false}
            onClick={() => setStep(2)}
          />
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-6 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-950">
        {/* Step 1: Template Info */}
        {step === 1 && (
          <div className="flex-1 overflow-y-auto p-8">
            <h3 className="text-2xl font-bold mb-6">Template Details</h3>

            <div className="max-w-2xl space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Template Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Summer Sale Newsletter"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    setUnsavedChanges(true)
                  }}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <textarea
                  placeholder="Describe your template..."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value })
                    setUnsavedChanges(true)
                  }}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value })
                    setUnsavedChanges(true)
                  }}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                >
                  <option value="Newsletter">Newsletter</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Event">Event</option>
                  <option value="Transactional">Transactional</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Tags
                </label>

                <div className="mb-3">
                  <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                      <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Add custom tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag(tagInput.trim())
                          }
                        }}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <button
                      onClick={() => addTag(tagInput.trim())}
                      disabled={!tagInput.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Suggested tags:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {predefinedTags.filter(tag => !formData.tags.includes(tag)).map(tag => (
                        <button
                          key={tag}
                          onClick={() => addTag(tag)}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium flex items-center gap-1.5">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => removeTag(tag)} />
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Import or Create */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-slate-50 dark:bg-slate-900">
                <h4 className="font-semibold mb-4">Choose Starting Point</h4>
                <div className="space-y-3">
                  <label htmlFor="html-import">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-all text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                      <p className="font-medium mb-1">Import HTML File</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Upload existing HTML template</p>
                      <input
                        type="file"
                        accept=".html,.htm"
                        onChange={handleImportHTML}
                        className="hidden"
                        id="html-import"
                      />
                    </div>
                  </label>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.name}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Code className="w-4 h-4" />
                    Start with Blank HTML Editor
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.name}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue to Editor
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: HTML Editor */}
        {step === 2 && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([formData.html], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${formData.name.toLowerCase().replace(/\s+/g, '-')}.html`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  }}
                  className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">Preview:</span>
                <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      previewMode === 'desktop' ? 'bg-slate-100 dark:bg-slate-700' : ''
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      previewMode === 'mobile' ? 'bg-slate-100 dark:bg-slate-700' : ''
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Mobile
                  </button>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!formData.html || !formData.name}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {template.name ? 'Update Template' : 'Create Template'}
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* HTML Editor */}
              <div className="w-1/2 border-r border-slate-200 dark:border-slate-800 flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h4 className="font-semibold">HTML Editor</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Write your email HTML</p>
                </div>
                <div className="flex-1 overflow-hidden">
                  <textarea
                    value={formData.html}
                    onChange={(e) => {
                      setFormData({ ...formData, html: e.target.value })
                      setUnsavedChanges(true)
                    }}
                    className="w-full h-full p-4 bg-white dark:bg-slate-950 border-0 focus:outline-none focus:ring-0 font-mono text-sm resize-none"
                    placeholder="<html>&#10;  <body style='font-family: Arial; padding: 20px;'>&#10;    <h1>Your Email Content</h1>&#10;    <p>Start designing your template...</p>&#10;  </body>&#10;</html>"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="w-1/2 flex flex-col bg-slate-50 dark:bg-slate-900/50">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <h4 className="font-semibold">Live Preview</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">See how it looks</p>
                </div>
                <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center">
                  <motion.div
                    key={previewMode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`bg-white shadow-2xl rounded-lg overflow-hidden ${
                      previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[600px]'
                    } transition-all duration-300`}
                  >
                    {formData.html ? (
                      <div dangerouslySetInnerHTML={{ __html: formData.html }} />
                    ) : (
                      <div className="p-12 text-center text-slate-400">
                        <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Your preview will appear here...</p>
                        <p className="text-xs mt-2">Start typing HTML in the editor</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function StepItem({ number, title, active, completed, onClick }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        active ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : completed ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-slate-800 text-slate-400'
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
        active ? 'bg-white text-blue-600' : completed ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
      }`}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : number}
      </div>
      <span className="font-medium">{title}</span>
    </motion.div>
  )
}