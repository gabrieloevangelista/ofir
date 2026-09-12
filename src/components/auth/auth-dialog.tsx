"use client"

import React, { useState } from "react"
import { Lock, UserCheck, Sparkles, Building2, Phone, Mail, User, ShieldCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const { login } = useAuth()
  const [tab, setTab] = useState<"rapido" | "formulario">("rapido")
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")

  const handleQuickLogin = () => {
    login()
    onOpenChange(false)
  }

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !email.trim()) return
    login({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim() || "(11) 99999-8888",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] rounded-none border-border shadow-2xl p-6 bg-card">
        <DialogHeader className="space-y-2">
          <div className="size-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
            <Lock className="size-5 text-primary" />
          </div>
          <DialogTitle className="font-heading text-xl font-bold tracking-tight text-foreground">
            Acesso Exclusivo à Cotação
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Faça login ou crie sua conta para visualizar os preços reais por m², adicionar fornecedores à sua cotação e gerar o orçamento completo da obra.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Quick Demo Access Button */}
          <div className="p-4 border border-primary/30 bg-primary/5 space-y-3">
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-4" />
              <span>Acesso Rápido de Demonstração</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Acesse imediatamente com uma conta de teste para simular orçamentos e testar a plataforma.
            </p>
            <Button
              type="button"
              onClick={handleQuickLogin}
              className="w-full rounded-none font-semibold text-xs h-10 shadow-none"
            >
              <UserCheck className="size-4 mr-2" />
              Entrar como Gabriel Evangelista (Demo)
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-border w-full" />
            <span className="bg-card px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground absolute">
              ou crie sua conta simulada
            </span>
          </div>

          {/* Form Login / Cadastro */}
          <form onSubmit={handleFormLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <User className="size-3.5 text-muted-foreground" />
                Seu Nome Completo
              </label>
              <Input
                placeholder="Ex: João da Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="h-9 text-xs rounded-none bg-background border-border shadow-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Mail className="size-3.5 text-muted-foreground" />
                E-mail
              </label>
              <Input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-xs rounded-none bg-background border-border shadow-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Phone className="size-3.5 text-muted-foreground" />
                WhatsApp / Telefone (Opcional)
              </label>
              <Input
                placeholder="(11) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="h-9 text-xs rounded-none bg-background border-border shadow-none"
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={!nome.trim() || !email.trim()}
              className="w-full rounded-none font-semibold text-xs h-10 border-border shadow-none hover:bg-secondary"
            >
              <ShieldCheck className="size-4 mr-2 text-primary" />
              Criar Conta e Desbloquear Preços
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
