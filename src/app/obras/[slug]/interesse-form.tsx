"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, Loader2, HardHat, Lock, LogIn, Eye, EyeOff, Paperclip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createLead, type LeadFormState } from "@/lib/leads"
import { useAuth } from "@/contexts/auth-context"

const initialState: LeadFormState = { status: "idle" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full gap-1.5 py-5 font-semibold text-sm rounded-none">
      {pending ? <Loader2 className="size-4 animate-spin" /> : <HardHat className="size-4 shrink-0" />}
      {pending ? "Enviando Solicitação..." : "Solicitar Orçamento de Mão de Obra"}
    </Button>
  )
}

export function InteresseForm({ obraId }: { obraId: string }) {
  const [state, formAction] = useActionState(createLead, initialState)
  const { isAuthenticated, login } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [isRegistering, setIsRegistering] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    // Simulate network delay for login
    setTimeout(() => {
      setIsLoggingIn(false)
      login()
    }, 1200)
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-none border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
        <CheckCircle2 className="size-10 text-emerald-500" />
        <p className="font-heading text-lg font-semibold text-foreground">Solicitação Enviada!</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center text-center gap-2 mb-2">
            <div className="size-10 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-1">
              <Lock className="size-5" />
            </div>
            <h3 className="font-heading text-lg font-bold">{isRegistering ? "Criar Conta OFIR" : "Acesso à Plataforma"}</h3>
            <p className="text-xs text-muted-foreground">
              {isRegistering 
                ? "Cadastre-se para solicitar orçamentos e gerenciar seus fornecedores." 
                : "Entre com sua conta OFIR para solicitar orçamentos e contatar fornecedores."}
            </p>
          </div>
          
          {isRegistering && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="auth-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Nome Completo
              </Label>
              <Input id="auth-name" type="text" placeholder="Seu nome" required className="bg-secondary/10 rounded-none" />
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="auth-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              E-mail
            </Label>
            <Input id="auth-email" type="email" placeholder="nome@email.com" required className="bg-secondary/10 rounded-none" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="auth-pass" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Senha
            </Label>
            <div className="relative">
              <Input 
                id="auth-pass" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                required 
                className="bg-secondary/10 rounded-none pr-10" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" disabled={isLoggingIn} className="w-full gap-1.5 py-5 font-semibold text-sm rounded-none mt-2">
            {isLoggingIn ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4 shrink-0" />}
            {isLoggingIn 
              ? (isRegistering ? "Cadastrando..." : "Autenticando...") 
              : (isRegistering ? "Criar Minha Conta" : "Entrar na minha conta")}
          </Button>
          
          <div className="flex items-center justify-between mt-2">
            <Button type="button" variant="ghost" onClick={() => setIsRegistering(!isRegistering)} className="text-xs rounded-none text-muted-foreground hover:text-foreground">
              {isRegistering ? "Já tenho uma conta" : "Criar uma conta"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowLogin(false)} className="text-xs rounded-none text-muted-foreground hover:text-foreground">
              Cancelar
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className="flex flex-col items-center gap-4 text-center py-6 px-4 border border-border bg-card">
        <Lock className="size-8 text-muted-foreground mb-1" />
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">Login Necessário</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Para solicitar orçamentos diretos com os melhores fornecedores e engenheiros da plataforma OFIR, você precisa ter uma conta ativa.
          </p>
        </div>
        <Button onClick={() => setShowLogin(true)} className="w-full gap-2 rounded-none mt-2">
          <LogIn className="size-4" />
          Fazer Login / Cadastrar
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 animate-in fade-in duration-300">
      <input type="hidden" name="obraId" value={obraId} />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nome" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Nome Completo
        </Label>
        <Input id="nome" name="nome" placeholder="Seu nome completo" required className="bg-secondary/10 rounded-none" />
        {state.fieldErrors?.nome ? (
          <p className="text-xs text-destructive">{state.fieldErrors.nome}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            E-mail de Contato
          </Label>
          <Input id="email" name="email" type="email" placeholder="nome@email.com" required className="bg-secondary/10 rounded-none" />
          {state.fieldErrors?.email ? (
            <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="telefone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Telefone / WhatsApp
          </Label>
          <Input id="telefone" name="telefone" placeholder="(00) 00000-0000" className="bg-secondary/10 rounded-none" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="servico" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Tipo de Empresa / Serviço Desejado
        </Label>
        <select
          id="servico"
          name="servico"
          defaultValue="Construtora (Construção Integral)"
          className="flex h-9 w-full rounded-none border border-input bg-secondary/10 px-3 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="Construtora (Construção Integral)">Construtora (Construção Integral)</option>
          <option value="Construção em Steel Frame / Light Steel Frame">Construção em Steel Frame / Light Steel Frame</option>
          <option value="Construção em Sistema Monolítico (Painéis EPS/Concreto)">Construção em Sistema Monolítico (Painéis EPS/Concreto)</option>
          <option value="Reformas & Ampliações Residenciais/Comerciais">Reformas & Ampliações Residenciais/Comerciais</option>
          <option value="Empresa de Engenharia (Estrutura/Obra)">Empresa de Engenharia (Estrutura/Obra)</option>
          <option value="Escritório de Arquitetura & Projetos">Escritório de Arquitetura & Projetos</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="padrao" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Padrão de Acabamento Pretendido
        </Label>
        <select
          id="padrao"
          name="padrao"
          defaultValue="Médio Padrão"
          className="flex h-9 w-full rounded-none border border-input bg-secondary/10 px-3 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="Alto Padrão">Alto Padrão (Luxo / Acabamento Premium)</option>
          <option value="Médio Padrão">Médio Padrão (Intermediário / Conforto)</option>
          <option value="Baixo Padrão">Baixo Padrão (Econômico / Essencial)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="mensagem" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Detalhamento do Serviço (opcional)
        </Label>
        <Textarea
          id="mensagem"
          name="mensagem"
          placeholder="Descreva o tamanho do imóvel, prazos desejados ou especificidades da mão de obra..."
          rows={3}
          className="bg-secondary/10 rounded-none"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className="text-sm text-destructive font-medium">{state.message}</p>
      ) : null}

      <div className="flex flex-col gap-1.5 border border-dashed border-border bg-secondary/5 p-4 items-center justify-center text-center">
        <Paperclip className="size-5 text-muted-foreground mb-1" />
        <Label htmlFor="projetos" className="text-xs font-semibold text-foreground cursor-pointer hover:underline">
          Anexar Projetos (Plantas, PDF, Imagens)
        </Label>
        <p className="text-[10px] text-muted-foreground">Tamanho máximo: 10MB</p>
        <Input id="projetos" name="projetos" type="file" multiple className="hidden" />
      </div>

      <SubmitButton />

      <p className="text-center text-[11px] text-muted-foreground">
        O profissional ou construtor selecionado receberá seus dados para envio do orçamento diretamente.
      </p>
    </form>
  )
}
