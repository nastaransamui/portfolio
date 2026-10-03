
'use client'

import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { BlogPost } from 'src/shared/types'


type UIState = {
  nav: string
  setNav: (v: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
  stretchyOpen: boolean
  setStretchyOpen: (v: boolean) => void
  activeProject: number | null
  setActiveProject: (v: number | null) => void
  selectedPost: BlogPost | null
  setSelectedPost: (v: BlogPost | null) => void;
  isMobile: boolean;
  setIsMobile: (v: boolean) => void;
  blogModalOpen: boolean;
  setBlogModalOpen: (v: boolean) => void;
}

const UIContext = createContext<UIState | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [stretchyOpen, setStretchyOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isMobile, setIsMobile] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);

  const value = useMemo(
    () => ({
      nav, setNav,
      mobileMenuOpen, setMobileMenuOpen,
      stretchyOpen, setStretchyOpen,
      activeProject, setActiveProject,
      selectedPost, setSelectedPost,
      isMobile, setIsMobile,
      blogModalOpen, setBlogModalOpen,
    }),
    [nav, mobileMenuOpen, stretchyOpen, activeProject, selectedPost, isMobile, blogModalOpen]
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>')
  return ctx
}
