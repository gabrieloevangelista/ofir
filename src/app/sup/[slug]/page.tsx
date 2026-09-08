import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, LayoutGrid, MapPin, Star, MessageCircle, Phone } from "lucide-react"
import { getObraBySlug } from "@/lib/obras"
import { StatusBadge } from "@/components/obras/status-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCategoriaLabel, getObraPadrao, formatPadraoLabel, formatLocalizacao } from "@/lib/utils"
import { InteresseForm } from "./interesse-form"
import { ReviewForm } from "@/components/obras/review-form"
import { PricingDisplay } from "@/components/obras/pricing-display"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const obra = await getObraBySlug(slug)

  if (!obra) {
    return { title: "Obra não encontrada" }
  }

  return {
    title: `${obra.nome} — Construtor Credenciado | Vitrine de Obras`,
    description: obra.descricao_curta,
  }
}

export default async function ObraDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const obra = await getObraBySlug(slug)

  if (!obra) {
    notFound()
  }

  const galeria = [obra.cover_image_url, ...obra.gallery_urls].filter(
    (url): url is string => Boolean(url)
  )

  const padrao = getObraPadrao(obra.preco_a_partir)
  const empresaNome = obra.construtoras?.nome || obra.nome

  const contato = obra.contato || {
    whatsapp: "5511998765432",
    telefone: "(11) 4000-1234",
    email: "contato@ofirobras.com.br",
    responsavel: "Engenheiro Responsável",
    cidadeAtendimento: `${obra.cidade} e região`,
  }

  const cleanWhatsApp = contato.whatsapp.replace(/\D/g, "")
  const whatsAppHref = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Olá! Vi o perfil da ${empresaNome} na plataforma OFIR e gostaria de solicitar um orçamento para minha obra em ${obra.cidade}.`
  )}`

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Voltar para a busca
      </Link>

      {galeria.length > 0 ? (
        <div className="mb-8 grid grid-cols-1 gap-2 overflow-hidden rounded-2xl h-[260px] sm:h-[360px] sm:grid-cols-4 sm:grid-rows-2 shadow-xs border border-border">
          <div className="relative h-full w-full overflow-hidden sm:col-span-2 sm:row-span-2">
            <Image
              src={galeria[0]}
              alt={obra.nome}
              fill
              priority
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {galeria.slice(1, 3).map((url, i) => (
            <div key={url} className="relative h-full w-full overflow-hidden hidden sm:block sm:col-span-2">
              <Image
                src={url}
                alt={`${obra.nome} - foto ${i + 2}`}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={obra.status} />
              <Badge variant="outline" className="rounded-md text-xs font-medium px-2.5 py-1">
                {formatCategoriaLabel(obra.categoria)}
              </Badge>
              <span className="inline-flex items-center rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-foreground shadow-xs">
                {formatPadraoLabel(padrao)}
              </span>
            </div>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {obra.nome}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 className="size-4" />
                {empresaNome}
                {obra.supplier_rating && (
                  <span className="ml-1 inline-flex items-center gap-1 font-semibold text-foreground">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    <span>{obra.supplier_rating.score.toFixed(1)}</span>
                  </span>
                )}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                {obra.bairro ? `${obra.bairro}, ` : ""}
                {formatLocalizacao(obra.cidade, obra.estado)}
              </span>
              {obra.unidades_disponiveis ? (
                <span className="flex items-center gap-1.5">
                  <LayoutGrid className="size-4" />
                  {obra.unidades_disponiveis} projetos entregues
                </span>
              ) : null}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Sobre este modelo de construção
            </h2>
            <p className="mt-3 text-base leading-relaxed whitespace-pre-line text-muted-foreground">
              {obra.descricao_longa ?? obra.descricao_curta}
            </p>
          </div>

          {obra.tags.length > 0 ? (
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Especialidades da Mão de Obra
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {obra.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-medium bg-secondary text-secondary-foreground rounded-md px-2.5 py-1 border border-border/40">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <Separator className="mb-8" />
            <h2 className="font-heading text-xl font-bold text-foreground mb-6">
              Depoimentos de Contratantes
            </h2>
            
            {obra.reviews && obra.reviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {obra.reviews.map((review) => (
                  <Card key={review.id} className="rounded-xl shadow-xs border-border">
                    <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`size-3.5 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>

                        {review.ratings && (
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
                            {([
                              ['Tempo de Execução', review.ratings.tempo_execucao],
                              ['Experiência', review.ratings.experiencia],
                              ['Qualidade', review.ratings.qualidade],
                              ['Preço', review.ratings.preco],
                            ] as const).map(([label, value]) => (
                              <div key={label} className="flex items-center justify-between gap-2">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
                                <div className="flex gap-px">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`size-2.5 ${i < value ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/20'}`} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="text-sm text-foreground leading-relaxed italic mt-1">
                          &quot;{review.content}&quot;
                        </p>
                      </div>
                      <div className="border-t border-border/50 pt-3">
                        <p className="text-sm font-bold text-foreground">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic mb-6">Nenhum depoimento encontrado para esta empresa.</p>
            )}

            <ReviewForm obraId={obra.id} />
          </div>
        </div>

        {/* Right Sticky Sidebar with Contact CTAs & Lead Form */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border shadow-md rounded-xl">
            <CardHeader className="pb-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Valor Estimado m²</span>
              {obra.preco_a_partir ? <PricingDisplay preco_a_partir={obra.preco_a_partir} /> : null}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Direct WhatsApp Action Button */}
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 shadow-xs transition-colors"
              >
                <MessageCircle className="size-4" />
                <span>Conversar no WhatsApp</span>
              </a>

              {contato.telefone && (
                <a
                  href={`tel:${contato.telefone.replace(/\D/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-sm py-2.5 border border-border transition-colors"
                >
                  <Phone className="size-4 text-primary" />
                  <span>Ligar: {contato.telefone}</span>
                </a>
              )}

              <Separator />

              <div>
                <h3 className="mb-4 font-heading text-lg font-bold text-foreground">
                  Solicitar Contrato & Orçamento
                </h3>
                <InteresseForm obraId={obra.id} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
