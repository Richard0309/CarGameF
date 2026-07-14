'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { WS_BASE_URL } from '@/lib/constants'
import type { ServerEvent, ClientAction, ConnectionStatus } from '@/lib/types'

interface UseWebSocketOptions {
  onMessage: (event: ServerEvent) => void
  onConnectionChange?: (status: ConnectionStatus) => void
}

export function useWebSocket({ onMessage, onConnectionChange }: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const reconnectAttempts = useRef(0)
  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const maxReconnectAttempts = 10

  const updateStatus = useCallback((s: ConnectionStatus) => {
    setStatus(s)
    onConnectionChange?.(s)
  }, [onConnectionChange])

  const connect = useCallback((roomId: string, playerName: string) => {
    disconnect()
    reconnectAttempts.current = 0
    updateStatus('connecting')

    const url = `${WS_BASE_URL}/ws/room/${roomId}/${playerName}`
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      reconnectAttempts.current = 0
      updateStatus('connected')
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as ServerEvent
        onMessage(data)
      } catch {
        /* ignore malformed messages */
      }
    }

    ws.onclose = () => {
      if (ws !== wsRef.current) return
      updateStatus('disconnected')
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000)
        reconnectAttempts.current += 1
        reconnectTimer.current = setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.CLOSED || wsRef.current?.readyState === WebSocket.CLOSING) {
            connect(roomId, playerName)
          }
        }, delay)
      } else {
        updateStatus('error')
      }
    }

    ws.onerror = () => {
      updateStatus('error')
    }
  }, [onMessage, updateStatus])

  const disconnect = useCallback(() => {
    clearTimeout(reconnectTimer.current)
    if (wsRef.current) {
      wsRef.current.onclose = null
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  const send = useCallback((action: ClientAction) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(action))
    }
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(reconnectTimer.current)
      if (wsRef.current) {
        wsRef.current.onclose = null
        wsRef.current.close()
      }
    }
  }, [])

  return { status, connect, disconnect, send }
}
