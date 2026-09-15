-- Inserção das Construtoras e Obras do Santa Bárbara Resort Residence
-- Gerado automaticamente com base nos dados fornecidos

DO $$
DECLARE
    -- Construtora IDs
    id_grupo7 UUID := uuid_generate_v4();
    id_ea3 UUID := uuid_generate_v4();
    id_lvengeo UUID := uuid_generate_v4();
    id_andrecobois UUID := uuid_generate_v4();
    id_ojn UUID := uuid_generate_v4();
    id_omega UUID := uuid_generate_v4();
    id_rpr UUID := uuid_generate_v4();
    id_audeir UUID := uuid_generate_v4();
    id_was UUID := uuid_generate_v4();
    id_mr UUID := uuid_generate_v4();
    id_jlbc UUID := uuid_generate_v4();
    id_edvan UUID := uuid_generate_v4();
    id_tcc UUID := uuid_generate_v4();
    id_simperiofer UUID := uuid_generate_v4();
    id_facilita UUID := uuid_generate_v4();
    id_jd UUID := uuid_generate_v4();
    id_jr UUID := uuid_generate_v4();
    id_irmaosgomes UUID := uuid_generate_v4();
    id_equipea UUID := uuid_generate_v4();
    id_avior UUID := uuid_generate_v4();
    id_ramon UUID := uuid_generate_v4();
    id_mg UUID := uuid_generate_v4();
    id_rodrigo UUID := uuid_generate_v4();
BEGIN

    -- 1. Inserir Construtoras
    INSERT INTO construtoras (id, nome, logo_url) VALUES
    (id_grupo7, 'Grupo 7', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/6944094e-dd24-4c88-9203-3d4aac1e09ff/697ba011-be8c-43c7-ac5a-7203ac1e09ff.png'),
    (id_ea3, 'EA3 Engenharia', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/61c332d0-6074-4cc1-8b8e-59bfac1e09ff/698f2efd-ad1c-47c3-b9be-23ffac1e09ff.png'),
    (id_lvengeo, 'LV Engeo Engenharia e Arquitetura', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/610c229d-bcac-403f-a1e2-4869ac1e09ff/69b42ea5-c128-4d09-8278-0b04ac1e09ff.jpeg'),
    (id_andrecobois, 'André Cobois Construções', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/6747628e-c874-4661-8cbe-72c8ac1e0fec/682e3fd5-2748-4539-9462-61a7ac1e0fec.png'),
    (id_ojn, 'OJN Engenharia e Construções', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/68dc22ae-0940-4410-8097-0348ac1e09ff/e245d5a1-1b7d-45d0-8489-5c06c5ac66fd.png'),
    (id_omega, 'Ômega Construtora', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/6851c8e8-2bcc-40a6-8fb7-7e0eac1e09ff/68640262-3c34-4cef-8ce7-0f76ac1e0fec.jpeg'),
    (id_rpr, 'RPR Construções', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/65eb5c74-e340-4054-b876-1f1eac1e09ff/66ba143d-9c30-495d-ad36-6c59ac1e09ff.png'),
    (id_audeir, 'Audeir Construções', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/61b74074-d224-476c-9075-1e26ac1e09ff/66cde436-8e0c-478a-b373-2206ac1e09ff.png'),
    (id_was, 'WAS Construtora, Engenharia e Arquitetura', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/675ae47d-4750-4033-b5b3-708fac1e09ff/678e5395-0c0c-44cf-8ec2-5d0fac1e09ff.png'),
    (id_mr, 'MR Engenharia & Construtora', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/69bd7f16-5930-499b-a851-64a7ac1e09ff/ca1a3648-558a-4c53-a621-541bd796275a.png'),
    (id_jlbc, 'JLBC ENGENHARIA LTDA', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/68d44a39-2968-4e19-b38a-2e5cac1e0fec/905a0a8c-6c2e-4f3c-a252-7c52e9a43bac.png'),
    (id_edvan, 'Edvan Construções em Geral', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/68d58141-e62c-4bce-ab3e-6d43ac1e09ff/68dab6b4-f298-4411-8dbf-7ef8ac1e0fec.png'),
    (id_tcc, 'Construtora TCC Multiserviços', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/685ede08-60dc-4dac-98ed-2e36ac1e09ff/6863c96d-c23c-4d4f-adec-04a2ac1e09ff.png'),
    (id_simperiofer, 'Construtora Simperiofer', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/67bf68ac-fbf8-49b7-aa62-3dd4ac1e09ff/67c2019e-9324-4859-b1f0-1a2bac1e09ff.jpeg'),
    (id_facilita, 'Facilita Gestão Construtiva', 'https://thumb-cdn.soluall.net/prod/adv_ads/ad300box/686c1793-2cf4-4208-9f0f-4205ac1e0fec/68920539-3248-4b2d-891e-75c7ac1e09ff.jpg'),
    (id_jd, 'JD Construções', NULL),
    (id_jr, 'Construtora JR', NULL),
    (id_irmaosgomes, 'Construtora Irmãos Gomes', NULL),
    (id_equipea, 'Construtora Equipe A', NULL),
    (id_avior, 'Avior Construtora', NULL),
    (id_ramon, 'Ramon R4 Construtor', NULL),
    (id_mg, 'MG Construção', NULL),
    (id_rodrigo, 'Rodrigo Feitosa - Construtor', NULL);

    -- 2. Inserir Obras no Santa Bárbara Resort Residence
    INSERT INTO obras (
        construtora_id, slug, nome, descricao_curta, descricao_longa,
        categoria, status, preco_a_partir, unidades_disponiveis,
        cidade, estado, bairro, cover_image_url, gallery_urls, tags, is_published
    ) VALUES
    (
        id_grupo7, 'grupo-7-santa-barbara', 'Grupo 7 - Obras & Engenharia Civil',
        'Construção de casas de alto padrão no Santa Bárbara Resort Residence com gestão completa de obra.',
        'O Grupo 7 é especialista em projetos residenciais e gestão de obras no condomínio Santa Bárbara Resort Residence.',
        'residencial', 'em_obras', 3200, 12, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Alvenaria', 'Fundações', 'Gerenciamento'], true
    ),
    (
        id_ea3, 'ea3-engenharia-santa-barbara', 'EA3 Engenharia & Construções',
        'Engenharia civil de precisão, projetos arquitetônicos e construção residencial completa no resort.',
        'A EA3 Engenharia atua no desenvolvimento de projetos e execução de obras de alto padrão.',
        'residencial', 'em_obras', 3400, 14, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Fundações', 'Acabamento Fino', 'Gerenciamento'], true
    ),
    (
        id_lvengeo, 'lv-engeo-viviane-luan-santa-barbara', 'LV Engeo Engenharia e Arquitetura',
        'Projetos arquitetônicos e construção completa com Viviane e Luan (CREA-SP 5070231028).',
        'A LV Engeo Engenharia e Arquitetura, liderada por Viviane e Luan, possui destacada atuação no Santa Bárbara Resort Residence.',
        'residencial', 'em_obras', 3600, 18, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Alvenaria', 'Acabamento Fino', 'Gerenciamento'], true
    ),
    (
        id_andrecobois, 'andre-cobois-construcoes-santa-barbara', 'André Cobois Construções',
        'Construção civil especializada em residências de campo e lazer com alto padrão de execução.',
        'André Cobois Construções oferece mão de obra especializada e administração de obras com experiência comprovada.',
        'residencial', 'em_obras', 3100, 10, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Fundações', 'Reformas & Ampliações', 'Acabamento Fino'], true
    ),
    (
        id_ojn, 'ojn-engenharia-construcoes-santa-barbara', 'OJN Engenharia e Construções',
        'Engenharia e execução estrutural para casas de campo e lazer com garantia e solidez.',
        'A OJN Engenharia e Construções entrega soluções construtivas completas no resort.',
        'residencial', 'em_obras', 3300, 15, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Fundações', 'Alvenaria', 'Gerenciamento'], true
    ),
    (
        id_omega, 'omega-construtora-santa-barbara', 'Ômega Construtora',
        'Construção de alto padrão, projetos modernos e acabamento diferenciado no Santa Bárbara Resort.',
        'A Ômega Construtora é amplamente reconhecida pela pontualidade e acabamento refinado.',
        'residencial', 'em_obras', 3500, 16, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Alvenaria', 'Acabamento Fino', 'Gerenciamento'], true
    ),
    (
        id_rpr, 'rpr-construcoes-santa-barbara', 'RPR Construções',
        'Qualidade, agilidade e confiança na construção da sua residência no resort.',
        'A RPR Construções executa projetos completos no Santa Bárbara Resort Residence.',
        'residencial', 'em_obras', 3250, 12, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Fundações', 'Gerenciamento'], true
    ),
    (
        id_audeir, 'audeir-construcoes-santa-barbara', 'Audeir Construções',
        'Execução de obras residenciais completas, da fundação à entrega das chaves.',
        'Audeir Construções atua no condomínio com dedicação em todas as fases da obra.',
        'residencial', 'em_obras', 3150, 10, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Fundações', 'Alvenaria', 'Acabamento Fino'], true
    ),
    (
        id_was, 'was-construtora-engenharia-arquitetura-santa-barbara', 'WAS Construtora, Engenharia e Arquitetura',
        'Soluções integradas de engenharia e arquitetura para residências de alto padrão.',
        'A WAS Construtora alia arquitetura sofisticada e gestão completa no resort.',
        'residencial', 'em_obras', 3550, 11, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Alvenaria', 'Gerenciamento'], true
    ),
    (
        id_mr, 'mr-engenharia-construtora-santa-barbara', 'MR Engenharia & Construtora',
        'Projetos, cálculo estrutural e construção de qualidade no Santa Bárbara Resort.',
        'A MR Engenharia & Construtora oferece suporte desde a aprovação até a entrega das chaves.',
        'residencial', 'em_obras', 3450, 12, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Fundações', 'Alvenaria'], true
    ),
    (
        id_jlbc, 'jlbc-engenharia-santa-barbara', 'JLBC ENGENHARIA LTDA',
        'Gestão executiva e engenharia de alto nível para residências contemporâneas.',
        'A JLBC Engenharia executa projetos com alto padrão técnico e responsabilidade.',
        'residencial', 'em_obras', 3600, 10, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Gerenciamento', 'Fundações'], true
    ),
    (
        id_edvan, 'edvan-construcoes-santa-barbara', 'Edvan Construções em Geral',
        'Mão de obra especializada e acompanhamento direto na construção civil residencial.',
        'Edvan Construções proporciona agilidade e economia na execução da sua residência.',
        'residencial', 'em_obras', 3000, 14, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Fundações', 'Acabamento Fino'], true
    ),
    (
        id_tcc, 'construtora-tcc-multiservicos-santa-barbara', 'Construtora TCC Multiserviços',
        'Construção completa, reformas e manutenções com equipes dedicadas e ágeis.',
        'A Construtora TCC Multiserviços atende todas as etapas da obra civil no resort.',
        'residencial', 'em_obras', 3100, 15, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Reformas & Ampliações', 'Instalações'], true
    ),
    (
        id_simperiofer, 'construtora-simperiofer-santa-barbara', 'Construtora Simperiofer',
        'Especializada em fundações, estruturas de concreto e alvenaria de alta performance.',
        'A Simperiofer alia engenharia rigorosa e solidez estrutural.',
        'residencial', 'em_obras', 3350, 12, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Fundações', 'Alvenaria', 'Gerenciamento'], true
    ),
    (
        id_facilita, 'facilita-gestao-construtiva-santa-barbara', 'Facilita Gestão Construtiva',
        'Gestão completa de obras, controle financeiro transparente e entrega com padrão superior.',
        'A Facilita Gestão Construtiva oferece gerenciamento moderno e controle total ao cliente.',
        'residencial', 'em_obras', 3650, 16, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Gerenciamento', 'Projetos & Arquitetura', 'Acabamento Fino'], true
    ),
    (
        id_jd, 'jd-construcoes-santa-barbara', 'JD Construções',
        'Execução ágil de obras civis e reformas em geral no condomínio Santa Bárbara.',
        'A JD Construções realiza serviços de alvenaria e infraestrutura no resort.',
        'residencial', 'em_obras', 2950, 8, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Fundações', 'Reformas & Ampliações'], true
    ),
    (
        id_jr, 'construtora-jr-santa-barbara', 'Construtora JR',
        'Construção de casas térreas e sobrados com ótimo custo-benefício e fino acabamento.',
        'A Construtora JR tem ampla vivência em obras residenciais unifamiliares.',
        'residencial', 'em_obras', 3100, 11, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Acabamento Fino', 'Gerenciamento'], true
    ),
    (
        id_irmaosgomes, 'construtora-irmaos-gomes-santa-barbara', 'Construtora Irmãos Gomes',
        'Tradição em construção civil residencial, fundação sólida e acabamentos de qualidade.',
        'A Construtora Irmãos Gomes atende clientes no Santa Bárbara Resort com responsabilidade técnica.',
        'residencial', 'em_obras', 3200, 13, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Fundações', 'Acabamento Fino'], true
    ),
    (
        id_equipea, 'construtora-equipe-a-santa-barbara', 'Construtora Equipe A',
        'Equipe especializada em alvenaria estrutural, projetos e gerenciamento com foco em prazos.',
        'A Construtora Equipe A une planejamento e velocidade construtiva.',
        'residencial', 'em_obras', 3300, 10, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Gerenciamento', 'Projetos & Arquitetura'], true
    ),
    (
        id_avior, 'avior-construtora-santa-barbara', 'Avior Construtora',
        'Engenharia moderna e execução de residências com alto padrão estético e funcional.',
        'A Avior Construtora executa residências unifamiliares de luxo no resort.',
        'residencial', 'em_obras', 3500, 14, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Projetos & Arquitetura', 'Alvenaria', 'Acabamento Fino'], true
    ),
    (
        id_ramon, 'ramon-r4-construtor-santa-barbara', 'Ramon R4 Construtor',
        'Construção de casas no campo com foco em durabilidade, beleza e economia de recursos.',
        'Ramon R4 Construtor traz acompanhamento presencial em todas as fases da obra.',
        'residencial', 'em_obras', 3150, 10, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Fundações', 'Reformas & Ampliações'], true
    ),
    (
        id_mg, 'mg-construcao-santa-barbara', 'MG Construção',
        'Serviços de construção, fundações e alvenaria para lotes no Santa Bárbara Resort.',
        'A MG Construção realiza serviços civis gerais com equipe prática.',
        'residencial', 'em_obras', 2900, 9, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Fundações', 'Instalações'], true
    ),
    (
        id_rodrigo, 'rodrigo-feitosa-construtor-santa-barbara', 'Rodrigo Feitosa - Construtor',
        'Experiência prática e excelência no acompanhamento e construção no Santa Bárbara Resort.',
        'Rodrigo Feitosa é construtor com comprovada experiência no Santa Bárbara Resort Residence.',
        'residencial', 'em_obras', 3200, 12, 'Águas de Santa Bárbara', 'SP', 'Santa Bárbara Resort Residence (Águas de Santa Bárbara)',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        ARRAY['Alvenaria', 'Acabamento Fino', 'Gerenciamento'], true
    );

END $$;
