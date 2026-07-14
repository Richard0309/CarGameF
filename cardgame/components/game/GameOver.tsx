'use client'

import { useGame } from '@/hooks/useGame'
import Button from '@/components/ui/Button'

export default function GameOver() {
  const { gameState, playerName, leaveRoom } = useGame()

  if (!gameState?.winner) return null

  const isWinner = gameState.winner === playerName

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 p-8 border-2 border-[var(--neon-yellow)] bg-[var(--bg-secondary)] shadow-[0_0_40px_rgba(255,215,0,0.3)] animate-[scale-in_0.3s_ease-out]">
        <p className="font-['Press_Start_2P'] text-sm text-[var(--neon-yellow)] uppercase tracking-wider">
          {isWinner ? '¡Ganaste!' : 'Fin de la partida'}
        </p>

        <div className="text-center">
          <p className="font-mono text-lg text-[var(--text-primary)]">
            {isWinner ? '¡Felicidades!' : `${gameState.winner} ha ganado`}
          </p>
        </div>

        <Button variant="secondary" onClick={leaveRoom}>
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}
