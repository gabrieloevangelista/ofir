import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const REAL_CONTRACTORS = [
    "MPD Engenharia", "MUDARE Construtora", "Peak Engenharia", "TECSA Construtora", "WGi Construtora", "Mariano Construtora & Engenharia", "Diase Construtora", "Cazzabella", "Yellowbrick Houses", "Build Incorporadora", "VIDE Construtora", "Neoin Construção", "Zcardin Engenharia", "Haus Incorporadora", "M2A Engenharia", "MVS Engenharia", "RFM Construtora", "Baggio Schiavon Engenharia", "Constrac Engenharia", "Construtora São José", "Adolpho Lindenberg", "Albuquerque Takaoka", "JHSF Engenharia", "ROC Engenharia", "Racional Engenharia", "Planeta Engenharia", "FBS Construtora", "Casaviva", "Construtora Gaia", "HOSS Construtora", "Lumiar Construtora", "Hernandez Construtora", "Fratta Construtora", "A3 Construtora", "Holos Construtora", "Pedra Forte Construtora", "Fonseca & Mercadante", "Apogeu Construtora", "Exata Construtora", "MAC Construtora", "LAR Construtora", "Fibra Experts", "Bratke Collet Engenharia", "Engeplan Engenharia", "Alpha Lar Construtora", "Alp Construções", "Prisma Engenharia", "Vértice Engenharia", "FPF Engenharia", "Haganá Engenharia", "JCM Engenharia", "F2 Engenharia", "MBR Engenharia", "GJS Construções", "WDS Engenharia", "FCK Engenharia", "3M Construtora", "A6 Construções"
];

const CIDADES = ["São Paulo", "Alphaville", "Barueri", "Curitiba", "Campinas", "Osasco", "Santana de Parnaíba"];
const CATEGORIES = ["residencial", "comercial", "misto"];
const STATUSES = ["lancamento", "em_obras", "pronto"];

let sql = `-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar Enums
DO $$ BEGIN
    CREATE TYPE obra_categoria AS ENUM ('residencial', 'comercial', 'misto');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE obra_status AS ENUM ('lancamento', 'em_obras', 'pronto');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Criar Tabelas
CREATE TABLE IF NOT EXISTS construtoras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS obras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    construtora_id UUID REFERENCES construtoras(id) NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    nome TEXT NOT NULL,
    descricao_curta TEXT NOT NULL,
    descricao_longa TEXT,
    categoria obra_categoria NOT NULL DEFAULT 'residencial',
    status obra_status NOT NULL DEFAULT 'em_obras',
    preco_a_partir NUMERIC,
    unidades_disponiveis INTEGER,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    bairro TEXT,
    cover_image_url TEXT,
    gallery_urls TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    obra_id UUID REFERENCES obras(id) NOT NULL,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    mensagem TEXT,
    origem TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Limpar dados (opcional, para testes idempotentes)
TRUNCATE TABLE leads CASCADE;
TRUNCATE TABLE obras CASCADE;
TRUNCATE TABLE construtoras CASCADE;

`;

let construtorasValues = [];
let obrasValues = [];

for (let i = 0; i < REAL_CONTRACTORS.length; i++) {
    const nome = REAL_CONTRACTORS[i];
    const construtoraId = randomUUID();
    
    construtorasValues.push("('" + construtoraId + "', '" + nome.replace(/'/g, "''") + "')");

    const obraId = randomUUID();
    const slug = "obra-" + i + "-" + Date.now();
    const obraNome = "Projeto Especial " + nome.replace(/'/g, "''");
    const desc = "Execução de alto padrão por " + nome.replace(/'/g, "''") + ".";
    const cat = CATEGORIES[i % CATEGORIES.length];
    const status = STATUSES[i % STATUSES.length];
    const preco = 1000 + (i * 100) % 5000;
    const cid = CIDADES[i % CIDADES.length];
    const est = cid === "Curitiba" ? "PR" : "SP";

    obrasValues.push("('" + obraId + "', '" + construtoraId + "', '" + slug + "', '" + obraNome + "', '" + desc + "', '" + cat + "', '" + status + "', " + preco + ", '" + cid + "', '" + est + "')");
}

sql += "INSERT INTO construtoras (id, nome) VALUES \n" + construtorasValues.join(',\n') + ';\n\n';

sql += "INSERT INTO obras (id, construtora_id, slug, nome, descricao_curta, categoria, status, preco_a_partir, cidade, estado) VALUES \n" + obrasValues.join(',\n') + ';\n';

const outputPath = path.join(process.cwd(), 'supabase-setup.sql');
fs.writeFileSync(outputPath, sql);
console.log('Script SQL gerado: ' + outputPath);
