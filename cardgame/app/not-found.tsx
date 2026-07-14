'use client'

import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--bg-primary)] p-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-[var(--neon-pink)]">
          <p className="font-['Press_Start_2P'] text-4xl">404</p>
          <p className="font-mono text-sm text-gray-500 mt-2">SALA NO ENCONTRADA</p>
        </div>
        <p className="font-mono text-sm text-gray-400 max-w-xs">
          El código de sala es inválido o no existe. Verifica e intenta de nuevo.
        </p>
        <Button variant="secondary" onClick={() => router.push('/')}>
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}
