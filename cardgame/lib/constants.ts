import type { CardColor, CardShape } from './types'

export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'

export const MAX_PLAYERS = 4
export const MIN_PLAYERS = 2
export const HAND_CARDS = 5

export const COLOR_MAP: Record<CardColor, { bg: string; text: string; border: string; glow: string }> = {
  rojo:    { bg: '#dc2626', text: '#ffffff', border: '#991b1b', glow: 'rgba(220,38,38,0.6)' },
  azul:    { bg: '#2563eb', text: '#ffffff', border: '#1e40af', glow: 'rgba(37,99,235,0.6)' },
  verde:   { bg: '#16a34a', text: '#ffffff', border: '#15803d', glow: 'rgba(22,163,74,0.6)' },
  amarillo:{ bg: '#eab308', text: '#000000', border: '#a16207', glow: 'rgba(234,179,8,0.6)' },
  negro:   { bg: '#1e293b', text: '#ffffff', border: '#0f172a', glow: 'rgba(30,41,59,0.6)' },
}

export const SHAPE_MAP: Record<CardShape, string> = {
  triangulo: '\u25B2',
  circulo: '\u25CF',
  cuadrado: '\u25A0',
  estrella: '\u2605',
  infinito: '\u221E',
}

export const SHAPE_LABEL_MAP: Record<CardShape, string> = {
  triangulo: 'triangulo',
  circulo: 'circulo',
  cuadrado: 'cuadrado',
  estrella: 'estrella',
  infinito: 'infinito',
}

export const COLOR_NAMES: Record<CardColor, string> = {
  rojo: 'Rojo',
  azul: 'Azul',
  verde: 'Verde',
  amarillo: 'Amarillo',
  negro: 'Negro',
}
