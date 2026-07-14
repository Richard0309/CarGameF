'use client'

import { useGame } from '@/hooks/useGame'

export default function DrawPile() {
  const { drawCard, gameState, playerName } = useGame()

  const isMyTurn = gameState?.current_turn === playerName && gameState?.is_active

  return (
    <button
      type="button"
      disabled={!isMyTurn}
      onClick={drawCard}
      className={`
        w-20 h-28 rounded-lg border-2 select-none
        bg-gradient-to-br from-gray-800 to-gray-900
        border-gray-600
        flex flex-col items-center justify-center gap-2
        transition-all duration-150
        shadow-lg
        ${isMyTurn
          ? 'cursor-pointer hover:brightness-110 hover:shadow-[0_0_15px_rgba(0,255,247,0.3)] active:scale-95'
          : 'cursor-default opacity-60'
        }
      `}
      aria-label="Robar carta"
      title="Robar carta"
    >
      <span className="text-3xl text-gray-500 font-bold">?</span>
      <span className="font-['Press_Start_2P'] text-[7px] text-gray-500 uppercase">
        robar
      </span>
    </button>
  )
}
