import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { createFileRoute } from '@tanstack/react-router';
// Assuming these are ShadCN/Tailwind styled components
import { Header } from '@/components/layout/header.tsx';
import { ProfileDropdown } from '@/components/profile-dropdown.tsx';
import { Search } from '@/components/search.tsx';
import { ThemeSwitch } from '@/components/theme-switch.tsx';
import UsersProvider from '@/features/users/context/users-context.tsx';

// Tiptap Editor Imports
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

// Icon Imports
import { Edit3, Trash2, Copy, FilePlus, Download, X, Bold, Italic, Link as LinkIcon, Image, FileText, Save, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, RotateCcw } from 'react-feather';

/* ===========================
   UI Component Replacements (ShadCN Aesthetic)
   =========================== */

const CustomButton = React.forwardRef(({ children, variant = 'default', size = 'default', className = '', onClick, ...props }: any, ref) => {
  let base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  let sizeClass = size === 'sm' ? "h-9 px-4 text-xs" : size === 'xs' ? "h-7 px-2 text-xs" : "h-11 px-6 text-sm";

  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 focus:ring-indigo-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm focus:ring-gray-400",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30 focus:ring-red-500",
  };

  // Custom size for icon buttons used in the card/editor toolbar
  if (size === 'icon') {
    sizeClass = "h-10 w-10 p-2 text-gray-500 hover:bg-gray-100 focus:ring-gray-300 rounded-lg";
    if (variant === 'destructive') sizeClass = "h-10 w-10 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg";
  }

  // Use `as` prop if needed for different element types (e.g., link)
  return (
    <button
      ref={ref}
      className={`${base} ${sizeClass} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

const CustomInput = React.forwardRef(({ className = '', ...props }: any, ref) => (
  <input
    ref={ref}
    className={`flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${className}`}
    {...props}
  />
));

const CustomSelect = ({ children, className = '', ...props }: any) => (
  <select
    className={`h-11 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${className}`}
    {...props}
  >
    {children}
  </select>
);

const CustomCard = ({ children, className = '', ...props }: any) => (
  <div
    className={`bg-white rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

/* ===========================
   Types and Utilities
   =========================== */

type Template = {
  id: string;
  name: string;
  subject: string;
  html: string;
  plain?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  versions?: { html: string; subject: string; name: string; savedAt: string }[];
};

const STORAGE_KEY = 'app.templates.v1';

function uid(prefix = 't-') {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function nowISO() {
  return new Date().toISOString();
}

function saveToStorage(list: Template[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function loadFromStorage(): Template[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function sanitizeHtml(dirty: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(dirty, 'text/html');
  const scripts = doc.querySelectorAll('script, iframe, object, embed');
  scripts.forEach((n) => n.remove());
  const all = doc.querySelectorAll('*');
  all.forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
      if (attr.name === 'href' && attr.value.startsWith('javascript:')) el.removeAttribute('href');
    }
  });
  return doc.body.innerHTML;
}

function applyPlaceholders(html: string, data: Record<string, string>) {
  let out = html;
  for (const [k, v] of Object.entries(data)) {
    out = out.split(`{{${k}}}`).join(escapeHtml(v));
  }
  return out;
}


function escapeHtml(str: string) {
  return str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

/* ===========================
   Route component & Main App
   =========================== */

export const Route = createFileRoute('/_authenticated/templates/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState('');
  return (
    <UsersProvider>
      <Header fixed className="border-b border-gray-100 shadow-md z-30">
        <Search placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <TemplatesApp search={search} />
        </div>
      </main>
    </UsersProvider>
  );
}

// --- CONFIRMATION MODAL (To replace alert/confirm) ---

function ConfirmActionModal({ isOpen, title, description, onConfirm, onClose, confirmLabel = 'Delete' }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <CustomCard className="w-full max-w-sm p-8 transform transition-transform duration-300 ease-out scale-100">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <CustomButton variant="outline" onClick={onClose} size="sm">Cancel</CustomButton>
          <CustomButton variant="destructive" onClick={onConfirm} size="sm">
            {confirmLabel}
          </CustomButton>
        </div>
      </CustomCard>
    </div>
  );
}


// --- TEMPLATES APP LOGIC ---

function TemplatesApp({ search }: { search?: string }) {
  const demoTemplates = useMemo<Template[]>(
    () => [
      {
        id: uid(),
        name: 'Welcome - Basic',
        subject: 'Welcome to {{company}}',
        html: '<p style="font-size: 16px; line-height: 1.5; color: #333;">Hi {{first_name}},</p><p style="font-size: 16px; line-height: 1.5; color: #333;">Welcome to <strong style="color: #4f46e5;">{{company}}</strong> — we are glad to have you on board!</p><p style="font-size: 14px; line-height: 1.5; color: #666;">If you have any questions, please contact our support team.</p>',
        plain: 'Hi {{first_name}},\n\nWelcome to {{company}} — we are glad to have you on board!\n\nIf you have any questions, please contact our support team.',
        tags: ['welcome', 'onboarding'],
        createdAt: nowISO(),
        updatedAt: nowISO(),
        versions: [],
      },
      {
        id: uid(),
        name: 'Promo - 20% off',
        subject: 'Exclusive 20% off for {{first_name}}',
        html: '<div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;"><h2 style="color: #1f2937; text-align: center;">Special Offer Just For You!</h2><p style="text-align: center;">Use code <strong style="color: #d97706; font-size: 1.2em;">PROMO20</strong> at checkout to get 20% off your next purchase.</p></div>',
        plain: 'Special Offer Just For You!\n\nUse code PROMO20 at checkout to get 20% off your next purchase.',
        tags: ['promo', 'marketing'],
        createdAt: nowISO(),
        updatedAt: nowISO(),
        versions: [],
      },
      {
        id: uid(),
        name: 'Invoice Reminder',
        subject: 'Invoice #{{invoice_id}} is due',
        html: '<p>Dear {{customer_name}},</p><p>This is a friendly reminder that your invoice <strong style="color: #ef4444;">#{{invoice_id}}</strong> is due soon. Please review the attached details.</p>',
        plain: 'Dear {{customer_name}},\n\nThis is a friendly reminder that your invoice #{{invoice_id}} is due soon. Please review the attached details.',
        tags: ['finance', 'alert'],
        createdAt: nowISO(),
        updatedAt: nowISO(),
        versions: [],
      },
    ],
    []
  );

  const [templates, setTemplates] = useState<Template[]>(() => {
    const stored = loadFromStorage();
    return stored.length ? stored : demoTemplates;
  });

  // State for UX enhancements
  const [selected, setSelected] = useState<Template | null>(null);
  const [editing, setEditing] = useState<Template | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [showPlain, setShowPlain] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<'single' | 'bulk' | null>(null);
  const [templateToDeleteId, setTemplateToDeleteId] = useState<string | null>(null);

  // Pagination & Sorting States
  const [page, setPage] = useState(1);
  const perPage = 8; // Increased perPage for a denser, more professional grid
  const [sort, setSort] = useState<'updated' | 'created' | 'name'>('updated');
  const [tagFilter, setTagFilter] = useState<string | null>(null);


  // --- SIDE EFFECTS ---
  useEffect(() => {
    saveToStorage(templates);
  }, [templates]);

  // --- DERIVED STATE ---
  const tags = useMemo(() => {
    const s = new Set<string>();
    templates.forEach((t) => t.tags?.forEach((g) => s.add(g)));
    return Array.from(s).sort();
  }, [templates]);

  const filtered = useMemo(() => {
    let list = templates.slice();
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || (t.tags || []).some((tg) => tg.toLowerCase().includes(q)));
    }
    if (tagFilter) {
      list = list.filter((t) => (t.tags || []).includes(tagFilter));
    }
    if (sort === 'updated') list.sort((a, b) => (b.updatedAt > a.updatedAt ? -1 : 1)); // Descending updated
    if (sort === 'created') list.sort((a, b) => (b.createdAt > a.createdAt ? -1 : 1)); // Descending created
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [templates, search, sort, tagFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount, page]);

  const visible = filtered.slice((page - 1) * perPage, page * perPage);
  const selectedCount = Object.values(selectedIds).filter(Boolean).length;
  const allSelected = visible.length > 0 && selectedCount === visible.length;


  // --- ACTIONS ---

  const handleOpenCreate = useCallback(() => {
    const t: Template = {
      id: uid('new-'),
      name: '',
      subject: '',
      html: '',
      plain: '',
      tags: [],
      createdAt: nowISO(),
      updatedAt: nowISO(),
      versions: [],
    };
    setEditing(t);
    setIsEditorOpen(true);
  }, []);

  const handleOpenEdit = useCallback((t: Template) => {
    setEditing(t);
    setIsEditorOpen(true);
    setSelected(null); // Close preview if open
  }, []);

  const handleSaveTemplate = useCallback((tpl: Template) => {
    setTemplates((prev) => {
      const exists = prev.find((p) => p.id === tpl.id);
      const isNew = tpl.id.startsWith('new-');

      const newVersion = { html: tpl.html, subject: tpl.subject, name: tpl.name, savedAt: nowISO() };
      const previousVersions = exists ? (exists.versions || []) : (tpl.versions || []);

      // Only add a new version if HTML or subject has changed AND it's not a brand new template save
      const shouldAddNewVersion = !isNew && (exists?.html !== tpl.html || exists?.subject !== tpl.subject || exists?.name !== tpl.name);

      const versions = shouldAddNewVersion ? [...previousVersions.slice(-9), newVersion] : previousVersions;

      const toSave = {
        ...tpl,
        updatedAt: nowISO(),
        versions,
      };

      if (exists && !isNew) {
        return prev.map((p) => (p.id === tpl.id ? toSave : p));
      } else {
        const finalId = isNew ? uid() : tpl.id;
        return [{ ...toSave, id: finalId, createdAt: tpl.createdAt || nowISO() }, ...prev.filter(p => p.id !== tpl.id)];
      }
    });
    setIsEditorOpen(false);
    setEditing(null);
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setSelected((s) => (s?.id === id ? null : s));
    setSelectedIds((s) => {
      const copy = { ...s };
      delete copy[id];
      return copy;
    });
    setTemplateToDeleteId(null);
    setIsConfirmOpen(false);
  }, []);

  const deleteSingleConfirmed = useCallback(() => {
    if (templateToDeleteId) {
      deleteTemplate(templateToDeleteId);
    }
  }, [deleteTemplate, templateToDeleteId]);

  const bulkDeleteConfirmed = useCallback(() => {
    const ids = Object.keys(selectedIds).filter((k) => selectedIds[k]);
    setTemplates((prev) => prev.filter((t) => !ids.includes(t.id)));
    setSelectedIds({});
    setSelected(null);
    setIsConfirmOpen(false);
  }, [selectedIds]);

  const bulkDeleteStart = useCallback(() => {
    if (!selectedCount) return;
    setActionToConfirm('bulk');
    setIsConfirmOpen(true);
  }, [selectedCount]);

  const deleteSingleStart = useCallback((id: string) => {
    setTemplateToDeleteId(id);
    setActionToConfirm('single');
    setIsConfirmOpen(true);
  }, []);

  const duplicateTemplate = useCallback((tpl: Template) => {
    const copy: Template = {
      ...tpl,
      id: uid(),
      name: tpl.name + ' (copy)',
      createdAt: nowISO(),
      updatedAt: nowISO(),
      versions: [], // Don't copy history for duplicates
    };
    setTemplates((prev) => [copy, ...prev]);
  }, []);

  const exportTemplate = useCallback((tpl: Template) => {
    const payload = { ...tpl };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tpl.name.replace(/\s+/g, '_')}.template.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const exportSelected = useCallback(() => {
    const ids = Object.keys(selectedIds).filter((k) => selectedIds[k]);
    const items = templates.filter((t) => ids.includes(t.id));
    if (!items.length) return;
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `templates_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSelectedIds({});
  }, [selectedIds, templates]);

  const importTemplates = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = e.target?.result as string;
        const parsed = JSON.parse(raw) as Template | Template[];
        const items = Array.isArray(parsed) ? parsed : [parsed];
        const normalized = items.map((it) => ({
          ...it,
          id: uid(), // Assign new ID to imported templates
          createdAt: it.createdAt || nowISO(),
          updatedAt: nowISO(),
          versions: [],
        }));
        setTemplates((prev) => [...normalized, ...prev]);
      } catch {
        // Simple console error instead of alert
        console.error('Error: Invalid file format. Please select a JSON exported by this app.');
      }
    };
    reader.readAsText(file);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importTemplates(file);
    e.currentTarget.value = '';
  }, [importTemplates]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((s) => ({ ...s, [id]: !s[id] }));
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (allSelected) {
      const newIds = { ...selectedIds };
      visible.forEach(t => delete newIds[t.id]);
      setSelectedIds(newIds);
    } else {
      const newIds = { ...selectedIds };
      visible.forEach(t => newIds[t.id] = true);
      setSelectedIds(newIds);
    }
  }, [allSelected, selectedIds, visible]);


  return (
    <div>
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Template Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, edit, and deploy all your email templates.</p>
        </div>

        <div className="flex items-center gap-3">
          <CustomButton variant="outline" size="sm" onClick={() => {
            const blob = new Blob([JSON.stringify(templates, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `templates_all_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
                        title="Export all templates">
            <Download size={16} className="mr-2" /> Export All
          </CustomButton>

          <label className="text-sm font-medium text-indigo-600 transition-colors cursor-pointer">
            <input type="file" accept="application/json" onChange={handleFileInput} className="hidden" />
            <CustomButton variant="outline" size="sm">
              <FileText size={16} className="mr-2" /> Import
            </CustomButton>
          </label>


          <CustomButton variant="default" onClick={handleOpenCreate}>
            <FilePlus size={16} className="mr-2" /> New Template
          </CustomButton>
        </div>
      </div>

      {/* FILTER AND BULK ACTIONS BAR */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Sort By</label>
          <CustomSelect value={sort} onChange={(e) => setSort(e.target.value as any)} className="h-10">
            <option value="updated">Last Updated</option>
            <option value="created">Created</option>
            <option value="name">Name (A-Z)</option>
          </CustomSelect>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Tag</label>
          <CustomSelect value={tagFilter ?? ''} onChange={(e) => setTagFilter(e.target.value || null)} className="h-10">
            <option value="">All Tags</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </CustomSelect>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {selectedCount > 0 && (
            <>
              <span className="text-sm font-medium text-gray-700">{selectedCount} selected</span>
              <CustomButton variant="destructive" size="sm" onClick={bulkDeleteStart}>
                <Trash2 size={14} className="mr-1" /> Bulk Delete
              </CustomButton>
              <CustomButton variant="outline" size="sm" onClick={exportSelected}>
                <Download size={14} className="mr-1" /> Export Selected
              </CustomButton>
            </>
          )}
        </div>
      </div>

      {/* TEMPLATE GRID */}
      <div className="mb-6">
        {filtered.length === 0 && (
          <div className="text-center p-16 text-gray-500 bg-white rounded-2xl shadow-xl">
            <FileText size={64} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold mt-4">No Templates Found</h3>
            <p className="mt-1">Try clearing your search or filters, or create a new template.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mb-4 pl-1">
            <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              Select all visible ({visible.length})
            </label>
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((t) => (
            <CustomCard key={t.id} className="flex flex-col p-5 h-full relative">
              <div className="absolute top-5 left-5">
                <input type="checkbox" checked={!!selectedIds[t.id]} onChange={() => toggleSelect(t.id)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              </div>

              <div className="pl-6 flex-1">
                <div className="flex items-start justify-between">
                  <div className="pr-2">
                    <h4 className="text-lg font-bold text-gray-900">{t.name || <span className="text-gray-400">Untitled</span>}</h4>
                    <p className="text-sm text-indigo-600 mt-1 truncate">{t.subject}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500 flex-shrink-0 pt-1">
                    <div>{new Date(t.updatedAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {t.tags && t.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="prose prose-sm mt-4 max-w-none text-gray-600 line-clamp-3 overflow-hidden h-[4.5rem]" dangerouslySetInnerHTML={{ __html: sanitizeHtml(t.html) }} />
              </div>

              <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                <CustomButton variant="outline" size="sm" onClick={() => setSelected(t)}>
                  View
                </CustomButton>
                <CustomButton size="icon" variant="ghost" onClick={() => handleOpenEdit(t)} title="Edit">
                  <Edit3 size={18} />
                </CustomButton>
                <CustomButton size="icon" variant="ghost" onClick={() => duplicateTemplate(t)} title="Duplicate">
                  <Copy size={18} />
                </CustomButton>
                <CustomButton size="icon" variant="ghost" onClick={() => exportTemplate(t)} title="Export">
                  <Download size={18} />
                </CustomButton>
                <CustomButton variant="destructive" size="icon" className="ml-auto" onClick={() => deleteSingleStart(t.id)} title="Delete">
                  <Trash2 size={18} />
                </CustomButton>
              </div>
            </CustomCard>
          ))}
        </div>
      </div>


      {/* PAGINATION */}
      {filtered.length > perPage && (
        <div className="flex items-center justify-between mt-8 p-4 bg-white rounded-2xl shadow-lg">
          <div className="text-sm text-gray-500">
            Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} of {filtered.length} templates
          </div>
          <div className="flex items-center gap-2">
            <CustomButton variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft size={16} /> Previous
            </CustomButton>
            <div className="px-3 text-sm font-bold text-gray-700">Page {page} / {pageCount}</div>
            <CustomButton variant="outline" size="sm" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount}>
              Next <ChevronRight size={16} />
            </CustomButton>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {selected && (
        <TemplatePreviewModal
          selected={selected}
          onClose={() => setSelected(null)}
          onEdit={() => handleOpenEdit(selected)}
          showPlain={showPlain}
          setShowPlain={setShowPlain}
        />
      )}

      {/* EDITOR MODAL */}
      {isEditorOpen && editing && (
        <TemplateEditorModal
          initial={editing}
          onClose={() => {
            setIsEditorOpen(false);
            setEditing(null);
          }}
          onSave={handleSaveTemplate}
        />
      )}

      {/* CONFIRMATION MODAL */}
      <ConfirmActionModal
        isOpen={isConfirmOpen}
        title={actionToConfirm === 'bulk' ? 'Confirm Bulk Deletion' : 'Confirm Deletion'}
        description={actionToConfirm === 'bulk' ? `Are you sure you want to delete ${selectedCount} selected templates? This action cannot be undone.` : `Are you sure you want to delete the template "${templates.find(t => t.id === templateToDeleteId)?.name || 'Untitled'}"? This action cannot be undone.`}
        onConfirm={actionToConfirm === 'bulk' ? bulkDeleteConfirmed : deleteSingleConfirmed}
        onClose={() => setIsConfirmOpen(false)}
        confirmLabel="Confirm Deletion"
      />

    </div>
  );
}

/* ===========================
   Preview Modal Component (V2)
   =========================== */

function TemplatePreviewModal({ selected, onClose, onEdit, showPlain, setShowPlain }: any) {
  const [copied, setCopied] = useState<'html' | 'plain' | null>(null);

  const copyToClipboard = (text: string, type: 'html' | 'plain') => {
    // Fallback using execCommand for better cross-platform/iframe compatibility
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getPreviewData = () => ({
    first_name: 'Jane',
    last_name: 'Doe',
    company: 'Acme Corp',
    unsubscribe_link: 'http://example.com/unsubscribe',
    custom_field: 'Custom Value',
    invoice_id: 'INV-12345',
    customer_name: 'Jane Doe',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl flex flex-col h-[95vh] transform transition-all duration-300 scale-95 hover:scale-100">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
            <p className="text-md text-indigo-600 font-medium">{selected.subject}</p>
          </div>
          <div className="flex items-center gap-3">
            <CustomButton variant="outline" size="sm" onClick={onEdit}>
              <Edit3 size={16} className="mr-2" /> Edit Template
            </CustomButton>
            <CustomButton variant="default" size="sm" onClick={onClose}>
              <X size={16} className="mr-2" /> Close Preview
            </CustomButton>
          </div>
        </div>

        {/* Body and Versions */}
        <div className="flex-1 overflow-hidden grid md:grid-cols-[3fr_1.5fr] h-full">

          {/* Main Preview Area */}
          <div className="p-6 border-r border-gray-100 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h4 className="font-bold text-gray-800">Email Preview ({showPlain ? 'Plain Text' : 'Rendered HTML'})</h4>

              <div className="flex items-center gap-2">
                <CustomButton variant="ghost" size="xs" onClick={() => copyToClipboard(selected.html, 'html')}>
                  {copied === 'html' ? <CheckCircle size={14} className="text-green-500 mr-1" /> : <Copy size={14} className="mr-1" />} {copied === 'html' ? 'HTML Copied' : 'Copy HTML'}
                </CustomButton>
                <CustomButton variant="ghost" size="xs" onClick={() => copyToClipboard(selected.plain || '', 'plain')}>
                  {copied === 'plain' ? <CheckCircle size={14} className="text-green-500 mr-1" /> : <Copy size={14} className="mr-1" />} {copied === 'plain' ? 'Plain Copied' : 'Copy Plain'}
                </CustomButton>
                <label className="flex items-center gap-1 text-sm text-gray-700">
                  <input type="checkbox" checked={showPlain} onChange={(e) => setShowPlain(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  Plain View
                </label>
              </div>
            </div>

            <div className="flex-1 p-8 bg-gray-100 rounded-lg overflow-y-auto shadow-inner">
              <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                {showPlain ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 leading-relaxed">{selected.plain || 'Plain text version is not available for this template.'}</pre>
                ) : (
                  <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: sanitizeHtml(applyPlaceholders(selected.html, getPreviewData())) }} />
                )}
              </div>
            </div>
          </div>

          {/* Versions Sidebar */}
          <div className="p-6 flex flex-col bg-gray-50 overflow-y-auto">
            <h4 className="font-bold text-gray-800 mb-4">Version History ({selected.versions?.length || 0})</h4>
            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              {selected.versions && selected.versions.length > 0 ? (
                selected.versions.slice().reverse().map((v: any, i: number) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-xl bg-white hover:bg-indigo-50 transition-all duration-200 cursor-pointer shadow-sm" onClick={() => {
                    // Quick restore preview (non-destructive to saved template)
                    setSelected({ ...selected, html: v.html, subject: v.subject, name: v.name });
                  }}>
                    <div className="font-medium text-sm text-gray-900 truncate">{v.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      <span className="font-mono">{new Date(v.savedAt).toLocaleTimeString()}</span> on {new Date(v.savedAt).toLocaleDateString()}
                    </div>
                    <div className="flex justify-end pt-2">
                      <CustomButton variant="outline" size="xs">
                        <RotateCcw size={12} className="mr-1" /> Apply Preview
                      </CustomButton>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-3 bg-white rounded-lg border">No previous versions saved. Save your first version to start tracking history.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* ===========================
   Editor Modal Component (V2)
   =========================== */

function TemplateEditorModal({ initial, onClose, onSave }: { initial: Template; onClose: () => void; onSave: (t: Template) => void }) {
  const [name, setName] = useState(initial.name || '');
  const [subject, setSubject] = useState(initial.subject || '');
  const [tagsInput, setTagsInput] = useState((initial.tags || []).join(', '));
  const [plain, setPlain] = useState(initial.plain || '');
  const [mode, setMode] = useState<'wysiwyg' | 'html' | 'plain'>('wysiwyg');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }, // Limit heading options
        blockquote: false,
        codeBlock: false,
      }),
      Placeholder.configure({ placeholder: 'Start writing your template content here...' }),
    ],
    content: initial.html || '',
    autofocus: true,
    editorProps: {
      attributes: {
        // Applying styles to the editor content area
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[50vh] p-4',
      },
    },
  });

  useEffect(() => {
    setName(initial.name || '');
    setSubject(initial.subject || '');
    setPlain(initial.plain || '');
    setTagsInput((initial.tags || []).join(', '));
    // Check if editor is available before setting content
    if (editor) {
      editor.commands.setContent(initial.html || '');
    }
  }, [initial, editor]);

  const insertPlaceholder = (variable: string) => {
    if (!variable) return;
    editor?.chain().focus().insertContent(`<span class="inline-block px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-sm font-mono whitespace-nowrap">\{\{${variable}\}\}</span>&nbsp;`).run();
  };

  const insertImage = () => {
    const url = prompt('Enter Image URL');
    if (!url) return;
    editor?.chain().focus().insertContent(`<img src="${escapeHtml(url)}" alt="Template Image" style="max-width: 100%; height: auto; display: block; margin: 10px 0;" />`).run();
  };

  const handleSave = () => {
    const tags = tagsInput.split(',').map((s) => s.trim()).filter(Boolean);
    const html = mode === 'plain' ? initial.html : editor?.getHTML() ?? '';

    const tpl: Template = {
      ...initial,
      name: name || 'Untitled',
      subject: subject || '',
      html,
      plain: plain || htmlToPlainText(html),
      tags,
      // Timestamps will be updated by the parent component (handleSaveTemplate)
      updatedAt: initial.updatedAt,
      createdAt: initial.createdAt,
      versions: initial.versions || [],
    };
    onSave(tpl);
  };

  const htmlToPlainText = (h: string) => {
    const div = document.createElement('div');
    div.innerHTML = h;
    return div.innerText || div.textContent || '';
  };

  if (!initial || !editor) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden h-[95vh] flex flex-col transform transition-all duration-300 scale-95">

        {/* Header and Controls */}
        <div className="flex flex-col border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold text-gray-900">{initial.id.startsWith('new-') ? 'Create New Template' : `Edit Template: ${initial.name}`}</h2>
            <div className="flex items-center gap-3">
              <CustomButton variant="outline" size="sm" onClick={onClose}>
                Cancel
              </CustomButton>
              <CustomButton variant="default" size="sm" onClick={handleSave}>
                <Save size={16} className="mr-2" /> Save Template
              </CustomButton>
              <CustomButton variant="ghost" size="icon" onClick={onClose} title="Close">
                <X size={20} />
              </CustomButton>
            </div>
          </div>

          {/* Metadata Inputs */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-gray-50/50 bg-gray-50">
            <CustomInput className="md:col-span-2 h-10 rounded-lg" placeholder="Template Name" value={name} onChange={(e) => setName(e.target.value)} />
            <CustomInput className="h-10 rounded-lg" placeholder="Email Subject Line" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <CustomInput className="h-10 rounded-lg" placeholder="Tags (comma separated)" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 p-3 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mr-2">Formatting:</h3>

            {/* Formatting Buttons */}
            <CustomButton size="icon" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>
              <Bold size={18} />
            </CustomButton>
            <CustomButton size="icon" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>
              <Italic size={18} />
            </CustomButton>
            <CustomButton size="icon" variant="ghost" onClick={() => {
              const url = prompt('Enter URL');
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}>
              <LinkIcon size={18} />
            </CustomButton>
            <CustomButton size="icon" variant="ghost" onClick={insertImage}>
              <Image size={18} />
            </CustomButton>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            {/* Placeholders */}
            <CustomSelect onChange={(e) => insertPlaceholder(e.target.value)} defaultValue="" className="h-10 rounded-lg text-sm">
              <option value="" disabled>+ Insert Placeholder</option>
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="company">Company</option>
              <option value="unsubscribe_link">Unsubscribe Link</option>
            </CustomSelect>

            <div className="ml-auto flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">View Mode</label>
              <CustomSelect value={mode} onChange={(e) => setMode(e.target.value as any)} className="h-10 rounded-lg text-sm">
                <option value="wysiwyg">Visual Editor</option>
                <option value="html">HTML Code</option>
                <option value="plain">Plain-text</option>
              </CustomSelect>
            </div>
          </div>
        </div>


        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="border border-gray-200 rounded-xl shadow-lg bg-white h-full min-h-[50vh]">

            {mode === 'wysiwyg' && (
              <div className="p-4">
                <EditorContent editor={editor} />
              </div>
            )}

            {mode === 'html' && (
              <textarea
                className="w-full p-4 h-[75vh] font-mono text-sm resize-none focus:outline-none rounded-xl"
                value={editor.getHTML()}
                onChange={(e) => editor.commands.setContent(e.target.value)}
                placeholder="Edit the raw HTML here..."
              />
            )}

            {mode === 'plain' && (
              <textarea className="w-full p-4 h-[75vh] font-mono text-sm resize-none focus:outline-none rounded-xl" placeholder="Enter plain text version here. This is used for emails that cannot render HTML." value={plain} onChange={(e) => setPlain(e.target.value)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
