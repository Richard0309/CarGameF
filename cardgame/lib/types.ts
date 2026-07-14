export type CardColor = 'rojo' | 'azul' | 'verde' | 'amarillo' | 'negro'
export type CardValue =
  | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10'
  | '+2' | '+4' | 'cd' | 'ct' | 'cc'

export type CardShape = 'triangulo' | 'circulo' | 'cuadrado' | 'estrella' | 'infinito'

export interface Card {
  id: string
  value: CardValue
  color: CardColor
  shape: CardShape
}

export interface GameState {
  room_id: string
  is_active: boolean
  winner: string | null
  current_turn: string
  top_card: string
  direction_reversed: boolean
  players_list: string[]
  hands_count: Record<string, number>
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

export interface PlayerInfo {
  name: string
  cardCount: number
  isCurrentTurn: boolean
  isLocal: boolean
  position: 'top' | 'bottom' | 'left' | 'right'
}

export type ServerEvent =
  | { event: 'player_joined'; player: string; message: string }
  | { event: 'game_started'; state: GameState; your_hand: string[] }
  | { event: 'state_update'; state: GameState; your_hand: string[] }
  | { event: 'your_hand'; hand: string[] }
  | { event: 'player_disconnected'; message: string }
  | { event: 'error'; error: string }

export type ClientAction =
  | { action: 'start_game'; bots?: number }
  | { action: 'play_card'; card_id: string; new_color?: CardColor }
  | { action: 'draw_card' }

export function parseCardId(id: string): Card {
  const parts = id.split(' ')
  const value = parts[0] as CardValue
  const color = parts[1] as CardColor
  const shapeMap: Record<string, CardShape> = {
    rojo: 'triangulo',
    azul: 'circulo',
    verde: 'cuadrado',
    amarillo: 'estrella',
    negro: 'infinito',
  }
  return { id, value, color, shape: shapeMap[color] }
}
