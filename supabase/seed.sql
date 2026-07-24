-- Sample data for local/dev use of the vitrine. Not part of tracked schema migrations.

insert into construtoras (id, nome) values
  ('11111111-1111-1111-1111-111111111111', 'Horizonte Construtora'),
  ('22222222-2222-2222-2222-222222222222', 'Viva Incorporadora'),
  ('33333333-3333-3333-3333-333333333333', 'Raiz Empreendimentos');

insert into obras (
  construtora_id, slug, nome, descricao_curta, descricao_longa,
  status, categoria, cidade, estado, bairro, preco_a_partir,
  cover_image_url, gallery_urls, tags, unidades_disponiveis, is_published
) values
  (
    '11111111-1111-1111-1111-111111111111', 'jardins-do-horizonte', 'Jardins do Horizonte',
    'Apartamentos de 2 e 3 quartos a poucos minutos do centro.',
    'O Jardins do Horizonte traz um novo conceito de morar bem em Vila Mariana, com plantas de 2 e 3 quartos, lazer completo e área verde preservada. Entrega prevista para 2028, com opções de financiamento direto com a construtora.',
    'lancamento', 'residencial', 'São Paulo', 'SP', 'Vila Mariana', 620000,
    'https://picsum.photos/seed/jardins-do-horizonte/800/600',
    array['https://picsum.photos/seed/jardins-do-horizonte-1/1200/800','https://picsum.photos/seed/jardins-do-horizonte-2/1200/800','https://picsum.photos/seed/jardins-do-horizonte-3/1200/800'],
    array['piscina','academia','pet friendly'], 42, true
  ),
  (
    '22222222-2222-2222-2222-222222222222', 'vista-mar-floripa', 'Vista Mar Floripa',
    'Studios e apartamentos com vista para o mar, a 5 minutos da praia.',
    'Localizado no bairro Canasvieiras, o Vista Mar Floripa oferece studios e apartamentos de 1 a 2 quartos, ideais para moradia ou investimento em temporada. Obra em ritmo acelerado, com previsão de entrega em 18 meses.',
    'em_obras', 'residencial', 'Florianópolis', 'SC', 'Canasvieiras', 480000,
    'https://picsum.photos/seed/vista-mar-floripa/800/600',
    array['https://picsum.photos/seed/vista-mar-floripa-1/1200/800','https://picsum.photos/seed/vista-mar-floripa-2/1200/800'],
    array['vista mar','varanda gourmet'], 18, true
  ),
  (
    '33333333-3333-3333-3333-333333333333', 'raiz-batel-office', 'Raiz Batel Office',
    'Salas comerciais de alto padrão no coração do Batel.',
    'O Raiz Batel Office entrega salas comerciais de 30 a 120m² totalmente prontas, com infraestrutura de fibra óptica, geradores e portaria 24h. Ideal para escritórios e consultórios.',
    'pronto_para_morar', 'comercial', 'Curitiba', 'PR', 'Batel', 350000,
    'https://picsum.photos/seed/raiz-batel-office/800/600',
    array['https://picsum.photos/seed/raiz-batel-office-1/1200/800','https://picsum.photos/seed/raiz-batel-office-2/1200/800'],
    array['pronto para uso','coworking'], 7, true
  ),
  (
    '11111111-1111-1111-1111-111111111111', 'horizonte-savassi-mix', 'Horizonte Savassi Mix',
    'Empreendimento misto com apartamentos e lojas na Savassi.',
    'Combinando torres residenciais e um térreo comercial vibrante, o Horizonte Savassi Mix fica a poucos passos da Praça da Savassi, com plantas de 1 a 3 quartos e lojas de 40 a 90m².',
    'lancamento', 'misto', 'Belo Horizonte', 'MG', 'Savassi', 540000,
    'https://picsum.photos/seed/horizonte-savassi-mix/800/600',
    array['https://picsum.photos/seed/horizonte-savassi-mix-1/1200/800','https://picsum.photos/seed/horizonte-savassi-mix-2/1200/800'],
    array['térreo comercial','rooftop'], 60, true
  ),
  (
    '22222222-2222-2222-2222-222222222222', 'viva-pinheiros-365', 'Viva Pinheiros 365',
    'Studios compactos e inteligentes para viver perto de tudo.',
    'Pensado para quem valoriza mobilidade urbana, o Viva Pinheiros 365 oferece studios de 24 a 38m² com mobiliário planejado incluso, a 400m do metrô Faria Lima.',
    'em_obras', 'residencial', 'São Paulo', 'SP', 'Pinheiros', 390000,
    'https://picsum.photos/seed/viva-pinheiros-365/800/600',
    array['https://picsum.photos/seed/viva-pinheiros-365-1/1200/800','https://picsum.photos/seed/viva-pinheiros-365-2/1200/800'],
    array['mobiliado','perto do metrô'], 24, true
  ),
  (
    '33333333-3333-3333-3333-333333333333', 'raiz-agua-verde-village', 'Raiz Água Verde Village',
    'Casas em condomínio fechado com área verde e segurança 24h.',
    'Um village de 30 casas germinadas de 3 quartos, com quintal privativo, condomínio fechado, playground e segurança 24h no bairro Água Verde.',
    'pronto_para_morar', 'residencial', 'Curitiba', 'PR', 'Água Verde', 720000,
    'https://picsum.photos/seed/raiz-agua-verde-village/800/600',
    array['https://picsum.photos/seed/raiz-agua-verde-village-1/1200/800','https://picsum.photos/seed/raiz-agua-verde-village-2/1200/800'],
    array['casa em condomínio','quintal privativo'], 4, true
  ),
  (
    '11111111-1111-1111-1111-111111111111', 'horizonte-lagoa-corporate', 'Horizonte Lagoa Corporate',
    'Torre corporativa premium com vista para a Lagoa da Conceição.',
    'Lajes corporativas de 200 a 800m², certificação de sustentabilidade e vista privilegiada para a Lagoa da Conceição. O endereço ideal para empresas que buscam status e qualidade de vida para o time.',
    'lancamento', 'comercial', 'Florianópolis', 'SC', 'Lagoa da Conceição', 890000,
    'https://picsum.photos/seed/horizonte-lagoa-corporate/800/600',
    array['https://picsum.photos/seed/horizonte-lagoa-corporate-1/1200/800','https://picsum.photos/seed/horizonte-lagoa-corporate-2/1200/800'],
    array['certificação verde','vista lagoa'], 15, true
  ),
  (
    '22222222-2222-2222-2222-222222222222', 'viva-savassi-garden', 'Viva Savassi Garden',
    'Apartamentos garden com quintal privativo e lazer resort.',
    'Unidades térreas tipo garden com quintal privativo de até 80m², em meio a um lazer completo estilo resort, a poucos minutos do centro de Belo Horizonte.',
    'em_obras', 'residencial', 'Belo Horizonte', 'MG', 'Savassi', 810000,
    'https://picsum.photos/seed/viva-savassi-garden/800/600',
    array['https://picsum.photos/seed/viva-savassi-garden-1/1200/800','https://picsum.photos/seed/viva-savassi-garden-2/1200/800'],
    array['garden','lazer resort'], 9, true
  );
