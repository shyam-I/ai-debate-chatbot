'use client'

import React from 'react'
import { Message } from '@/types'
import MessageBubble from './message-bubble'
import TypingIndicator from './typing-indicator'

interface ChatContainerProps {
  messages: Message[]
  isLoading: boolean
  chatEndRef: React.RefObject<HTMLDivElement | null>
}

export default function ChatContainer({ messages, isLoading, chatEndRef }: ChatContainerProps) {
  return (
    <div className="flex-1 overflow-y-auto pr-4 space-y-4 pb-4">
      
      {messages.map((message, index) => (
        <div
          key={message.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <MessageBubble message={message} />
        </div>
      ))}

      {isLoading && (
        <div className="animate-fade-in">
          <TypingIndicator />
        </div>
      )}

      {/* ✅ SCROLL TARGET */}
      <div ref={chatEndRef} />

    </div>
  )
}