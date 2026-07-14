'use client'

import Button from '@/components/ui/Button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--bg-primary)] p-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-[var(--neon-pink)]">
          <p className="font-['Press_Start_2P'] text-xl">ERROR</p>
          <p className="font-mono text-sm text-gray-500 mt-2">
            Algo salió mal
          </p>
        </div>
        <p className="font-mono text-xs text-gray-600 max-w-xs">
          {error.message || 'Ocurrió un error inesperado'}
        </p>
        <Button variant="secondary" onClick={reset}>
          Reintentar
        </Button>
      </div>
    </div>
  )
}
