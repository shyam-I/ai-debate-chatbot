import React from 'react'
import { Sparkles } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-600 to-blue-500 glow-purple">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="glass-light rounded-bl-none px-4 py-3 rounded-2xl">
        <div className="flex gap-1 items-center h-5">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-typing"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-typing" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-typing" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}
