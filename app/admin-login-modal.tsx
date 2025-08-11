"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Lock } from 'lucide-react'

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function AdminLoginModal({ isOpen, onClose, onLogin }: AdminLoginModalProps) {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 데모용 검증 (실서비스에서는 서버 인증 사용)
    if (credentials.username === "admin" && credentials.password === "admin123") {
      // 로그인 정보를 localStorage에 저장 (5시간 유지)
      const loginData = {
        username: credentials.username,
        loginTime: new Date().getTime(),
        expiresAt: new Date().getTime() + (5 * 60 * 60 * 1000) // 5시간
      }
      localStorage.setItem('adminLogin', JSON.stringify(loginData))
      
      onLogin()
      onClose()
      setError("")
    } else {
      setError("로그인에 실패했습니다. 다시 시도하세요.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            로그인
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">아이디</label>
              <Input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">비밀번호</label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
            <p className="text-gray-700">로그인 정보는 공개되지 않습니다. 계정 문의는 관리자에게 요청하세요.</p>
            <p className="text-gray-500 mt-1">로그인 상태는 5시간 동안 유지됩니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLoginModal
