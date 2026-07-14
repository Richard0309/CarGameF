'use client'

import { useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
  title?: string
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-[scale-in_0.2s_ease-out]"
      onClick={(e) => { if (e.target === overlayRef.current) onClose?.() }}
    >
      <div className="relative bg-[var(--bg-secondary)] border-2 border-[var(--neon-cyan)] p-6 min-w-72 max-w-md shadow-[0_0_30px_rgba(0,255,247,0.2)]">
        {title && (
          <h2 className="font-['Press_Start_2P'] text-xs text-[var(--neon-cyan)] uppercase mb-4 tracking-wider">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  )
}
