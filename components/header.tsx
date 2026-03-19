import React from 'react'
import { RotateCcw, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onNewDebate: () => void
  onEndDebate: () => void
}

export default function Header({ onNewDebate, onEndDebate }: HeaderProps) {
  return (
    <div className="glass border-b border-purple-500/30 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-medium text-green-400">Live Debate</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
           🔥 AI Debate Arena – Think. Argue. Win.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sharpen your arguments with AI
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onNewDebate}
            variant="outline"
            className="border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-400 text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Debate
          </Button>
          <Button
            onClick={onEndDebate}
            variant="outline"
            className="border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 text-foreground"
          >
            <Zap className="w-4 h-4 mr-2" />
            End Debate
          </Button>
        </div>
      </div>
    </div>
  )
}
