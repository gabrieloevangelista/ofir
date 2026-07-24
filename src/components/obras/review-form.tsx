"use client"

import { useState } from "react"
import { Star, Image as ImageIcon, Send, Loader2, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"

const RATING_CATEGORIES = [
  { key: "tempo_execucao", label: "Tempo de Execução" },
  { key: "experiencia", label: "Experiência com a Empresa" },
  { key: "qualidade", label: "Qualidade no Serviço" },
  { key: "preco", label: "Preço" },
] as const

type CategoryKey = typeof RATING_CATEGORIES[number]["key"]

function StarRatingRow({
  label,
  value,
  hoverValue,
  onChange,
  onHover,
  onLeave,
}: {
  label: string
  value: number
  hoverValue: number
  onChange: (v: number) => void
  onHover: (v: number) => void
  onLeave: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-muted-foreground font-medium min-w-[160px]">{label}</span>
      <div className="flex gap-0.5" onMouseLeave={onLeave}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover(star)}
            className="p-0.5 focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`size-5 ${
                star <= (hoverValue || value)
                  ? "fill-amber-500 text-amber-500"
                  : "text-muted-foreground/25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export function ReviewForm({ obraId: _obraId }: { obraId: string }) {
  const { isAuthenticated, login } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const [ratings, setRatings] = useState<Record<CategoryKey, number>>({
    tempo_execucao: 0,
    experiencia: 0,
    qualidade: 0,
    preco: 0,
  })
  const [hoverRatings, setHoverRatings] = useState<Record<CategoryKey, number>>({
    tempo_execucao: 0,
    experiencia: 0,
    qualidade: 0,
    preco: 0,
  })
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const allRated = Object.values(ratings).every((v) => v > 0)
  const averageRating = allRated
    ? Math.round((Object.values(ratings).reduce((a, b) => a + b, 0) / 4) * 10) / 10
    : 0

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setTimeout(() => {
      setIsLoggingIn(false)
      login()
    }, 1200)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allRated) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-none border border-emerald-500/20 bg-emerald-500/10 p-6 text-center mt-6">
        <CheckCircle2 className="size-10 text-emerald-500" />
        <p className="font-heading text-lg font-semibold text-foreground">Avaliação Enviada!</p>
        <p className="text-sm leading-relaxed text-muted-foreground">Sua avaliação está em análise e será publicada em breve.</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 mt-6 border border-border p-5 bg-card">
          <div className="flex flex-col items-center text-center gap-2 mb-2">
            <div className="size-10 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-1">
              <Lock className="size-5" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {isRegistering ? "Criar uma Conta" : "Faça Login para Avaliar"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-[260px]">
              {isRegistering 
                ? "Crie sua conta para compartilhar sua experiência."
                : "Entre com sua conta para poder avaliar esta empresa."}
            </p>
          </div>

          {isRegistering && (
            <div className="space-y-2">
              <Label htmlFor="rev-name" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Nome Completo</Label>
              <Input id="rev-name" type="text" placeholder="Seu nome" required className="rounded-none bg-background/50 h-11" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="rev-email" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">E-mail Corporativo</Label>
            <Input id="rev-email" type="email" placeholder="seu@email.com" required className="rounded-none bg-background/50 h-11" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rev-password" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Senha</Label>
            <div className="relative">
              <Input 
                id="rev-password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="rounded-none bg-background/50 h-11 pr-10" 
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

          <Button type="submit" disabled={isLoggingIn} className="w-full gap-2 rounded-none h-11 mt-2">
            {isLoggingIn && <Loader2 className="size-4 animate-spin" />}
            {isRegistering ? "Criar Conta" : "Entrar"}
          </Button>

          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-primary hover:underline font-medium"
            >
              {isRegistering 
                ? "Já tem uma conta? Faça login" 
                : "Não tem conta? Cadastre-se"}
            </button>
          </div>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="rounded-none text-xs text-muted-foreground mt-2"
            onClick={() => setShowLogin(false)}
          >
            Cancelar
          </Button>
        </form>
      )
    }

    return (
      <div className="mt-6 border border-border p-6 bg-secondary/20 flex flex-col items-center justify-center text-center gap-4">
        <Lock className="size-8 text-muted-foreground/50" />
        <div>
          <h3 className="font-heading text-lg font-medium text-foreground">Avalie esta empresa</h3>
          <p className="text-sm text-muted-foreground mt-1">Apenas usuários cadastrados podem deixar depoimentos e fotos.</p>
        </div>
        <Button onClick={() => setShowLogin(true)} className="rounded-none gap-2 px-6">
          <Lock className="size-4" />
          Fazer Login para Avaliar
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmitReview} className="mt-6 flex flex-col gap-5 border border-border p-5 bg-card">
      <div>
        <h3 className="font-heading text-lg font-medium text-foreground mb-1">Sua Avaliação</h3>
        <p className="text-sm text-muted-foreground">Compartilhe sua experiência com esta construtora/fornecedor.</p>
      </div>

      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Avalie por Categoria</Label>
        <div className="flex flex-col gap-2.5 bg-background/50 border border-border/50 p-4">
          {RATING_CATEGORIES.map(({ key, label }) => (
            <StarRatingRow
              key={key}
              label={label}
              value={ratings[key]}
              hoverValue={hoverRatings[key]}
              onChange={(v) => setRatings((prev) => ({ ...prev, [key]: v }))}
              onHover={(v) => setHoverRatings((prev) => ({ ...prev, [key]: v }))}
              onLeave={() => setHoverRatings((prev) => ({ ...prev, [key]: 0 }))}
            />
          ))}
          {allRated && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-1">
              <span className="text-xs font-semibold text-foreground">Média Geral</span>
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-primary text-primary" />
                <span className="text-sm font-bold text-primary">{averageRating}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-text" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Seu depoimento
        </Label>
        <Textarea 
          id="review-text"
          placeholder="Como foi trabalhar com eles? Detalhe pontos fortes e resultados."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          className="min-h-[120px] rounded-none bg-background/50 resize-y"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-photos" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Fotos do Projeto (Opcional)
        </Label>
        <div className="border-2 border-dashed border-border/60 bg-background/30 p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-background/60 transition-colors">
          <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <ImageIcon className="size-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Clique para fazer upload</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (Max. 5MB)</p>
          </div>
          <input id="review-photos" type="file" multiple accept="image/*" className="hidden" />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting || !allRated} className="w-full gap-2 rounded-none h-12 mt-2">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {isSubmitting ? "Enviando..." : "Publicar Avaliação"}
      </Button>
    </form>
  )
}
