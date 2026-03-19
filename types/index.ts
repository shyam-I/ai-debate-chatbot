export interface Message {
  id: string
  content: string
  role: 'user' | 'ai'
  timestamp: Date
}

export interface Stats {
  logic: number
  clarity: number
  strength: number
}

export interface DebateResult {
  winner: 'user' | 'ai'
  weakPoints: string[]
  suggestions: string[]
}
