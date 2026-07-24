import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, LayoutGrid, MapPin, Star } from "lucide-react"
import { getObraBySlug } from "@/lib/obras"
import { StatusBadge } from "@/components/obras/status-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCategoriaLabel, getObraPadrao, formatPadraoLabel, formatLocalizacao, cn } from "@/lib/utils"
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

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Voltar para a busca
      </Link>

      {galeria.length > 0 ? (
        <div className="mb-8 grid grid-cols-1 gap-2 overflow-hidden rounded-none h-[260px] sm:h-[340px] sm:grid-cols-4 sm:grid-rows-2">
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
              <Badge variant="outline" className="rounded-none">{formatCategoriaLabel(obra.categoria)}</Badge>
              <span
                className={cn(
                  "inline-flex items-center rounded-none border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-none",
                  padrao === "alto" && "bg-amber-500/10 text-amber-700 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-900/50",
                  padrao === "medio" && "bg-slate-500/10 text-slate-700 border-slate-300 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-800",
                  padrao === "baixo" && "bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-900/50"
                )}
              >
                {formatPadraoLabel(padrao)}
              </span>
            </div>
            <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {obra.nome}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 className="size-4" />
                {obra.construtoras?.nome ?? "Construtora"}
                {obra.supplier_rating && (
                  <span className="ml-1 inline-flex items-center gap-1 text-primary">
                    <Star className="size-3.5 fill-primary" />
                    <span className="font-bold text-foreground">{obra.supplier_rating.score.toFixed(1)}</span>
                  </span>
                )}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
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
            <h2 className="font-heading text-xl font-medium text-foreground">
              Sobre este modelo de construção
            </h2>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">
              {obra.descricao_longa ?? obra.descricao_curta}
            </p>
          </div>

          {obra.tags.length > 0 ? (
            <div>
              <h2 className="font-heading text-xl font-medium text-foreground">
                Especialidades da Mão de Obra
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {obra.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-secondary/80 rounded-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <Separator className="mb-8" />
            <h2 className="font-heading text-xl font-medium text-foreground mb-6">
              Depoimentos de Contratantes
            </h2>
            
            {obra.reviews && obra.reviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {obra.reviews.map((review) => (
                  <Card key={review.id} className="rounded-none shadow-none border-border">
                    <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-0.5 text-primary">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`size-3.5 ${i < review.rating ? 'fill-primary' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">{review.date}</span>
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
                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{label}</span>
                                <div className="flex gap-px">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`size-2.5 ${i < value ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/20'}`} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                          &quot;{review.content}&quot;
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{review.author}</p>
                        <p className="text-[10px] text-muted-foreground">{review.role}</p>
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

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border shadow-none rounded-none">
            <CardHeader className="pb-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Valor Estimado m²</span>
              {obra.preco_a_partir ? <PricingDisplay preco_a_partir={obra.preco_a_partir} /> : null}
            </CardHeader>
            <CardContent>
              <Separator className="mb-5" />
              <h3 className="mb-4 font-heading text-lg font-medium text-foreground">
                Solicitar Contrato & Orçamento
              </h3>
              <InteresseForm obraId={obra.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
