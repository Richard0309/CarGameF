'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useGame } from '@/hooks/useGame'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const ROOM_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function generateRoomId(): string {
  let id = ''
  for (let i = 0; i < 6; i++) {
    id += ROOM_CHARS[Math.floor(Math.random() * ROOM_CHARS.length)]
  }
  return id
}

export default function Home() {
  const router = useRouter()
  const { joinRoom } = useGame()
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [botMode, setBotMode] = useState(false)
  const [botCount, setBotCount] = useState(2)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const finalRoom = isCreating || !room.trim() ? generateRoomId() : room.trim()
    const finalName = name.trim() || `Player${Math.floor(Math.random() * 1000)}`
    joinRoom(finalName, finalRoom)
    const query = botMode ? `?bots=${botCount}` : ''
    router.push(`/room/${finalRoom}${query}`)
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[var(--bg-primary)] p-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="text-center">
          <h1 className="font-['Press_Start_2P'] text-2xl text-[var(--neon-cyan)] tracking-wider drop-shadow-[0_0_15px_rgba(0,255,247,0.5)]">
            Color
            <span className="text-[var(--neon-pink)]">Match</span>
          </h1>
          <p className="font-mono text-sm text-gray-500 mt-2">~ arcade edition ~</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <Input
            id="player-name"
            label="tu nombre"
            placeholder="Ingresa tu nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />

          {!botMode && (
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="room-id"
                  label="código de sala"
                  placeholder={isCreating ? '(se creará automáticamente)' : 'Ej: ABC123'}
                  value={room}
                  onChange={(e) => setRoom(e.target.value.toUpperCase())}
                  maxLength={6}
                  disabled={isCreating}
                  className={isCreating ? 'opacity-30' : ''}
                />
              </div>
              <button
                type="button"
                onClick={() => { setIsCreating(!isCreating); setRoom('') }}
                className={`
                  self-end px-3 py-2.5 border-2 font-['Press_Start_2P'] text-[8px] uppercase
                  transition-all duration-150 cursor-pointer
                  ${isCreating
                    ? 'bg-[var(--neon-cyan)] text-black border-[var(--neon-cyan)]'
                    : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}
                `}
              >
                crear
              </button>
            </div>
          )}

          <label className="flex items-center gap-3 px-3 py-3 border-2 border-gray-700 cursor-pointer hover:border-gray-500 transition-colors select-none">
            <input
              type="checkbox"
              checked={botMode}
              onChange={() => { setBotMode(!botMode); setIsCreating(true) }}
              className="w-4 h-4 accent-[var(--neon-cyan)]"
            />
            <span className="font-mono text-sm text-[var(--text-primary)]">
              🤖 Jugar contra bots
            </span>
          </label>

          {botMode && (
            <div className="flex items-center justify-center gap-3 px-3 py-3 border-2 border-dashed border-gray-700">
              <span className="font-mono text-xs text-gray-400 uppercase">Bots:</span>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setBotCount(n)}
                  className={`
                    w-10 h-10 border-2 font-['Press_Start_2P'] text-sm
                    transition-all duration-150 cursor-pointer
                    ${botCount === n
                      ? 'bg-[var(--neon-cyan)] text-black border-[var(--neon-cyan)] shadow-[0_0_8px_rgba(0,255,247,0.4)]'
                      : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}
                  `}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          <Button type="submit" size="lg" glowing className="w-full mt-2">
            {botMode ? 'JUGAR CON BOTS' : isCreating ? 'CREAR SALA' : 'UNIRSE'}
          </Button>
        </form>

        <p className="font-mono text-xs text-gray-600 text-center">
          {botMode
            ? `Partida local contra ${botCount} bot${botCount > 1 ? 's' : ''}`
            : isCreating
              ? 'Se generará un código único al entrar'
              : 'Ingresa el código que te compartieron'}
        </p>
      </div>
    </div>
  )
}
