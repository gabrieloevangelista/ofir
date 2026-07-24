-- Criar extensões necessárias
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

INSERT INTO construtoras (id, nome) VALUES 
('460c7cf9-84be-4869-9fea-652bbcbe4bde', 'MPD Engenharia'),
('2bf2c3ea-69e9-4790-bf7b-591363fb7314', 'MUDARE Construtora'),
('73ce39f3-af2a-4acd-b322-275aa81094e1', 'Peak Engenharia'),
('974a53a0-d597-4322-83e3-73e3071d6038', 'TECSA Construtora'),
('20538ed7-4ac7-47da-a692-9470df3fbe6f', 'WGi Construtora'),
('5415d7ec-82c3-4690-abef-07aa43e95782', 'Mariano Construtora & Engenharia'),
('e24fd274-631b-460a-8207-a5ed6b577653', 'Diase Construtora'),
('4e96d410-6cc0-4e98-a49a-56311cfa05dc', 'Cazzabella'),
('d79ca0aa-1a58-446f-bcd5-69d46608d113', 'Yellowbrick Houses'),
('26635b7b-3451-4eef-bacf-274360e4ec8a', 'Build Incorporadora'),
('e3528242-73a0-4568-91f9-a7caace68b81', 'VIDE Construtora'),
('c35002e1-9803-4c41-b171-05e44c41a7c8', 'Neoin Construção'),
('3c45aab9-a4f5-4617-be79-5ee0722518ac', 'Zcardin Engenharia'),
('c0af5fda-b9fb-4064-bca7-6c1e6bded1ef', 'Haus Incorporadora'),
('88b53530-f709-4396-aae8-1800be132a06', 'M2A Engenharia'),
('a18bf48d-bacc-438d-87e5-59ee84f2defd', 'MVS Engenharia'),
('08261414-3c3e-42a8-a85a-73b792509ead', 'RFM Construtora'),
('fbb0bc49-75d3-4443-9d8c-174edc1cc8b2', 'Baggio Schiavon Engenharia'),
('463c16d8-71a4-401f-885c-8843313d7385', 'Constrac Engenharia'),
('891c33d1-7f9a-4db4-9231-9a94a955b807', 'Construtora São José'),
('bd8c1bcd-cdc2-45d2-aedc-5acab1b4fb13', 'Adolpho Lindenberg'),
('6df1b788-44f3-431d-ad50-2485afb89f6e', 'Albuquerque Takaoka'),
('2894647f-b98b-4fce-bf59-7d2bd7d83da1', 'JHSF Engenharia'),
('9f317b5a-7065-4bc7-8887-688551145238', 'ROC Engenharia'),
('f22b626c-d6e6-40e3-8993-b22031244466', 'Racional Engenharia'),
('5723ad0c-2884-47d3-8244-29b59284f936', 'Planeta Engenharia'),
('6e2956a6-ecb5-4175-b547-5472ce77dba1', 'FBS Construtora'),
('7c7c279c-9735-4ed3-b03d-205a7e90d6ff', 'Casaviva'),
('e6fa487a-c430-463a-b009-cd1e6c0794d5', 'Construtora Gaia'),
('94f4ebfe-6727-41f0-8a5f-c7346094d172', 'HOSS Construtora'),
('2cfec58a-da2f-47e9-a339-0cc965a3d2fb', 'Lumiar Construtora'),
('d9b2413a-11b5-498e-a0e4-94c64dd648c7', 'Hernandez Construtora'),
('761830b6-681e-4c99-b4d7-01d4e6831549', 'Fratta Construtora'),
('0c63875e-85d1-41db-8706-40a8314161a9', 'A3 Construtora'),
('b8a8c437-64df-4c5c-aa5d-11ffb832c1e7', 'Holos Construtora'),
('d75b5660-9aa0-411f-9358-5ad1e9c8b7be', 'Pedra Forte Construtora'),
('94a96b3d-9982-4345-a258-248d07eaf1c2', 'Fonseca & Mercadante'),
('6863bf13-5617-4e60-b722-bd1c3bc13ca9', 'Apogeu Construtora'),
('46ee20f5-f48c-4a4c-81fc-1754fdbeaaa7', 'Exata Construtora'),
('3c1bb3ce-cf69-4924-947e-27d7c7a716f6', 'MAC Construtora'),
('f3b876b9-275a-4516-ac79-4f2380019468', 'LAR Construtora'),
('79f79763-b863-464c-8776-56d5889b5d84', 'Fibra Experts'),
('fc4acec6-6172-483a-b9a8-1917890e03a7', 'Bratke Collet Engenharia'),
('14a38397-d93a-46da-8bef-93d8ff009c63', 'Engeplan Engenharia'),
('aadece45-ec83-4e47-a691-a5693a64fc8a', 'Alpha Lar Construtora'),
('a27028ab-6428-461c-abe4-49dc67272a2b', 'Alp Construções'),
('633bab06-36d7-410a-b07a-dbf7c70975ad', 'Prisma Engenharia'),
('256e8096-b0be-4c28-ae21-ac935e9aba64', 'Vértice Engenharia'),
('15af4636-895c-4af1-9d53-4c74e551f977', 'FPF Engenharia'),
('bcd9766c-7866-45ee-85bb-b122d88bb603', 'Haganá Engenharia'),
('221c158c-b0ba-4851-978d-dab50ebe0567', 'JCM Engenharia'),
('02f64e3e-f624-4f54-b4ef-8a1b4245deb8', 'F2 Engenharia'),
('d257c24a-c716-4c40-a040-55cffb4dfa85', 'MBR Engenharia'),
('76fd1797-5072-41a0-9134-3b40f472e7e3', 'GJS Construções'),
('bc0c7d73-c402-46e7-a1c9-c324e87c7764', 'WDS Engenharia'),
('2ce8a63f-df5f-4c08-8a56-688e4bd1ab23', 'FCK Engenharia'),
('fd7e5542-d5a0-4db5-8532-6bebc0d88204', '3M Construtora'),
('3c19f9ed-4eb5-49aa-81d8-1cc241abe8ca', 'A6 Construções');

INSERT INTO obras (id, construtora_id, slug, nome, descricao_curta, categoria, status, preco_a_partir, cidade, estado) VALUES 
('54ba57fa-2e5a-4ef7-9d25-394dd95a34eb', '460c7cf9-84be-4869-9fea-652bbcbe4bde', 'obra-0-1784834340609', 'Projeto Especial MPD Engenharia', 'Execução de alto padrão por MPD Engenharia.', 'residencial', 'lancamento', 1000, 'São Paulo', 'SP'),
('60750348-a0a2-4220-b616-3c7654130efb', '2bf2c3ea-69e9-4790-bf7b-591363fb7314', 'obra-1-1784834340609', 'Projeto Especial MUDARE Construtora', 'Execução de alto padrão por MUDARE Construtora.', 'comercial', 'em_obras', 1100, 'Alphaville', 'SP'),
('6aaa2ef9-39df-41d6-82ca-3f3201fda39f', '73ce39f3-af2a-4acd-b322-275aa81094e1', 'obra-2-1784834340609', 'Projeto Especial Peak Engenharia', 'Execução de alto padrão por Peak Engenharia.', 'misto', 'pronto', 1200, 'Barueri', 'SP'),
('544ec795-57f2-4764-9f36-e640d5c2a4d3', '974a53a0-d597-4322-83e3-73e3071d6038', 'obra-3-1784834340609', 'Projeto Especial TECSA Construtora', 'Execução de alto padrão por TECSA Construtora.', 'residencial', 'lancamento', 1300, 'Curitiba', 'PR'),
('697492e8-ec35-4c59-8476-2fcab219ae98', '20538ed7-4ac7-47da-a692-9470df3fbe6f', 'obra-4-1784834340609', 'Projeto Especial WGi Construtora', 'Execução de alto padrão por WGi Construtora.', 'comercial', 'em_obras', 1400, 'Campinas', 'SP'),
('f810192e-4424-4c4a-95f3-08d31bf0ae17', '5415d7ec-82c3-4690-abef-07aa43e95782', 'obra-5-1784834340609', 'Projeto Especial Mariano Construtora & Engenharia', 'Execução de alto padrão por Mariano Construtora & Engenharia.', 'misto', 'pronto', 1500, 'Osasco', 'SP'),
('3c2df35d-8fb9-4175-bb46-c3c62c2c6860', 'e24fd274-631b-460a-8207-a5ed6b577653', 'obra-6-1784834340609', 'Projeto Especial Diase Construtora', 'Execução de alto padrão por Diase Construtora.', 'residencial', 'lancamento', 1600, 'Santana de Parnaíba', 'SP'),
('0994baaa-1eea-426e-9f27-6189a0ff7ff6', '4e96d410-6cc0-4e98-a49a-56311cfa05dc', 'obra-7-1784834340609', 'Projeto Especial Cazzabella', 'Execução de alto padrão por Cazzabella.', 'comercial', 'em_obras', 1700, 'São Paulo', 'SP'),
('00fcb695-103c-4444-b927-3354f723f97f', 'd79ca0aa-1a58-446f-bcd5-69d46608d113', 'obra-8-1784834340609', 'Projeto Especial Yellowbrick Houses', 'Execução de alto padrão por Yellowbrick Houses.', 'misto', 'pronto', 1800, 'Alphaville', 'SP'),
('b016cc74-8b88-4f3c-959b-05de0d7d6fee', '26635b7b-3451-4eef-bacf-274360e4ec8a', 'obra-9-1784834340609', 'Projeto Especial Build Incorporadora', 'Execução de alto padrão por Build Incorporadora.', 'residencial', 'lancamento', 1900, 'Barueri', 'SP'),
('a521bbf2-b33a-49c1-9c04-0b14174aac3d', 'e3528242-73a0-4568-91f9-a7caace68b81', 'obra-10-1784834340609', 'Projeto Especial VIDE Construtora', 'Execução de alto padrão por VIDE Construtora.', 'comercial', 'em_obras', 2000, 'Curitiba', 'PR'),
('bc44f626-5a89-42ee-aa09-ef6242a998ac', 'c35002e1-9803-4c41-b171-05e44c41a7c8', 'obra-11-1784834340609', 'Projeto Especial Neoin Construção', 'Execução de alto padrão por Neoin Construção.', 'misto', 'pronto', 2100, 'Campinas', 'SP'),
('bda153ff-650e-4bf2-950c-fdd3f45cc3b2', '3c45aab9-a4f5-4617-be79-5ee0722518ac', 'obra-12-1784834340609', 'Projeto Especial Zcardin Engenharia', 'Execução de alto padrão por Zcardin Engenharia.', 'residencial', 'lancamento', 2200, 'Osasco', 'SP'),
('9c922560-fe2e-4a56-b52d-57114ed4ab13', 'c0af5fda-b9fb-4064-bca7-6c1e6bded1ef', 'obra-13-1784834340609', 'Projeto Especial Haus Incorporadora', 'Execução de alto padrão por Haus Incorporadora.', 'comercial', 'em_obras', 2300, 'Santana de Parnaíba', 'SP'),
('ec520e2f-9c8d-4772-88a1-7b88752cdbe2', '88b53530-f709-4396-aae8-1800be132a06', 'obra-14-1784834340609', 'Projeto Especial M2A Engenharia', 'Execução de alto padrão por M2A Engenharia.', 'misto', 'pronto', 2400, 'São Paulo', 'SP'),
('12d227c8-144d-4e4d-ba60-4e34b9b9f398', 'a18bf48d-bacc-438d-87e5-59ee84f2defd', 'obra-15-1784834340609', 'Projeto Especial MVS Engenharia', 'Execução de alto padrão por MVS Engenharia.', 'residencial', 'lancamento', 2500, 'Alphaville', 'SP'),
('b0bdbe6c-176a-4019-83a6-76c282c2215c', '08261414-3c3e-42a8-a85a-73b792509ead', 'obra-16-1784834340609', 'Projeto Especial RFM Construtora', 'Execução de alto padrão por RFM Construtora.', 'comercial', 'em_obras', 2600, 'Barueri', 'SP'),
('9eb6138c-6b92-4ad2-9ff5-9f40c4142874', 'fbb0bc49-75d3-4443-9d8c-174edc1cc8b2', 'obra-17-1784834340609', 'Projeto Especial Baggio Schiavon Engenharia', 'Execução de alto padrão por Baggio Schiavon Engenharia.', 'misto', 'pronto', 2700, 'Curitiba', 'PR'),
('25ba7754-0259-42b4-ae58-98c4c4164433', '463c16d8-71a4-401f-885c-8843313d7385', 'obra-18-1784834340609', 'Projeto Especial Constrac Engenharia', 'Execução de alto padrão por Constrac Engenharia.', 'residencial', 'lancamento', 2800, 'Campinas', 'SP'),
('4b0903ad-7bf5-40ed-86e3-25daccff4922', '891c33d1-7f9a-4db4-9231-9a94a955b807', 'obra-19-1784834340609', 'Projeto Especial Construtora São José', 'Execução de alto padrão por Construtora São José.', 'comercial', 'em_obras', 2900, 'Osasco', 'SP'),
('91b78065-dceb-4acc-94aa-7b0b25e16053', 'bd8c1bcd-cdc2-45d2-aedc-5acab1b4fb13', 'obra-20-1784834340609', 'Projeto Especial Adolpho Lindenberg', 'Execução de alto padrão por Adolpho Lindenberg.', 'misto', 'pronto', 3000, 'Santana de Parnaíba', 'SP'),
('aa1242f6-7a07-4d54-be07-180f5f386bac', '6df1b788-44f3-431d-ad50-2485afb89f6e', 'obra-21-1784834340609', 'Projeto Especial Albuquerque Takaoka', 'Execução de alto padrão por Albuquerque Takaoka.', 'residencial', 'lancamento', 3100, 'São Paulo', 'SP'),
('00558626-4e2a-442e-b63a-e8f406c74683', '2894647f-b98b-4fce-bf59-7d2bd7d83da1', 'obra-22-1784834340609', 'Projeto Especial JHSF Engenharia', 'Execução de alto padrão por JHSF Engenharia.', 'comercial', 'em_obras', 3200, 'Alphaville', 'SP'),
('018694b0-17ff-4a4e-8200-5e6b7bff4cb3', '9f317b5a-7065-4bc7-8887-688551145238', 'obra-23-1784834340609', 'Projeto Especial ROC Engenharia', 'Execução de alto padrão por ROC Engenharia.', 'misto', 'pronto', 3300, 'Barueri', 'SP'),
('e3e295cd-490f-4687-a6af-1271ba752c13', 'f22b626c-d6e6-40e3-8993-b22031244466', 'obra-24-1784834340609', 'Projeto Especial Racional Engenharia', 'Execução de alto padrão por Racional Engenharia.', 'residencial', 'lancamento', 3400, 'Curitiba', 'PR'),
('a6ede5f9-025f-48cd-b017-52132dc6a6c9', '5723ad0c-2884-47d3-8244-29b59284f936', 'obra-25-1784834340609', 'Projeto Especial Planeta Engenharia', 'Execução de alto padrão por Planeta Engenharia.', 'comercial', 'em_obras', 3500, 'Campinas', 'SP'),
('3f920f31-5180-4e6e-94d1-accca0827a0b', '6e2956a6-ecb5-4175-b547-5472ce77dba1', 'obra-26-1784834340609', 'Projeto Especial FBS Construtora', 'Execução de alto padrão por FBS Construtora.', 'misto', 'pronto', 3600, 'Osasco', 'SP'),
('f39099b2-2280-42e7-8dbb-a68bf3812974', '7c7c279c-9735-4ed3-b03d-205a7e90d6ff', 'obra-27-1784834340609', 'Projeto Especial Casaviva', 'Execução de alto padrão por Casaviva.', 'residencial', 'lancamento', 3700, 'Santana de Parnaíba', 'SP'),
('1e17182c-a5be-441d-9ffd-ae6b61da6fdd', 'e6fa487a-c430-463a-b009-cd1e6c0794d5', 'obra-28-1784834340609', 'Projeto Especial Construtora Gaia', 'Execução de alto padrão por Construtora Gaia.', 'comercial', 'em_obras', 3800, 'São Paulo', 'SP'),
('3d1aaaef-6d7c-495d-a9a5-de143d143019', '94f4ebfe-6727-41f0-8a5f-c7346094d172', 'obra-29-1784834340609', 'Projeto Especial HOSS Construtora', 'Execução de alto padrão por HOSS Construtora.', 'misto', 'pronto', 3900, 'Alphaville', 'SP'),
('9fca3001-6537-4d7b-9f8a-0436d772ff07', '2cfec58a-da2f-47e9-a339-0cc965a3d2fb', 'obra-30-1784834340609', 'Projeto Especial Lumiar Construtora', 'Execução de alto padrão por Lumiar Construtora.', 'residencial', 'lancamento', 4000, 'Barueri', 'SP'),
('9d5d28e9-e33a-4f69-ab2c-c1ae586e46fd', 'd9b2413a-11b5-498e-a0e4-94c64dd648c7', 'obra-31-1784834340609', 'Projeto Especial Hernandez Construtora', 'Execução de alto padrão por Hernandez Construtora.', 'comercial', 'em_obras', 4100, 'Curitiba', 'PR'),
('85ec7421-a4d9-480e-82c4-92d61bedf090', '761830b6-681e-4c99-b4d7-01d4e6831549', 'obra-32-1784834340609', 'Projeto Especial Fratta Construtora', 'Execução de alto padrão por Fratta Construtora.', 'misto', 'pronto', 4200, 'Campinas', 'SP'),
('00c43b84-607c-48e2-8f3c-81f2bbdc2559', '0c63875e-85d1-41db-8706-40a8314161a9', 'obra-33-1784834340609', 'Projeto Especial A3 Construtora', 'Execução de alto padrão por A3 Construtora.', 'residencial', 'lancamento', 4300, 'Osasco', 'SP'),
('ce8430e2-9710-4f74-9305-6db247ce2330', 'b8a8c437-64df-4c5c-aa5d-11ffb832c1e7', 'obra-34-1784834340609', 'Projeto Especial Holos Construtora', 'Execução de alto padrão por Holos Construtora.', 'comercial', 'em_obras', 4400, 'Santana de Parnaíba', 'SP'),
('94ff2cb0-eec8-4145-838c-5a017ab73ddd', 'd75b5660-9aa0-411f-9358-5ad1e9c8b7be', 'obra-35-1784834340609', 'Projeto Especial Pedra Forte Construtora', 'Execução de alto padrão por Pedra Forte Construtora.', 'misto', 'pronto', 4500, 'São Paulo', 'SP'),
('3f510502-3e55-4f37-8769-8b7faaf537d5', '94a96b3d-9982-4345-a258-248d07eaf1c2', 'obra-36-1784834340609', 'Projeto Especial Fonseca & Mercadante', 'Execução de alto padrão por Fonseca & Mercadante.', 'residencial', 'lancamento', 4600, 'Alphaville', 'SP'),
('1ea512b4-827b-4fb1-a704-04faea8b3b63', '6863bf13-5617-4e60-b722-bd1c3bc13ca9', 'obra-37-1784834340609', 'Projeto Especial Apogeu Construtora', 'Execução de alto padrão por Apogeu Construtora.', 'comercial', 'em_obras', 4700, 'Barueri', 'SP'),
('ae5bf886-2831-4e7f-b413-f2f5df453b9e', '46ee20f5-f48c-4a4c-81fc-1754fdbeaaa7', 'obra-38-1784834340609', 'Projeto Especial Exata Construtora', 'Execução de alto padrão por Exata Construtora.', 'misto', 'pronto', 4800, 'Curitiba', 'PR'),
('a2bd3e92-4250-48c5-956c-af56c1308412', '3c1bb3ce-cf69-4924-947e-27d7c7a716f6', 'obra-39-1784834340609', 'Projeto Especial MAC Construtora', 'Execução de alto padrão por MAC Construtora.', 'residencial', 'lancamento', 4900, 'Campinas', 'SP'),
('bcffdee6-d1f6-4409-931f-46f40427e086', 'f3b876b9-275a-4516-ac79-4f2380019468', 'obra-40-1784834340609', 'Projeto Especial LAR Construtora', 'Execução de alto padrão por LAR Construtora.', 'comercial', 'em_obras', 5000, 'Osasco', 'SP'),
('f90f4bba-7b37-4097-b99f-e9656b1a36f3', '79f79763-b863-464c-8776-56d5889b5d84', 'obra-41-1784834340609', 'Projeto Especial Fibra Experts', 'Execução de alto padrão por Fibra Experts.', 'misto', 'pronto', 5100, 'Santana de Parnaíba', 'SP'),
('1006f798-501f-4dc6-83b5-559ffce9e868', 'fc4acec6-6172-483a-b9a8-1917890e03a7', 'obra-42-1784834340609', 'Projeto Especial Bratke Collet Engenharia', 'Execução de alto padrão por Bratke Collet Engenharia.', 'residencial', 'lancamento', 5200, 'São Paulo', 'SP'),
('61543ea7-1cfb-490a-b898-c9500fe8bd20', '14a38397-d93a-46da-8bef-93d8ff009c63', 'obra-43-1784834340609', 'Projeto Especial Engeplan Engenharia', 'Execução de alto padrão por Engeplan Engenharia.', 'comercial', 'em_obras', 5300, 'Alphaville', 'SP'),
('503368d8-023c-443c-a4fc-c785f780a94e', 'aadece45-ec83-4e47-a691-a5693a64fc8a', 'obra-44-1784834340609', 'Projeto Especial Alpha Lar Construtora', 'Execução de alto padrão por Alpha Lar Construtora.', 'misto', 'pronto', 5400, 'Barueri', 'SP'),
('64f9a1b3-d464-413d-b602-53f7b2bb5a2b', 'a27028ab-6428-461c-abe4-49dc67272a2b', 'obra-45-1784834340609', 'Projeto Especial Alp Construções', 'Execução de alto padrão por Alp Construções.', 'residencial', 'lancamento', 5500, 'Curitiba', 'PR'),
('60ff1146-2a4a-4e73-82e5-828c282f7986', '633bab06-36d7-410a-b07a-dbf7c70975ad', 'obra-46-1784834340609', 'Projeto Especial Prisma Engenharia', 'Execução de alto padrão por Prisma Engenharia.', 'comercial', 'em_obras', 5600, 'Campinas', 'SP'),
('4aaef548-4f05-4048-a900-4a0e77a8d52d', '256e8096-b0be-4c28-ae21-ac935e9aba64', 'obra-47-1784834340609', 'Projeto Especial Vértice Engenharia', 'Execução de alto padrão por Vértice Engenharia.', 'misto', 'pronto', 5700, 'Osasco', 'SP'),
('732f1b3b-1f09-4f9d-91c7-d60990e8575a', '15af4636-895c-4af1-9d53-4c74e551f977', 'obra-48-1784834340609', 'Projeto Especial FPF Engenharia', 'Execução de alto padrão por FPF Engenharia.', 'residencial', 'lancamento', 5800, 'Santana de Parnaíba', 'SP'),
('6651dc16-56fb-4334-98ed-998d73d6d4e6', 'bcd9766c-7866-45ee-85bb-b122d88bb603', 'obra-49-1784834340609', 'Projeto Especial Haganá Engenharia', 'Execução de alto padrão por Haganá Engenharia.', 'comercial', 'em_obras', 5900, 'São Paulo', 'SP'),
('1a7cf4ea-80b2-46c8-b902-8f6f04bbf0d5', '221c158c-b0ba-4851-978d-dab50ebe0567', 'obra-50-1784834340609', 'Projeto Especial JCM Engenharia', 'Execução de alto padrão por JCM Engenharia.', 'misto', 'pronto', 1000, 'Alphaville', 'SP'),
('62f5ecfc-9e4a-4d3e-ab94-14f01862d6ac', '02f64e3e-f624-4f54-b4ef-8a1b4245deb8', 'obra-51-1784834340609', 'Projeto Especial F2 Engenharia', 'Execução de alto padrão por F2 Engenharia.', 'residencial', 'lancamento', 1100, 'Barueri', 'SP'),
('a09e6851-4404-4991-8860-8c015bfa1997', 'd257c24a-c716-4c40-a040-55cffb4dfa85', 'obra-52-1784834340609', 'Projeto Especial MBR Engenharia', 'Execução de alto padrão por MBR Engenharia.', 'comercial', 'em_obras', 1200, 'Curitiba', 'PR'),
('82e7806a-2ec2-4fb9-8e81-cf5612738332', '76fd1797-5072-41a0-9134-3b40f472e7e3', 'obra-53-1784834340609', 'Projeto Especial GJS Construções', 'Execução de alto padrão por GJS Construções.', 'misto', 'pronto', 1300, 'Campinas', 'SP'),
('33085843-c6c2-405f-9d40-0036f5ff5b3f', 'bc0c7d73-c402-46e7-a1c9-c324e87c7764', 'obra-54-1784834340609', 'Projeto Especial WDS Engenharia', 'Execução de alto padrão por WDS Engenharia.', 'residencial', 'lancamento', 1400, 'Osasco', 'SP'),
('365b60ee-8c20-4be1-9b57-b97ade26f396', '2ce8a63f-df5f-4c08-8a56-688e4bd1ab23', 'obra-55-1784834340609', 'Projeto Especial FCK Engenharia', 'Execução de alto padrão por FCK Engenharia.', 'comercial', 'em_obras', 1500, 'Santana de Parnaíba', 'SP'),
('cac01c7a-142b-46b5-813c-b1ab4689050f', 'fd7e5542-d5a0-4db5-8532-6bebc0d88204', 'obra-56-1784834340609', 'Projeto Especial 3M Construtora', 'Execução de alto padrão por 3M Construtora.', 'misto', 'pronto', 1600, 'São Paulo', 'SP'),
('a2b38cc7-63a4-43b7-936b-2e519cfdff7f', '3c19f9ed-4eb5-49aa-81d8-1cc241abe8ca', 'obra-57-1784834340609', 'Projeto Especial A6 Construções', 'Execução de alto padrão por A6 Construções.', 'residencial', 'lancamento', 1700, 'Alphaville', 'SP');
