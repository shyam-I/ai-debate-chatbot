'use client'

import React from 'react'
import { Message } from '@/types'
import { Sparkles } from 'lucide-react'

interface MessageBubbleProps {
  message: Message
}

/**
 * Avatar component for message sender
 */
function MessageAvatar({ role }: { role: 'user' | 'ai' }) {
  const isUser = role === 'user'
  
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      isUser
        ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
        : 'bg-gradient-to-br from-purple-600 to-blue-500 glow-purple'
    }`}>
      {isUser ? (
        <span className="text-sm font-bold text-white">U</span>
      ) : (
        <Sparkles className="w-4 h-4 text-white" />
      )}
    </div>
  )
}

/**
 * Timestamp display with client-side hydration safety
 */
function MessageTimestamp({ timestamp, isUser }: { timestamp: Date; isUser: boolean }) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <span 
      className={`text-xs text-muted-foreground ${isUser ? 'text-right' : 'text-left'}`}
      suppressHydrationWarning
    >
      {formatTime(timestamp)}
    </span>
  )
}

/**
 * Message content bubble
 */
function MessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  return (
    <div
      className={`max-w-md px-4 py-3 rounded-2xl ${
        isUser
          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none'
          : 'glass-light rounded-bl-none'
      }`}
    >
      <p className="text-sm leading-relaxed">{content}</p>
    </div>
  )
}

/**
 * MessageBubble - Individual message display with avatar, content, and timestamp
 * Handles both user and AI messages with appropriate styling
 */
export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <MessageAvatar role={message.role} />
      
      <div className="flex flex-col gap-1">
        <MessageContent content={message.content} isUser={isUser} />
        <MessageTimestamp timestamp={message.timestamp} isUser={isUser} />
      </div>
    </div>
  )
}
