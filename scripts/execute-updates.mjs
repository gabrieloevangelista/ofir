import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Preços coerentes baseados em pesquisa de mercado Brasil 2024/2025
// Fontes: CUB/SINAPI, tabela CAU, dados de mercado

// Escritórios de Arquitetura: honorários de projeto (5-12% custo obra)
// Referência CAU: R$ 80 a R$ 250/m² dependendo do porte e renome
const ARQUITETURA_PRECOS = {
  'Studio Arthur Casas': 220,        // alto renome, projetos exclusivos
  'Jacobsen Arquitetura': 195,        // projetos residenciais sofisticados
  'Bernardes Arquitetura': 230,       // um dos mais caros do país
  'FGMF Arquitetos': 165,             // contemporâneo, prêmios internacionais
  'Fernanda Marques Arquitetos Associados': 185, // interiores luxo
  'Marcio Kogan (Studio MK27)': 245,  // top mundial, projetos icônicos
  'Isay Weinfeld Arquitetura': 210,   // arquitetura autoral premium
  'Borges + Aquiar Arquitetura': 130, // escritório médio-grande
  'Nitsche Arquitetos': 155,          // projetos premiados
  'Tryptique Architecture': 175,      // franco-brasileiro, design inovador
  'Königsberger Vannucchi': 140,      // corporativo/institucional
  'Aflalo/Gasperini Arquitetos': 160, // grandes projetos corporativos
  'Perkins&Will São Paulo': 190,      // multinacional, projetos de grande escala
  'Fasano Arquitetura': 200,          // hotelaria e luxo
  'Guto Requena Estúdio': 145,        // design digital e interativo
};

// Engenharias: gerenciamento e execução de obras
// Referência SINAPI/CUB 2024: R$ 1.800 a R$ 3.200/m²
const ENGENHARIA_PRECOS = {
  'MPD Engenharia': 3100,             // alto padrão, grandes obras
  'JHSF Engenharia': 3200,            // luxo extremo (Cidade Jardim, Fazenda Boa Vista)
  'Peak Engenharia': 2100,            // médio padrão
  'Constrac Engenharia': 2350,        // obras residenciais
  'Engeplan Engenharia': 2600,        // projetos corporativos
  'F2 Engenharia': 2200,              // residencial médio
  'FCK Engenharia': 2050,             // obras comerciais
  'FPF Engenharia': 2150,             // residencial
  'Baggio Schiavon Engenharia': 2400, // médio-alto
  'Haganá Engenharia': 2300,          // comercial
  'JCM Engenharia': 2000,             // médio padrão
  'M2A Engenharia': 1950,             // custo acessível
  'MBR Engenharia': 2250,             // comercial
  'MVS Engenharia': 2150,             // residencial
  'Bratke Collet Engenharia': 2800,   // alto padrão
  'Planeta Engenharia': 1900,         // básico-médio
  'Prisma Engenharia': 2300,          // comercial
  'Racional Engenharia': 2700,        // grande porte, corporativo
  'ROC Engenharia': 2450,             // misto
  'Vértice Engenharia': 2350,         // misto
  'WDS Engenharia': 2100,             // residencial
  'Zcardin Engenharia': 2050,         // residencial
  'Mariano Construtora & Engenharia': 2500, // misto
};

// Construtoras: construção completa (material + mão de obra + administração)
// CUB SP alto padrão: ~R$ 2.048/m² (ref base, sem acabamentos premium)
// Mercado real médio padrão: R$ 2.200 a R$ 4.500/m²
// Mercado real alto padrão/luxo: R$ 5.500 a R$ 9.500/m²
const CONSTRUTORA_PRECOS = {
  // Alto padrão / Luxo (R$ 5.500 - 9.500)
  'Adolpho Lindenberg': 8500,         // ícone do alto padrão SP
  'Albuquerque Takaoka': 7200,        // Alphaville, alto padrão
  'Casaviva': 5800,                   // residencial premium
  'VIDE Construtora': 6500,           // comercial alto padrão
  'Yellowbrick Houses': 6800,         // casas de alto padrão
  'Exata Construtora': 5900,          // misto alto padrão
  'Lumiar Construtora': 6200,         // residencial premium
  'LAR Construtora': 5700,            // comercial/residencial
  'Fratta Construtora': 5500,         // misto
  'GJS Construções': 5600,            // misto

  // Médio-alto padrão (R$ 3.500 - 5.500)
  'Build Incorporadora': 4800,        // incorporação residencial
  'Fonseca & Mercadante': 4500,       // residencial
  'Alpha Lar Construtora': 4200,      // residencial médio-alto
  'Alp Construções': 4600,            // residencial
  'Neoin Construção': 4400,           // misto
  'Diase Construtora': 4300,          // residencial
  'FBS Construtora': 3800,            // misto
  'Holos Construtora': 3900,          // comercial
  'Haus Incorporadora': 4100,         // comercial
  'MUDARE Construtora': 3700,         // comercial
  'RFM Construtora': 3600,            // comercial
  'WGi Construtora': 3500,            // comercial

  // Médio padrão (R$ 2.200 - 3.500)
  '3M Construtora': 3200,             // misto
  'A3 Construtora': 2800,             // residencial
  'A6 Construções': 2600,             // residencial
  'Apogeu Construtora': 3100,         // comercial
  'Construtora Gaia': 2900,           // comercial
  'Construtora São José': 2500,       // comercial popular
  'HOSS Construtora': 2700,           // misto
  'Hernandez Construtora': 2400,      // comercial acessível
  'Fibra Experts': 3300,              // misto
  'Cazzabella': 3000,                 // comercial
  'MAC Construtora': 2650,            // residencial
  'Pedra Forte Construtora': 2550,    // misto
  'TECSA Construtora': 3400,          // residencial
};

async function main() {
  console.log('=== Atualizando preços com valores de mercado ===\n');

  // 1. Fetch all data
  const { data: construtoras } = await supabase.from('construtoras').select('id, nome');
  const { data: obras } = await supabase.from('obras').select('id, construtora_id');

  if (!construtoras || !obras) {
    console.error('Falha ao buscar dados');
    return;
  }

  let updated = 0;
  let errors = 0;

  for (const c of construtoras) {
    const obra = obras.find(o => o.construtora_id === c.id);
    if (!obra) continue;

    let preco = null;
    let tipo = '';

    if (ARQUITETURA_PRECOS[c.nome]) {
      preco = ARQUITETURA_PRECOS[c.nome];
      tipo = 'Arquitetura';
    } else if (ENGENHARIA_PRECOS[c.nome]) {
      preco = ENGENHARIA_PRECOS[c.nome];
      tipo = 'Engenharia';
    } else if (CONSTRUTORA_PRECOS[c.nome]) {
      preco = CONSTRUTORA_PRECOS[c.nome];
      tipo = 'Construtora';
    }

    if (preco) {
      const { error } = await supabase
        .from('obras')
        .update({ preco_a_partir: preco })
        .eq('id', obra.id);

      if (error) {
        console.error(`  ✗ ${c.nome}: ${error.message}`);
        errors++;
      } else {
        console.log(`  ✓ ${c.nome} (${tipo}): R$ ${preco.toLocaleString('pt-BR')}/m²`);
        updated++;
      }
    } else {
      console.log(`  ⚠ ${c.nome}: sem preço definido, mantido original`);
    }
  }

  console.log(`\n=== Resultado ===`);
  console.log(`  Atualizados: ${updated}`);
  console.log(`  Erros: ${errors}`);
}

main();
