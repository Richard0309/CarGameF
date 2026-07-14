'use client'

import { useGame } from '@/hooks/useGame'
import Button from '@/components/ui/Button'

export default function Lobby() {
  const { roomId, players, connectionStatus, startGame } = useGame()

  const readyCount = players.length

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <div className="text-center">
        <p className="font-['Press_Start_2P'] text-lg text-[var(--neon-cyan)]">
          Sala: {roomId}
        </p>
        <p className="font-mono text-sm text-gray-500 mt-2">
          Comparte este código con tus amigos
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <p className="font-['Press_Start_2P'] text-[10px] text-gray-400 uppercase tracking-wider">
          Jugadores ({readyCount}/4)
        </p>
        {players.map((p) => (
          <div
            key={p.name}
            className={`
              flex items-center gap-3 px-4 py-3 border-2
              ${p.isLocal
                ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5'
                : 'border-gray-700 bg-black/30'}
            `}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--neon-cyan)]" />
            <span className="font-mono text-sm text-[var(--text-primary)]">
              {p.name}
              {p.isLocal ? ' (tú)' : ''}
            </span>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 4 - players.length) }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-800 bg-black/10"
          >
            <span className="w-2 h-2 rounded-full bg-gray-800" />
            <span className="font-mono text-sm text-gray-700">Esperando jugador...</span>
          </div>
        ))}
      </div>

      <Button
        size="lg"
        glowing={readyCount >= 2}
        disabled={readyCount < 2 || connectionStatus !== 'connected'}
        onClick={() => startGame()}
      >
        {readyCount < 2 ? 'Esperando jugadores...' : 'INICIAR PARTIDA'}
      </Button>
    </div>
  )
}
