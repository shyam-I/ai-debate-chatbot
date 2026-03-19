'use client'

import React, { useState, useRef, useEffect } from 'react'
import Header from '@/components/header'
import ChatContainer from '@/components/chat-area'
import StatsPanel from '@/components/stats-panel'
import InputBar from '@/components/input-bar'
import ResultsModal from '@/components/results-modal'
import { Message } from '@/types'

// 🔥 API FUNCTIONS
const sendDebate = async (
  message: string,
  history: any[],
  language: string
) => {
  const res = await fetch("http://localhost:8000/debate/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_input: message,
      history,
      language
    })
  })
  return res.json()
}

const evaluateDebate = async (history: any[], language: string) => {
  const res = await fetch("http://localhost:8000/evaluate/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history, language })
  })
  return res.json()
}

export default function Home() {

  const [language, setLanguage] = useState("English")

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to AI Debate Arena 😏 Start your argument!",
      role: 'ai',
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [round, setRound] = useState(1)

  const [stats, setStats] = useState({
    logic: 0,
    clarity: 0,
    strength: 0,
  })

  const [showResults, setShowResults] = useState(false)
  const [winner, setWinner] = useState<'user' | 'ai' | null>(null)
  const [weaknesses, setWeaknesses] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 🎤 VOICE INPUT
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Use Chrome for voice support")
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang =
      language === "Tamil"
        ? "ta-IN"
        : language === "Hindi"
        ? "hi-IN"
        : "en-US"

    recognition.start()

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      handleSendMessage(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error("Voice error:", event.error)
    }
  }

  // 🔊 AI SPEAK
  const speakAI = (text: string) => {
  window.speechSynthesis.cancel()

  const speech = new SpeechSynthesisUtterance(text)

  // 🌍 Language
  if (language === "Tamil") speech.lang = "ta-IN"
  else if (language === "Hindi") speech.lang = "hi-IN"
  else speech.lang = "en-US"

  // 🧠 CONTROL THESE ↓↓↓
  speech.rate = 0.75     // 🔥 slower (default = 1)
  speech.pitch = 1       // normal voice
  speech.volume = 1      // max clarity
 const voices = window.speechSynthesis.getVoices()
  const tamilVoice = voices.find(v => v.lang.includes("ta"))
  if (tamilVoice) speech.voice = tamilVoice

  window.speechSynthesis.speak(speech)
}

  // 🏁 END DEBATE
  const handleEndDebate = async () => {
    if (messages.length < 2) {
      alert("Start a debate first!")
      return
    }

    try {
      const result = await evaluateDebate(
        messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        language
      )

      setStats({
        logic: (result.logic || 5) * 10,
        clarity: (result.clarity || 5) * 10,
        strength: (result.strength || 5) * 10,
      })

      setWeaknesses(result.weaknesses || [])
      setSuggestions(result.suggestions || [])

      setWinner(result?.winner?.toLowerCase() || 'ai')

      setShowResults(true)

    } catch (err) {
      console.error("End Debate Error:", err)
    }
  }

  // 🚀 SEND MESSAGE
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: 'user',
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const cleanHistory = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const res = await sendDebate(text, cleanHistory, language)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: res.ai_response,
        role: 'ai',
        timestamp: new Date(),
      }

      const newMessages = [...updatedMessages, aiMessage]

      setMessages(newMessages)
      setRound(prev => prev + 1)

      const cleanText = res.ai_response
        .replace(/[*•]/g, '')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      speakAI(cleanText)

    } catch (err) {
      console.error("ERROR:", err)
    }

    setIsLoading(false)
  }

  // 🔄 RESET
  const handleNewDebate = () => {
    setMessages([
      {
        id: '1',
        content: 'New debate started! Give your argument.',
        role: 'ai',
        timestamp: new Date(),
      },
    ])
    setRound(1)
    setStats({ logic: 0, clarity: 0, strength: 0 })
    setShowResults(false)
    setWinner(null)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* 🌍 LANGUAGE SELECT */}
      <div className="absolute top-4 right-4 z-20">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        >
          <option>English</option>
          <option>Tamil</option>
          <option>Hindi</option>
        </select>
      </div>

      <div className="relative z-10 flex flex-col h-screen">

        <Header
          onNewDebate={handleNewDebate}
          onEndDebate={handleEndDebate}
        />

        <div className="flex-1 flex gap-6 p-6 overflow-hidden">

          <div className="flex-1 flex flex-col min-w-0">
            <ChatContainer
              messages={messages}
              isLoading={isLoading}
              chatEndRef={chatEndRef}
            />

            <InputBar
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              onVoiceClick={startListening}
            />
          </div>

          <div className="w-80">
            <StatsPanel round={round} stats={stats} />
          </div>

        </div>
      </div>

      {showResults && winner && (
        <ResultsModal
          winner={winner}
          weaknesses={weaknesses}
          suggestions={suggestions}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  )
}