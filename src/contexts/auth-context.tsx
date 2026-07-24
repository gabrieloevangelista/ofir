"use client"

import { createContext, useContext, useState, useEffect } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Opcional: Persistir o mock de login no sessionStorage para não perder ao recarregar a página
  useEffect(() => {
    const savedState = sessionStorage.getItem("mock_auth")
    if (savedState === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    sessionStorage.setItem("mock_auth", "true")
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("mock_auth")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
