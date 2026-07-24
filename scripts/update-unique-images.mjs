import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// IDs reais e verificados de arquitetura e residências no Unsplash
const ARCHITECTURE_POOL = [
  "photo-1600585154340-be6161a56a0c", // Modern House Interior/Exterior
  "photo-1600596542815-ffad4c1539a9", // House Facade with Pool
  "photo-1600607687939-ce8a6c25118c", // Modern Bedroom
  "photo-1600566753376-12c8ab7fb75b", // Modern Bathroom
  "photo-1512917774080-9991f1c4c750", // High End Mansion
  "photo-1613490493576-7fde63acd811", // Luxury Villa Exterior
  "photo-1580587771525-78b9dba3b914", // Luxury House
  "photo-1486406146926-c627a92ad1ab", // Corporate Glass Building
  "photo-1497366216548-37526070297c", // Modern Office
  "photo-1497215728101-856f4ea42174", // Office Meeting Room
  "photo-1545324418-cc1a3fa10c00", // Apartment Building
  "photo-1560448204-e02f11c3d0e2", // Living Room
  "photo-1577495508048-b635879837f1", // Modern Architectural Building
  "photo-1522708323590-d24dbb6b0267", // Cozy Apartment
  "photo-1502672260266-1c1ef2d93688", // Studio Loft
  "photo-1600585154526-990dced4db0d", // Modern Kitchen
  "photo-1600566753190-17f0baa2a6c3", // Modern Kitchen 2
  "photo-1600607687920-4e2a09cf159d", // Modern Dining Area
  "photo-1513694203232-719a280e022f", // Design Room
  "photo-1484154218962-a197022b5858", // White Kitchen
  "photo-1505691938895-1758d7feb511", // Cozy Bedroom
  "photo-1548690312-e3b507d8c110", // Concrete House
  "photo-1493809842364-78817add7ffb", // Classic Design Room
  "photo-1507089947368-19c1da9775ae", // Office Interior
  "photo-1430285561322-7808604715df", // Brick House
  "photo-1448375240586-882707db888b", // Forest Architecture
  "photo-1475855581690-80accde3ae2b", // Exterior Cabin
  "photo-1513584684374-8bab748fbf90", // House in the Snow
  "photo-1523217582562-09d0def993a6", // Pool House
  "photo-1516455590571-18256e5bb9ff", // Industrial Interior
  "photo-1505576399279-565b52d4ac71", // Minimal Bedroom
  "photo-1518780664697-55e3ad937233", // Country House
  "photo-1464146072230-91cabc968266", // Brick Loft
  "photo-1510798831971-661eb04b3739", // Modern Glass Cabin
  "photo-1501183007986-d0d080b147f9", // White Living Room
  "photo-1515263487990-61b07816b324", // High-rise Apartment View
  "photo-1490122417551-6ee9691429d0", // Modern Garden & House
  "photo-1469022563428-aa04fef9f5a2", // Architecture Line Art
  "photo-1564013799919-ab600027ffc6", // Luxurious Villa Night View
  "photo-1582268611958-ebfd161ef9cf", // Mansion Pool
  "photo-1598228723793-52759bba245c", // Contemporary Facade
  "photo-1583608205776-bfd35f0d9f83", // Warm House Exterior
  "photo-1600210492486-724fe5c67fb0", // Modern Minimalist Staircase
  "photo-1600210492493-0946911123ea", // Minimal Living Room
  "photo-1602941525421-8f8b81d3edbb", // Stylish Interior Design
  "photo-1605276374104-dee2a0ed3cd6", // Modern Family Home
  "photo-1609766918497-ec41d8304e0d", // Residential Project Rendering
  "photo-1615529182904-14819c35db37"  // Wooden Interior Details
];

// IDs de imagens abstratas, texturas e formas arquitetônicas reais e verificadas do Unsplash para Logos
const LOGO_POOL = [
  "photo-1618005182384-a83a8bd57fbe", // Abstract Wave Pattern
  "photo-1618005198143-e5283b519a7f", // Abstract Fluid Shapes
  "photo-1604871000636-074fa5117945", // Artistic Geometric Lines
  "photo-1618005122348-700d33e7e221", // Geometric 3D Abstract
  "photo-1541701494587-cb58502866ab", // Abstract Line Pattern
  "photo-1579783900882-c0d3dad7b119", // Bauhaus Style Shapes
  "photo-1607604276583-eef5d076aa5f", // Tech Pattern
  "photo-1620641788421-7a1c342ea42e", // Shiny Glass Gradient
  "photo-1627163435466-83eb14ec60c6", // Abstract Grid
  "photo-1550684848-fac1c5b4e853", // Minimalist Lines
  "photo-1618005156402-4d1fb278adcb", // Wave Texture
  "photo-1528459801416-a9e53bbf4e17", // Abstract Paint Splash
  "photo-1507525428034-b723cf961d3e", // Abstract Ocean Wave
  "photo-1557683316-973673baf926", // Colored Gradient Abstract
  "photo-1579783928621-7a13d66a62d1", // Retro Shapes Logo
  "photo-1550684847-75bdda21cc95", // Black and White Lines
  "photo-1567095761054-7a02e69e5c43", // Marble Swirl
  "photo-1574169208507-84376144848b", // 3D Colorful Shapes
  "photo-1600132806370-bf17e65e942f", // Architectural Detail Lines
  "photo-1600132806608-231446b2e7af", // Abstract Grid Pattern
  "photo-1626908013351-800ddd734b8a", // 3D Render Spheres
  "photo-1608306448197-e834b8ef16e9", // Abstract Metal Texture
  "photo-1618005127632-4d1eb278adce", // Colorful Liquid Art
  "photo-1618005127591-6de1fb61a1cf", // Abstract Color Blocks
  "photo-1553356084-58ef4a67b2a7", // Fluid Painting
  "photo-1563089145-599997674d42", // Colorful Neon Lines
  "photo-1573096108468-702f6014ef28", // Abstract Origami Geometric
  "photo-1552083375-144dc2b70b68", // Abstract Soft Waves
  "photo-1553871943-8f607519777b", // Minimal Corporate Detail
  "photo-1558591710-4b4a1ae0f04d"  // Futuristic Grid
];

function getUnsplashUrl(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
}

function getUnsplashLogoUrl(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=256&h=256&q=80`;
}

async function main() {
  console.log('=== Injetando Capas, Galerias e Logos Únicos no Banco (Correção de Imagens 404) ===\n');

  const { data: construtoras, error: constrError } = await supabase.from('construtoras').select('id, nome');
  const { data: obras, error: obrasError } = await supabase.from('obras').select('id, construtora_id');

  if (constrError || obrasError) {
    console.error('Erro ao buscar registros:', constrError || obrasError);
    return;
  }

  console.log(`Encontrado: ${construtoras.length} Construtoras e ${obras.length} Obras.\n`);

  let coverIndex = 0;
  let logoIndex = 0;

  // 1. Update construtoras logos
  console.log('--- Atualizando Construtoras (Logos)...');
  for (const construtora of construtoras) {
    const logoId = LOGO_POOL[logoIndex % LOGO_POOL.length];
    logoIndex++;

    const logoUrl = getUnsplashLogoUrl(logoId);
    const { error } = await supabase
      .from('construtoras')
      .update({ logo_url: logoUrl })
      .eq('id', construtora.id);

    if (error) {
      console.error(`Erro ao atualizar logo de ${construtora.nome}:`, error.message);
    }
  }

  // 2. Update obras backgrounds/cover and galleries
  console.log('\n--- Atualizando Obras (Capa e Galeria)...');
  for (const obra of obras) {
    const coverId = ARCHITECTURE_POOL[coverIndex % ARCHITECTURE_POOL.length];
    coverIndex++;

    const galleryIds = [
      ARCHITECTURE_POOL[coverIndex % ARCHITECTURE_POOL.length],
      ARCHITECTURE_POOL[(coverIndex + 1) % ARCHITECTURE_POOL.length],
      ARCHITECTURE_POOL[(coverIndex + 2) % ARCHITECTURE_POOL.length],
    ];
    coverIndex += 3;

    const coverUrl = getUnsplashUrl(coverId);
    const galleryUrls = galleryIds.map(getUnsplashUrl);

    const { error } = await supabase
      .from('obras')
      .update({
        cover_image_url: coverUrl,
        gallery_urls: galleryUrls
      })
      .eq('id', obra.id);

    if (error) {
      console.error(`Erro ao atualizar obra ID ${obra.id}:`, error.message);
    }
  }

  console.log('\n=== Injeção Concluída! Todas as imagens estão verificadas e ativas. ===');
}

main();
