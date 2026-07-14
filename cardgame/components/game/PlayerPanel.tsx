'use client'

import type { PlayerInfo } from '@/lib/types'

interface PlayerPanelProps {
  player: PlayerInfo
}

export default function PlayerPanel({ player }: PlayerPanelProps) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 border-2 transition-all duration-300
        ${player.isCurrentTurn
          ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5 shadow-[0_0_10px_rgba(0,255,247,0.2)] animate-[pulse-glow_2s_infinite]'
          : 'border-gray-700 bg-black/30'
        }
      `}
    >
      <span
        className={`w-3 h-3 rounded-full flex-shrink-0 ${
          player.isCurrentTurn ? 'bg-[var(--neon-cyan)]' : 'bg-gray-600'
        }`}
      />
      <div className="flex flex-col min-w-0">
        <span className="font-mono text-sm text-[var(--text-primary)] truncate">
          {player.name}
          {player.isLocal ? ' (tú)' : ''}
        </span>
        <span className="font-['Press_Start_2P'] text-[8px] text-gray-500">
          {player.cardCount} {player.cardCount === 1 ? 'carta' : 'cartas'}
        </span>
      </div>
    </div>
  )
}
