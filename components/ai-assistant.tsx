'use client'

import { useState, useEffect, useRef } from 'react'
import { Bot, X, Send, User, MessageCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [hasHadFirstResponse, setHasHadFirstResponse] = useState(false)

  useEffect(() => {
    const hasInteracted = localStorage.getItem('modrenino_first_response')
    if (hasInteracted === 'true') {
      setHasHadFirstResponse(true)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          isFirstMessage: !hasHadFirstResponse 
        })
      })

      const data = await response.json()
      
      if (!hasHadFirstResponse) {
        localStorage.setItem('modrenino_first_response', 'true')
        setHasHadFirstResponse(true)
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }])

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'عذراً، حصل خطأ. كلم أيمن على واتساب: 01015262864' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* زر المساعد */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse blur-xl opacity-70"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl">
            <Bot className="w-8 h-8" />
          </div>
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            هاي! 👋
          </div>
        </div>
      </button>

      {/* نافذة المحادثة */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* الهيدر */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">مودرينو</h3>
                  <p className="text-xs opacity-90">المساعد الذكي</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* الرسائل */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && !hasHadFirstResponse && (
              <div className="bg-white p-4 rounded-2xl border border-gray-200">
                <p className="text-sm">هاي! 🤗 أنا مودرينو. اسألني عن أي حاجة بخصوص الأثاث الدمياطي</p>
              </div>
            )}
            
            {messages.map((m, index) => (
              <div key={index} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    m.role === 'user' ? 'bg-amber-600' : 'bg-blue-600'
                  } text-white flex-shrink-0`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    m.role === 'user' ? 'bg-amber-600 text-white' : 'bg-white border border-gray-200'
                  }`}>
                    {m.role === 'user' ? (
                      <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <div 
                        className="text-sm prose prose-sm max-w-none"
                        style={{ 
                          direction: 'rtl',
                          fontFamily: 'Arial, sans-serif'
                        }}
                        dangerouslySetInnerHTML={{ __html: m.content }} 
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* المدخلات */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسأل مودرينو..."
                className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => window.open('https://wa.me/20101526264', '_blank')}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              واتساب للاستشارة المباشرة
            </button>
          </form>
        </div>
      )}
    </>
  )
}