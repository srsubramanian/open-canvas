'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Plus, Edit3, Download, Share } from 'lucide-react'

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [canvasContent, setCanvasContent] = useState('')
  const [showCanvas, setShowCanvas] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'll help you with that. Let me create something in the canvas for you.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      
      // Show canvas with sample content
      setShowCanvas(true)
      setCanvasContent(`# Sample Document

This is a sample document created in response to your request: "${inputValue}"

## Features
- Real-time editing
- Markdown support
- Export capabilities
- Collaboration tools

## Getting Started
You can edit this content directly in the canvas area.`)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Chat Panel */}
      <div className={`flex flex-col transition-all duration-300 ${showCanvas ? 'w-1/2' : 'w-full'} border-r border-gray-200`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-semibold text-gray-800">ChatGPT Canvas</h1>
          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Welcome to ChatGPT Canvas</h2>
                <p>Start a conversation to see the canvas in action</p>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-2">
            <div className="flex-1 min-h-[44px] max-h-32 border border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message ChatGPT..."
                className="w-full p-3 resize-none border-none outline-none rounded-lg"
                rows={1}
                style={{ height: 'auto', minHeight: '44px' }}
                onInput={(e) => {
                  const target = e.target
                  target.style.height = 'auto'
                  target.style.height = target.scrollHeight + 'px'
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Panel */}
      {showCanvas && (
        <div className="w-1/2 flex flex-col bg-white">
          {/* Canvas Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Canvas</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
                <Edit3 size={16} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
                <Download size={16} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
                <Share size={16} />
              </button>
              <button
                onClick={() => setShowCanvas(false)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Canvas Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <textarea
              value={canvasContent}
              onChange={(e) => setCanvasContent(e.target.value)}
              className="w-full h-full resize-none border-none outline-none text-gray-800 font-mono text-sm leading-relaxed"
              placeholder="Start writing or let AI create content for you..."
            />
          </div>
        </div>
      )}
    </div>
  )
}