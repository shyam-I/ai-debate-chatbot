'use client'

import React from 'react'
import { Trophy, Lightbulb, Target, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  winner: string
  weaknesses: string[]
  suggestions: string[]
  onClose: () => void
}

/**
 * Modal header with title and close button
 */
function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Debate Results</h2>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

/**
 * Winner display section
 */
function WinnerSection({ winner }: { winner: string }) {
  const isUserWinner = winner === 'user'

  return (
    <div className="text-center space-y-4">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
          isUserWinner
            ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
            : 'bg-gradient-to-br from-purple-600 to-blue-500'
        }`}
      >
        <Trophy className="w-8 h-8 text-white" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-1">Debate Winner</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {isUserWinner ? 'You Win!' : 'AI Wins!'}
        </p>
      </div>
    </div>
  )
}

/**
 * List section (Weakness / Suggestions)
 */
function ListSection({
  icon: Icon,
  title,
  color,
  items = [],
  itemMarker,
}: {
  icon: React.ComponentType<{ className: string }>
  title: string
  color: string
  items?: string[]
  itemMarker: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className={`w-4 h-4 ${color}`} />
        {title}
      </div>

      <ul className="space-y-2">
  {items && items.length > 0 ? (
    items.map((item, idx) => (
      <li key={idx} className="text-sm text-muted-foreground flex gap-2">
        <span className={color}>{itemMarker}</span>
        <span>{item}</span>
      </li>
    ))
  ) : (
    <li className="text-sm text-muted-foreground">No data available</li>
  )}
</ul>
    </div>
  )
}

/**
 * Action buttons
 */
function ActionButtons({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onClose}
        variant="outline"
        className="flex-1 border-purple-500/50 hover:bg-purple-500/10"
      >
        Close
      </Button>

      <Button
        onClick={() => window.location.reload()}
        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
      >
        Try Again
      </Button>
    </div>
  )
}

/**
 * MAIN MODAL COMPONENT
 */
export default function ResultsModal({
  winner,
  weaknesses,
  suggestions,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">

      <div className="glass rounded-2xl max-w-md w-full p-8 space-y-6 border border-purple-500/30">

        <ModalHeader onClose={onClose} />

        <WinnerSection winner={winner} />

        <div className="border-t border-purple-500/20" />

        <ListSection
          icon={Lightbulb}
          title="Weak Points"
          color="text-yellow-400"
          items={weaknesses}
          itemMarker="•"
        />

        <ListSection
          icon={Target}
          title="Suggestions for Improvement"
          color="text-blue-400"
          items={suggestions}
          itemMarker="→"
        />

        <div className="border-t border-purple-500/20" />

        <ActionButtons onClose={onClose} />

      </div>
    </div>
  )
}