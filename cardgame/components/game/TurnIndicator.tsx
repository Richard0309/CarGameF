'use client'

import { useGame } from '@/hooks/useGame'

export default function TurnIndicator() {
  const { gameState } = useGame()

  if (!gameState) return null

  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`
          text-xl transition-all duration-300
          ${gameState.direction_reversed ? 'rotate-180' : ''}
          text-[var(--neon-cyan)]
        `}
        aria-label={gameState.direction_reversed ? 'Dirección inversa' : 'Dirección normal'}
      >
        ▶
      </span>
      <span className="font-['Press_Start_2P'] text-[8px] text-gray-400 uppercase tracking-wider">
        Turno de{' '}
        <span className="text-[var(--text-warning)]">
          {gameState.current_turn}
        </span>
      </span>
    </div>
  )
}
