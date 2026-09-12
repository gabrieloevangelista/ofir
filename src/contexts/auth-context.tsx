"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { AuthDialog } from "@/components/auth/auth-dialog"

export type User = {
  nome: string
  email: string
  telefone: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  login: (userData?: User) => void
  logout: () => void
  openLoginModal: () => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEFAULT_MOCK_USER: User = {
  nome: "Gabriel Evangelista",
  email: "gabriel@ofir.com.br",
  telefone: "(41) 99999-9999"
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Opcional: Persistir o mock de login no sessionStorage para não perder ao recarregar a página
  useEffect(() => {
    const savedState = sessionStorage.getItem("mock_auth")
    if (savedState === "true") {
      setIsAuthenticated(true)
      const savedUser = sessionStorage.getItem("mock_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      } else {
        setUser(DEFAULT_MOCK_USER)
      }
    }
  }, [])

  const login = (userData?: User) => {
    const activeUser = userData || DEFAULT_MOCK_USER
    setIsAuthenticated(true)
    setUser(activeUser)
    setIsModalOpen(false)
    sessionStorage.setItem("mock_auth", "true")
    sessionStorage.setItem("mock_user", JSON.stringify(activeUser))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    sessionStorage.removeItem("mock_auth")
    sessionStorage.removeItem("mock_user")
  }

  const openLoginModal = () => setIsModalOpen(true)
  const closeLoginModal = () => setIsModalOpen(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, openLoginModal, closeLoginModal }}>
      {children}
      <AuthDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
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
