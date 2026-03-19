import React from 'react'
import { Brain, Target, Zap, LucideIcon } from 'lucide-react'
import { Stats } from '@/types'

interface StatsPanelProps {
  round: number
  stats: Stats
}

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  color: string
}

/**
 * Stat Card - Individual metric display with icon, label, value, and progress bar
 */
function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="glass p-4 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="space-y-2">
        <span className="text-2xl font-bold text-foreground">{Math.round(value)}%</span>
        <div className="w-full h-2 rounded-full bg-purple-900/30 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${color} opacity-80`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Round Info Display
 */
function RoundInfo({ round }: { round: number }) {
  return (
    <div className="border-b border-purple-500/20 pb-4">
      <div className="text-sm text-muted-foreground mb-1">Current Round</div>
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        #{round}
      </div>
    </div>
  )
}

/**
 * Info Box with helpful tips
 */
function InfoBox() {
  return (
    <div className="glass-light rounded-xl p-4 text-xs text-muted-foreground">
      <p>
        Your debate metrics are tracked in real-time. Keep your arguments sharp and watch your scores climb!
      </p>
    </div>
  )
}

/**
 * StatsPanel - Side panel displaying debate metrics and round information
 * Shows logic, clarity, and strength scores with animated progress bars
 */
export default function StatsPanel({ round, stats }: StatsPanelProps) {
  return (
    <div className="glass rounded-2xl p-6 space-y-6 h-fit sticky top-6">
      <RoundInfo round={round} />

      <div className="space-y-4">
        <StatCard
          icon={Brain}
          label="Logic Score"
          value={stats.logic}
          color="text-purple-400"
        />
        <StatCard
          icon={Target}
          label="Clarity Score"
          value={stats.clarity}
          color="text-blue-400"
        />
        <StatCard
          icon={Zap}
          label="Strength Score"
          value={stats.strength}
          color="text-cyan-400"
        />
      </div>

      <InfoBox />
    </div>
  )
}
