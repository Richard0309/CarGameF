'use client'

import { COLOR_MAP, SHAPE_MAP } from '@/lib/constants'
import type { Card as CardType } from '@/lib/types'

interface CardProps {
  card: CardType
  isPlayable?: boolean
  selected?: boolean
  faceDown?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: { w: 'w-14', h: 'h-20', font: 'text-[8px]', valueFont: 'text-xs', shapeFont: 'text-lg' },
  md: { w: 'w-20', h: 'h-28', font: 'text-[10px]', valueFont: 'text-lg', shapeFont: 'text-2xl' },
  lg: { w: 'w-24', h: 'h-34', font: 'text-xs', valueFont: 'text-xl', shapeFont: 'text-3xl' },
}

export default function Card({ card, isPlayable, selected, faceDown, onClick, size = 'md' }: CardProps) {
  const s = sizeStyles[size]
  const colors = COLOR_MAP[card.color]
  const shape = SHAPE_MAP[card.shape]

  if (faceDown) {
    return (
      <div
        className={`
          ${s.w} ${s.h} rounded-lg border-2 border-gray-600
          bg-gradient-to-br from-gray-800 to-gray-900
          flex items-center justify-center select-none
          shadow-lg
        `}
      >
        <span className="text-2xl text-gray-500 font-bold">?</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      disabled={!isPlayable || !onClick}
      onClick={onClick}
      className={`
        ${s.w} ${s.h} rounded-lg border-2 select-none
        flex flex-col items-center justify-between p-1.5
        transition-all duration-150 ease-in-out
        shadow-lg
        ${selected ? 'ring-2 ring-[var(--neon-cyan)] shadow-[0_0_15px_rgba(0,255,247,0.5)]' : ''}
        ${isPlayable && onClick
          ? 'cursor-pointer hover:animate-[card-lift_0.2s_ease-out_forwards] hover:shadow-xl hover:brightness-110'
          : 'cursor-default opacity-80'
        }
      `}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
      }}
      aria-label={`Carta ${card.value} ${card.color}`}
      title={`${card.value} ${card.color}`}
    >
      <span className={`${s.font} font-bold self-start leading-none`} style={{ opacity: 0.9 }}>
        {card.value}
      </span>
      <span className={`${s.shapeFont} leading-none`} style={{ opacity: 0.7 }}>
        {shape}
      </span>
      <span className={`${s.font} self-end leading-none`} style={{ opacity: 0.7 }}>
        {card.value}
      </span>
    </button>
  )
}
