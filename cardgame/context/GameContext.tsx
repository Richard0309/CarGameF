'use client'

import { createContext, useState, useCallback, useRef, type ReactNode } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'
import { parseCardId } from '@/lib/types'
import type {
  Card,
  GameState,
  PlayerInfo,
  ServerEvent,
  ConnectionStatus,
  CardColor,
} from '@/lib/types'

interface GameContextValue {
  // Connection
  connectionStatus: ConnectionStatus
  playerName: string
  roomId: string

  // Game data
  gameState: GameState | null
  myHand: Card[]
  players: PlayerInfo[]
  error: string | null

  // Actions
  joinRoom: (name: string, room: string) => void
  startGame: (botCount?: number) => void
  playCard: (cardId: string, newColor?: CardColor) => void
  drawCard: () => void
  leaveRoom: () => void
  clearError: () => void
}

export const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected')
  const [playerName, setPlayerName] = useState('')
  const [roomId, setRoomId] = useState('')
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [myHand, setMyHand] = useState<Card[]>([])
  const [error, setError] = useState<string | null>(null)

  const playerNameRef = useRef('')
  const roomIdRef = useRef('')

  const buildPlayers = useCallback((state: GameState, localPlayer: string): PlayerInfo[] => {
    const positions: ('top' | 'bottom' | 'left' | 'right')[] = ['bottom', 'right', 'top', 'left']
    const myIndex = state.players_list.indexOf(localPlayer)
    return state.players_list.map((name, i) => ({
      name,
      cardCount: state.hands_count[name] ?? 0,
      isCurrentTurn: state.current_turn === name,
      isLocal: name === localPlayer,
      position: positions[(i - myIndex + state.players_list.length) % state.players_list.length] as PlayerInfo['position'],
    }))
  }, [])

  const handleMessage = useCallback((event: ServerEvent) => {
    switch (event.event) {
      case 'error': {
        setError(event.error)
        break
      }
      case 'player_joined': {
        break
      }
      case 'game_started': {
        setGameState(event.state)
        if (event.your_hand) {
          setMyHand(event.your_hand.map(parseCardId))
        }
        break
      }
      case 'state_update': {
        setGameState(event.state)
        if (event.your_hand) {
          setMyHand(event.your_hand.map(parseCardId))
        }
        break
      }
      case 'your_hand': {
        setMyHand(event.hand.map(parseCardId))
        break
      }
      case 'player_disconnected': {
        break
      }
    }
  }, [])

  const { status, connect, disconnect, send } = useWebSocket({
    onMessage: handleMessage,
    onConnectionChange: setConnectionStatus,
  })

  const joinRoom = useCallback((name: string, room: string) => {
    setPlayerName(name)
    setRoomId(room)
    setGameState(null)
    setMyHand([])
    setError(null)
    playerNameRef.current = name
    roomIdRef.current = room
    connect(room, name)
  }, [connect])

  const startGame = useCallback((botCount?: number) => {
    send({ action: 'start_game', ...(botCount ? { bots: botCount } : {}) })
  }, [send])

  const playCard = useCallback((cardId: string, newColor?: CardColor) => {
    send({ action: 'play_card', card_id: cardId, ...(newColor ? { new_color: newColor } : {}) })
  }, [send])

  const drawCard = useCallback(() => {
    send({ action: 'draw_card' })
  }, [send])

  const leaveRoom = useCallback(() => {
    disconnect()
    setConnectionStatus('disconnected')
    setGameState(null)
    setMyHand([])
    setError(null)
  }, [disconnect])

  const clearError = useCallback(() => setError(null), [])

  const players = gameState
    ? buildPlayers(gameState, playerName)
    : []

  return (
    <GameContext.Provider
      value={{
        connectionStatus: status,
        playerName,
        roomId,
        gameState,
        myHand,
        players,
        error,
        joinRoom,
        startGame,
        playCard,
        drawCard,
        leaveRoom,
        clearError,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
