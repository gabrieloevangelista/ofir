import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function main() {
  const { data: construtoras, error: constrErro } = await supabase.from('construtoras').select('id, nome');
  const { data: obras, error: obrasErro } = await supabase.from('obras').select('id, construtora_id');

  if (constrErro || obrasErro) {
    console.error(constrErro || obrasErro);
    return;
  }

  let sql = '-- Update existing records\n';

  // 1. Update existing companies
  for (const construtora of construtoras) {
    const isEngenharia = construtora.nome.toLowerCase().includes('engenharia');
    
    // Engenharia: 2500 - 4500
    // Construtora Media/Alta: 3500 - 8500
    let minPrice = isEngenharia ? 2500 : 3500;
    let maxPrice = isEngenharia ? 4500 : 8500;
    
    // Explicit high-end overrides
    if (['MPD Engenharia', 'JHSF Engenharia', 'Adolpho Lindenberg'].includes(construtora.nome)) {
      minPrice = 7000;
      maxPrice = 10000;
    }

    const preco_a_partir = Math.floor(Math.random() * (maxPrice - minPrice + 1) + minPrice);
    
    // Find the corresponding obra for this construtora
    const obra = obras.find(o => o.construtora_id === construtora.id);
    if (obra) {
      sql += `UPDATE obras SET preco_a_partir = ${preco_a_partir} WHERE id = '${obra.id}';\n`;
    }
  }

  // 2. Insert Architecture firms
  sql += '\n-- Insert Architecture Firms\n';
  const architects = [
    "Studio Arthur Casas", "Jacobsen Arquitetura", "Bernardes Arquitetura",
    "FGMF Arquitetos", "Fernanda Marques Arquitetos Associados",
    "Marcio Kogan (Studio MK27)", "Isay Weinfeld Arquitetura",
    "Borges + Aquiar Arquitetura", "Nitsche Arquitetos",
    "Tryptique Architecture", "Königsberger Vannucchi",
    "Aflalo/Gasperini Arquitetos", "Perkins&Will São Paulo",
    "Fasano Arquitetura", "Guto Requena Estúdio"
  ];

  const cidades = [
    "São Paulo/SP", "Barueri/SP", "Campinas/SP", "Rio de Janeiro/RJ", 
    "Belo Horizonte/MG", "Curitiba/PR", "Florianópolis/SC"
  ];

  for (let i = 0; i < architects.length; i++) {
    const nome = architects[i];
    const uuid = crypto.randomUUID();
    const logoUrl = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230f172a'/><path d='M25 75V25L50 45L75 25V75' stroke='%2338bdf8' stroke-width='7' fill='none'/></svg>";
    
    sql += `INSERT INTO construtoras (id, nome, logo_url) VALUES ('${uuid}', '${nome}', '${logoUrl}');\n`;

    // Generate obra for the architect
    const obraUuid = crypto.randomUUID();
    const slug = `arquitetura-${i}-${Date.now()}`;
    const descCurta = `Projeto arquitetônico e design de interiores de alto padrão por ${nome}.`;
    const preco = Math.floor(Math.random() * (500 - 150 + 1) + 150); // 150 to 500 / m2
    const cidade = cidades[i % cidades.length];
    
    sql += `INSERT INTO obras (id, construtora_id, slug, nome, descricao_curta, categoria, status, preco_a_partir, cidade, estado) VALUES ('${obraUuid}', '${uuid}', '${slug}', 'Projeto Exclusivo', '${descCurta}', 'residencial', 'em_obras', ${preco}, '${cidade}', '${cidade.slice(-2)}');\n`;
  }

  fs.writeFileSync('scripts/update-prices.sql', sql);
  console.log('Generated scripts/update-prices.sql');
}

main();
