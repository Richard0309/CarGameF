'use client'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glowing?: boolean
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-[var(--neon-cyan)] text-black border-[var(--neon-cyan)] hover:brightness-110 active:brightness-90',
  secondary:
    'bg-transparent text-[var(--neon-cyan)] border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10',
  danger:
    'bg-[var(--neon-pink)] text-white border-[var(--neon-pink)] hover:brightness-110',
  ghost:
    'bg-transparent text-[var(--text-primary)] border-transparent hover:bg-white/5',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  glowing = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-['Press_Start_2P'] tracking-tight
        border-2 uppercase cursor-pointer
        transition-all duration-150 ease-in-out
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${glowing && !disabled ? 'animate-[pulse-glow_2s_infinite]' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
