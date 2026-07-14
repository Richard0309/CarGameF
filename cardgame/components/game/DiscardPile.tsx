'use client'

import { useGame } from '@/hooks/useGame'
import { parseCardId } from '@/lib/types'
import Card from './Card'

export default function DiscardPile() {
  const { gameState } = useGame()

  if (!gameState?.top_card) {
    return (
      <div className="w-20 h-28 rounded-lg border-2 border-dashed border-gray-800 flex items-center justify-center">
        <span className="font-mono text-xs text-gray-700">vacío</span>
      </div>
    )
  }

  const card = parseCardId(gameState.top_card)

  return (
    <div className="relative">
      <div className="absolute -top-1 -left-1 w-20 h-28 rounded-lg bg-gray-900/50 border border-gray-800 rotate-3" />
      <div className="relative">
        <Card card={card} size="md" />
      </div>
    </div>
  )
}
