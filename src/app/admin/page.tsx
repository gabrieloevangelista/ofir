import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, HardHat, TrendingUp, Download, ExternalLink } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = createClient()

  // Fetch leads with related obra and construtora
  const { data: leads, error } = await supabase
    .from("leads")
    .select(`
      id,
      nome,
      email,
      telefone,
      mensagem,
      origem,
      projeto_url,
      created_at,
      obras (
        id,
        nome,
        cidade,
        estado,
        construtoras (
          id,
          nome
        )
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching leads for admin panel:", error)
  }

  const leadsList = leads || []

  // Calculate metrics
  const totalLeads = leadsList.length
  
  const altoPadraoCount = leadsList.filter(l => 
    l.mensagem?.includes("Padrão Pretendido: Alto Padrão")
  ).length

  const medioPadraoCount = leadsList.filter(l => 
    l.mensagem?.includes("Padrão Pretendido: Médio Padrão")
  ).length

  const baixoPadraoCount = leadsList.filter(l => 
    l.mensagem?.includes("Padrão Pretendido: Baixo Padrão")
  ).length

  const comProjetoCount = leadsList.filter(l => !!l.projeto_url).length

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Painel do Construtor
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie propostas, analise perfis de clientes e visualize projetos anexados.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold rounded-none bg-primary/10 text-primary border border-primary/20">
            OFIR Admin Console v1.0
          </Badge>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-none border-border bg-card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total de Solicitações
            </CardTitle>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{totalLeads}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Leads integrados via Web & WhatsApp</p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border bg-card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Alto Padrão / Luxo
            </CardTitle>
            <TrendingUp className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-emerald-600">{altoPadraoCount}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Acabamentos premium e design</p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border bg-card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Médio & Baixo Padrão
            </CardTitle>
            <HardHat className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{medioPadraoCount + baixoPadraoCount}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Construções convencionais e reformas</p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border bg-card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Projetos Anexados
            </CardTitle>
            <FileText className="size-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-sky-600">{comProjetoCount}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Arquivos PDF/Plantas enviados</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content: Leads List */}
      <Card className="rounded-none border-border bg-card shadow-none overflow-hidden">
        <CardHeader className="border-b border-border bg-secondary/10 px-6 py-4">
          <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Solicitações Recebidas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {leadsList.length === 0 ? (
            <div className="text-center py-16 px-4">
              <FileText className="size-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-medium italic">Nenhuma solicitação recebida no momento.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/5 font-semibold text-muted-foreground uppercase tracking-wider">
                    <th className="px-6 py-3.5">Data</th>
                    <th className="px-6 py-3.5">Solicitante</th>
                    <th className="px-6 py-3.5">Fornecedor Alvo</th>
                    <th className="px-6 py-3.5">Especificações do Serviço</th>
                    <th className="px-6 py-3.5 text-right">Projeto Anexado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leadsList.map((lead) => {
                    const dataFormatada = new Date(lead.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })

                    // Parse service and standard from combined message
                    const linhas = lead.mensagem?.split("\n") || []
                    const servicoText = linhas.find(l => l.startsWith("Serviço Solicitado:"))?.replace("Serviço Solicitado: ", "") || "Mão de Obra"
                    const padraoText = linhas.find(l => l.startsWith("Padrão Pretendido:"))?.replace("Padrão Pretendido: ", "") || "Não especificado"
                    const detalhamento = linhas.slice(3).join("\n").replace("Detalhamento: ", "").trim()

                    const obraInfo = lead.obras as { nome: string; construtoras: { nome: string } | null } | null
                    const construtoraNome = obraInfo?.construtoras?.nome || "Geral"

                    return (
                      <tr key={lead.id} className="hover:bg-secondary/10 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground font-medium">
                          {dataFormatada}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-foreground">{lead.nome}</div>
                          <div className="text-muted-foreground mt-0.5">{lead.email}</div>
                          {lead.telefone && (
                            <div className="text-muted-foreground font-medium mt-0.5">{lead.telefone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-foreground">{construtoraNome}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{obraInfo?.nome || "Geral"}</div>
                        </td>
                        <td className="px-6 py-4 max-w-sm">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Badge variant="outline" className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-none bg-primary/5 text-primary border-primary/20">
                              {servicoText}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-none ${
                                padraoText.includes("Alto") 
                                  ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20"
                                  : padraoText.includes("Médio")
                                    ? "bg-amber-500/5 text-amber-600 border-amber-500/20"
                                    : "bg-blue-500/5 text-blue-600 border-blue-500/20"
                              }`}
                            >
                              {padraoText}
                            </Badge>
                          </div>
                          {detalhamento && (
                            <p className="text-muted-foreground mt-2 leading-relaxed italic line-clamp-2">
                              &quot;{detalhamento}&quot;
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          {lead.projeto_url ? (
                            <a
                              href={lead.projeto_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-500 uppercase tracking-wider hover:underline"
                            >
                              <Download className="size-3" />
                              Projeto Anexo
                              <ExternalLink className="size-2.5" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-semibold">Sem anexo</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
