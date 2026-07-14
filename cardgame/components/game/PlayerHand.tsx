'use client'

import { useGame } from '@/hooks/useGame'
import Card from './Card'
import ColorPicker from './ColorPicker'
import { useState } from 'react'

export default function PlayerHand() {
  const { myHand, gameState, playerName, playCard } = useGame()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null)

  const isMyTurn = gameState?.current_turn === playerName && gameState?.is_active

  const handleCardClick = (cardId: string) => {
    if (!isMyTurn) return
    const card = myHand.find((c) => c.id === cardId)
    if (!card) return

    if (card.color === 'negro') {
      setShowColorPicker(cardId)
      return
    }

    playCard(cardId)
  }

  const handleColorPick = (newColor: string) => {
    if (showColorPicker) {
      playCard(showColorPicker, newColor as any)
      setShowColorPicker(null)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 w-full overflow-x-auto pb-2">
        <p className="font-['Press_Start_2P'] text-[8px] text-gray-500 uppercase tracking-wider">
          {isMyTurn ? 'Tu turno' : 'Esperando turno...'}
        </p>
        <div className="flex items-center justify-center gap-1.5 px-4 min-h-[140px]">
          {myHand.map((card) => (
            <div key={card.id} className="transition-all duration-150 hover:scale-105">
              <Card
                card={card}
                size="md"
                isPlayable={isMyTurn}
                selected={selectedCard === card.id}
                onClick={() => handleCardClick(card.id)}
              />
            </div>
          ))}
          {myHand.length === 0 && (
            <p className="font-mono text-sm text-gray-600 animate-pulse">Sin cartas</p>
          )}
        </div>
      </div>

      <ColorPicker
        open={!!showColorPicker}
        onPick={handleColorPick}
      />
    </>
  )
}
