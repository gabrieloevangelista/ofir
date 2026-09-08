"use client"

import { useActionState, useState, useEffect } from "react"
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
    <Button type="submit" disabled={pending} className="w-full gap-1.5 py-5 font-semibold text-sm rounded-none shadow-none">
      {pending ? <Loader2 className="size-4 animate-spin" /> : <HardHat className="size-4 shrink-0" />}
      {pending ? "Enviando Solicitação..." : "Solicitar Orçamento de Mão de Obra"}
    </Button>
  )
}

export function InteresseForm({ obraId }: { obraId: string }) {
  const [state, formAction] = useActionState(createLead, initialState)
  const { isAuthenticated, user, login } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    if (state.status === "success") {
      const nomeVal = user?.nome || "Gabriel Evangelista"
      const emailVal = user?.email || "gabriel@ofir.com.br"
      const telefoneVal = user?.telefone || "(41) 99999-9999"

      const servicoDropdown = document.getElementById("servico") as HTMLSelectElement
      const servicoVal = servicoDropdown?.value || "Construção Integral"

      const padraoDropdown = document.getElementById("padrao") as HTMLSelectElement
      const padraoVal = padraoDropdown?.value || "Médio Padrão"

      const mensagemTextarea = document.getElementById("mensagem") as HTMLTextAreaElement
      const mensagemVal = mensagemTextarea?.value || "Sem detalhes adicionais"

      const text = `Olá! Nova solicitação de Mão de Obra via OFIR:\n\n` +
        `👤 Solicitante: ${nomeVal}\n` +
        `📧 E-mail: ${emailVal}\n` +
        `📞 Telefone: ${telefoneVal}\n\n` +
        `🏗️ Serviço Desejado: ${servicoVal}\n` +
        `💎 Padrão Pretendido: ${padraoVal}\n` +
        `📝 Detalhes: ${mensagemVal}\n\n` +
        `📁 Projeto Anexado: [Disponível no Painel do Construtor /admin]`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    }
  }, [state.status, user])

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoggingIn(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const nome = formData.get("nome") as string || email.split("@")[0]
    const telefone = formData.get("telefone") as string || "(41) 99999-9999"

    setTimeout(() => {
      login({ nome, email, telefone })
      setIsLoggingIn(false)
      setShowLogin(false)
    }, 600)
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 border border-border bg-card p-6 text-center rounded-none shadow-none">
        <CheckCircle2 className="size-8 text-primary" />
        <h4 className="font-heading text-lg font-bold text-foreground">Solicitação Enviada!</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {state.message || "A construtora credenciada recebeu seus dados e entrará em contato em breve via WhatsApp ou e-mail."}
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3 p-4 border border-border bg-card rounded-none shadow-none animate-in fade-in">
          <div className="flex items-center justify-between border-b border-border/80 pb-2">
            <span className="font-heading text-sm font-bold text-foreground">
              {isRegistering ? "Criar Conta na OFIR" : "Entrar com OFIR ID"}
            </span>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Cancelar
            </button>
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <Label htmlFor="nome" className="text-xs">Seu Nome Completo</Label>
              <Input id="nome" name="nome" placeholder="Ex: Gabriel Evangelista" required className="h-9 text-sm rounded-none shadow-none" />
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs">Seu E-mail</Label>
            <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="h-9 text-sm rounded-none shadow-none" />
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <Label htmlFor="telefone" className="text-xs">WhatsApp / Telefone</Label>
              <Input id="telefone" name="telefone" type="tel" placeholder="(41) 99999-9999" required className="h-9 text-sm rounded-none shadow-none" />
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs">Sua Senha</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="h-9 text-sm pr-9 rounded-none shadow-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={isLoggingIn} className="w-full gap-2 rounded-none mt-2 h-9 text-xs shadow-none">
            {isLoggingIn ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
            {isRegistering ? "Concluir Cadastro & Prosseguir" : "Acessar e Continuar"}
          </Button>

          <div className="text-center pt-2 border-t border-border/80">
            <Button
              variant="link"
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              {isRegistering ? "Já tem uma conta? Entrar" : "Não tem conta? Cadastre-se em 30s"}
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className="flex flex-col items-center gap-4 text-center py-6 px-4 border border-border bg-card rounded-none shadow-none">
        <Lock className="size-8 text-muted-foreground mb-1" />
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">Login Necessário</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Para solicitar orçamentos diretos com os melhores fornecedores e engenheiros da plataforma OFIR, você precisa ter uma conta ativa.
          </p>
        </div>
        <Button onClick={() => setShowLogin(true)} className="w-full gap-2 rounded-none mt-2 shadow-none">
          <LogIn className="size-4" />
          Fazer Login / Cadastrar
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 animate-in fade-in duration-300">
      <input type="hidden" name="obraId" value={obraId} />

      {/* Dados de Contato com layout vertical que não colide colunas */}
      <div className="bg-secondary/30 border border-border p-3.5 flex flex-col gap-2 rounded-none shadow-none text-xs text-muted-foreground">
        <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
          <span className="font-semibold text-foreground uppercase tracking-wider text-[10px]">
            Dados de Contato (OFIR ID)
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Conta Verificada</span>
        </div>
        <div className="space-y-1.5 pt-0.5">
          <div className="flex flex-wrap items-baseline gap-1 text-xs">
            <span className="text-muted-foreground">Nome:</span>
            <strong className="text-foreground font-semibold">{user?.nome}</strong>
          </div>
          <div className="flex flex-wrap items-baseline gap-1 text-xs">
            <span className="text-muted-foreground">E-mail:</span>
            <strong className="text-foreground font-semibold break-all">{user?.email}</strong>
          </div>
          <div className="flex flex-wrap items-baseline gap-1 text-xs">
            <span className="text-muted-foreground">Telefone:</span>
            <strong className="text-foreground font-semibold">{user?.telefone}</strong>
          </div>
        </div>
      </div>

      <input type="hidden" name="nome" value={user?.nome || ""} />
      <input type="hidden" name="email" value={user?.email || ""} />
      <input type="hidden" name="telefone" value={user?.telefone || ""} />

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
          className="bg-secondary/10 rounded-none shadow-none"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className="text-sm text-destructive font-medium">{state.message}</p>
      ) : null}

      <div className="flex flex-col gap-1.5 border border-dashed border-border bg-secondary/5 p-4 items-center justify-center text-center rounded-none shadow-none">
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
