'use client'

import { useGame } from '@/hooks/useGame'
import Lobby from './Lobby'
import PlayerHand from './PlayerHand'
import PlayerPanel from './PlayerPanel'
import DiscardPile from './DiscardPile'
import DrawPile from './DrawPile'
import TurnIndicator from './TurnIndicator'
import GameOver from './GameOver'
import Button from '@/components/ui/Button'

export default function GameBoard() {
  const { gameState, players, connectionStatus, error, clearError } = useGame()

  if (!gameState?.is_active && !gameState?.winner) {
    return <Lobby />
  }

  const currentPlayer = players.find((p) => p.isLocal)
  const opponentTop = players.find((p) => p.position === 'top')
  const opponentLeft = players.find((p) => p.position === 'left')
  const opponentRight = players.find((p) => p.position === 'right')

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-[var(--bg-table)] to-[var(--bg-secondary)] relative overflow-hidden">
      <GameOver />

      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/'}
        >
          ← Salir
        </Button>
      </div>

      {/* Top: opponent across */}
      <div className="flex justify-center pt-6 px-4">
        {opponentTop && <PlayerPanel player={opponentTop} />}
      </div>

      {/* Middle: left, center (table), right */}
      <div className="flex flex-1 items-center justify-center gap-8 px-4">
        {/* Left opponent */}
        <div className="hidden sm:flex flex-col items-center gap-2">
          {opponentLeft && (
            <div className="-rotate-90 origin-center">
              <PlayerPanel player={opponentLeft} />
            </div>
          )}
        </div>

        {/* Center table */}
        <div className="flex flex-col items-center gap-4">
          {/* Turn indicator */}
          <TurnIndicator />

          {/* Card piles */}
          <div className="flex items-center gap-4">
            <DrawPile />
            <DiscardPile />
          </div>
        </div>

        {/* Right opponent */}
        <div className="hidden sm:flex flex-col items-center gap-2">
          {opponentRight && (
            <div className="rotate-90 origin-center">
              <PlayerPanel player={opponentRight} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom: current player's hand */}
      <div className="pb-4 px-2">
        {currentPlayer && <PlayerHand />}
      </div>

      {/* Error toast */}
      {error && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-[slide-in-up_0.2s_ease-out]">
          <div className="flex items-center gap-3 px-5 py-3 border-2 border-[var(--neon-pink)] bg-black/90 backdrop-blur">
            <span className="font-mono text-sm text-[var(--neon-pink)]">{error}</span>
            <button
              type="button"
              onClick={clearError}
              className="text-gray-500 hover:text-white cursor-pointer text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
