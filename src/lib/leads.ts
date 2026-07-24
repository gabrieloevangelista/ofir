"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const leadSchema = z.object({
  obraId: z.uuid(),
  nome: z.string().trim().min(2, "Informe seu nome completo"),
  email: z.email("Informe um e-mail válido").trim(),
  telefone: z.string().trim().optional(),
  mensagem: z.string().trim().optional(),
})

export type LeadFormState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<"nome" | "email" | "telefone" | "mensagem", string>>
}

export async function createLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const rawMensagem = (formData.get("mensagem") as string) || ""
  const servico = (formData.get("servico") as string) || "Construção Integral"
  const padrao = (formData.get("padrao") as string) || "Médio Padrão"
  
  const mensagemCombinada = `Serviço Solicitado: ${servico}\nPadrão Pretendido: ${padrao}\n\nDetalhamento: ${rawMensagem}`

  const parsed = leadSchema.safeParse({
    obraId: formData.get("obraId"),
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    mensagem: mensagemCombinada,
  })

  if (!parsed.success) {
    const fieldErrors: LeadFormState["fieldErrors"] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === "string") {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message
      }
    }
    return {
      status: "error",
      message: "Verifique os campos destacados e tente novamente.",
      fieldErrors,
    }
  }

  const supabase = createClient()
  const { obraId, nome, email, telefone, mensagem } = parsed.data

  const file = formData.get("projetos") as File | null
  let projetoUrl: string | null = null
  if (file && file.name && file.size > 0) {
    projetoUrl = `/uploads/projects/${file.name}`
  }

  const { error } = await supabase.from("leads").insert({
    obra_id: obraId,
    nome,
    email,
    telefone: telefone || null,
    mensagem: mensagem || null,
    origem: "orcamento_mao_de_obra",
    projeto_url: projetoUrl,
  })

  if (error) {
    return {
      status: "error",
      message: "Não foi possível enviar sua solicitação agora. Tente novamente em instantes.",
    }
  }

  return {
    status: "success",
    message: "Solicitação recebida! O profissional responsável entrará em contato para apresentar o orçamento.",
  }
}
