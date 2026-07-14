'use client'

import Modal from '@/components/ui/Modal'
import type { CardColor } from '@/lib/types'
import { COLOR_MAP, COLOR_NAMES } from '@/lib/constants'

interface ColorPickerProps {
  open: boolean
  onPick: (color: CardColor) => void
}

const colors: CardColor[] = ['rojo', 'azul', 'verde', 'amarillo']

export default function ColorPicker({ open, onPick }: ColorPickerProps) {
  return (
    <Modal open={open} title="Elige un color">
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color) => {
          const c = COLOR_MAP[color]
          return (
            <button
              key={color}
              type="button"
              onClick={() => onPick(color)}
              className={`
                flex items-center justify-center gap-2
                px-6 py-4 border-2 cursor-pointer
                font-['Press_Start_2P'] text-xs uppercase
                transition-all duration-150
                hover:brightness-110 hover:scale-105
                active:scale-95
              `}
              style={{
                backgroundColor: c.bg,
                borderColor: c.border,
                color: c.text,
              }}
              aria-label={`Color ${color}`}
            >
              <span
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: c.bg }}
              />
              {COLOR_NAMES[color]}
            </button>
          )
        })}
      </div>
    </Modal>
  )
}
