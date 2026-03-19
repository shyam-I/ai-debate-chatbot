'use client'

import React from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InputBarProps {
  inputValue: string
  onInputChange: (value: string) => void
  onSendMessage: (message: string) => void
  isLoading: boolean
  onVoiceClick?: () => void // 🎤 voice support
}

/**
 * Input field
 */
function InputField({
  value,
  onChange,
  onKeyDown,
  isLoading,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isLoading: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Enter your argument..."
      disabled={isLoading}
      className="flex-1 glass rounded-full px-6 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50"
    />
  )
}

/**
 * Send button
 */
function SendButton({ isDisabled }: { isDisabled: boolean }) {
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full px-6 py-3 h-auto text-white disabled:opacity-50 transition-all"
    >
      <Send className="w-4 h-4" />
    </Button>
  )
}

/**
 * 🎤 Mic button
 */
function MicButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 rounded-full px-4 py-3 text-white transition-all"
    >
      🎤
    </button>
  )
}

/**
 * MAIN COMPONENT
 */
export default function InputBar({
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading,
  onVoiceClick,
}: InputBarProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const isSubmitDisabled = isLoading || !inputValue.trim()

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 pt-4 border-t border-purple-500/20"
    >
      <InputField
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        isLoading={isLoading}
      />

      {/* 🎤 MIC BUTTON */}
      <MicButton onClick={onVoiceClick} />

      {/* 🚀 SEND */}
      <SendButton isDisabled={isSubmitDisabled} />
    </form>
  )
}