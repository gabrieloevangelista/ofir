"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, MessageCircle, Mail, MapPin, CheckCircle2, Send, Building2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ObraWithConstrutora } from "@/types/obra"

interface ContactDialogProps {
  obra: ObraWithConstrutora
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactDialog({ obra, open, onOpenChange }: ContactDialogProps) {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [mensagem, setMensagem] = useState(
    `Olá! Gostaria de mais informações e de um orçamento prévio para uma obra com a ${obra.construtoras?.nome || obra.nome}.`
  )
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const empresaNome = obra.construtoras?.nome || obra.nome
  const contato = obra.contato || {
    whatsapp: "5511998765432",
    telefone: "(11) 4000-1234",
    email: "atendimento@ofirobras.com.br",
    responsavel: "Engenheiro Responsável",
    cidadeAtendimento: `${obra.cidade} e região`,
  }

  const cleanWhatsAppNumber = contato.whatsapp.replace(/\D/g, "")
  const whatsAppText = encodeURIComponent(
    `Olá! Encontrei a empresa *${empresaNome}* através da plataforma OFIR e gostaria de solicitar um orçamento para minha obra em ${obra.cidade}.`
  )
  const whatsAppLink = `https://wa.me/${cleanWhatsAppNumber}?text=${whatsAppText}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    // Simulate instant lead dispatch
    setTimeout(() => {
      setEnviando(false)
      setEnviado(true)
    }, 600)
  }

  const handleClose = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => setEnviado(false), 300)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border-border">
        {/* Header with supplier branding */}
        <div className="bg-secondary/40 border-b border-border/80 p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative size-12 rounded-xl border border-border bg-card overflow-hidden shrink-0 shadow-xs">
              {obra.construtoras?.logo_url ? (
                <Image
                  src={obra.construtoras.logo_url}
                  alt={empresaNome}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-primary">
                  <Building2 className="size-6" />
                </div>
              )}
            </div>
            <div>
              <DialogTitle className="font-heading text-lg font-bold text-foreground">
                {empresaNome}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                <MapPin className="size-3 text-primary shrink-0" />
                <span>{contato.cidadeAtendimento || `${obra.cidade}, ${obra.estado}`}</span>
                {contato.responsavel && (
                  <>
                    <span>•</span>
                    <span>{contato.responsavel}</span>
                  </>
                )}
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-5 pt-3 space-y-4">
          {/* Quick Direct WhatsApp CTA */}
          <div className="p-3.5 rounded-xl border border-emerald-600/30 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0 shadow-xs">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                  Atendimento Instantâneo via WhatsApp
                </p>
                <p className="text-xs text-emerald-700/90 dark:text-emerald-400">
                  Resposta média em até 15 minutos em horário comercial
                </p>
              </div>
            </div>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors shadow-xs shrink-0"
            >
              <span>Abrir WhatsApp</span>
            </a>
          </div>

          {/* Quick Phone or Message Form */}
          {enviado ? (
            <div className="py-6 text-center space-y-2 rounded-xl bg-card border border-border/80 p-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                <CheckCircle2 className="size-6" />
              </div>
              <h4 className="font-heading text-base font-bold text-foreground">
                Solicitação Enviada com Sucesso!
              </h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                A equipe comercial da <strong>{empresaNome}</strong> recebeu seus dados e entrará em contato muito em breve.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleClose(false)}
                className="mt-3 text-xs rounded-lg"
              >
                Concluir
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Ou solicite contato pela plataforma
                </span>
                <a
                  href={`tel:${contato.telefone.replace(/\D/g, "")}`}
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  <Phone className="size-3" />
                  {contato.telefone}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Seu Nome</label>
                  <Input
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Roberto Silva"
                    className="h-9 text-sm rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Seu Telefone / WhatsApp</label>
                  <Input
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="h-9 text-sm rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Detalhes da Obra / Mensagem</label>
                <Textarea
                  rows={3}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="text-sm rounded-lg resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Mail className="size-3 text-primary" />
                  <span>Cópia enviada para {contato.email}</span>
                </div>

                <Button
                  type="submit"
                  disabled={enviando}
                  className="gap-2 rounded-lg text-xs font-semibold px-4 h-9 shadow-xs"
                >
                  <Send className="size-3.5" />
                  {enviando ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
