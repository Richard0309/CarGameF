'use client'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm text-[var(--neon-cyan)] uppercase tracking-wider font-mono">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          bg-black/60 border-2 border-[var(--neon-cyan)]/40
          text-[var(--text-primary)] font-mono
          px-4 py-2.5 outline-none
          placeholder:text-gray-600
          transition-all duration-150
          focus:border-[var(--neon-cyan)] focus:shadow-[0_0_10px_rgba(0,255,247,0.3)]
          ${className}
        `}
        {...props}
      />
    </div>
  )
}
