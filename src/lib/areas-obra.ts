export interface AreaObra {
  id: string
  label: string
  grupo: "Planejamento & Projetos" | "Estrutura & Construção" | "Instalações & Engenharia" | "Acabamentos & Interiores" | "Áreas Externas & Especiais"
  imageUrl: string
  descricao: string
  benchmarkPrecoM2: number
  velocidadeTier: "Rápida" | "Média" | "Alta Precisão"
  tags: string[]
}

export const AREAS_OBRA: AreaObra[] = [
  // 1. FUNDAÇÃO
  {
    id: "fundacao",
    label: "Fundação",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    descricao: "Sapatas armadas, estacas hélice contínua, radiers estruturais e blocos de coroamento em canteiro.",
    benchmarkPrecoM2: 520,
    velocidadeTier: "Alta Precisão",
    tags: ["Fundações", "Radier", "Estacas", "Geotecnia"]
  },
  // 2. ESTRUTURA
  {
    id: "estrutura",
    label: "Estrutura",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    descricao: "Montagem de fôrmas, armações de aço para vigas e pilares, e concretagem de lajes maciças e protendidas.",
    benchmarkPrecoM2: 850,
    velocidadeTier: "Alta Precisão",
    tags: ["Concreto Armado", "Lajes Protendidas", "Pilares", "Vigas"]
  },
  // 3. TERRAPLANAGEM
  {
    id: "terraplanagem",
    label: "Terraplanagem",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    descricao: "Escavadeiras hidráulicas e tratores de esteira executando corte, aterro, bota-fora e compactação a laser.",
    benchmarkPrecoM2: 180,
    velocidadeTier: "Rápida",
    tags: ["Corte e Aterro", "Escavação", "Compactação", "Nivelamento"]
  },
  // 4. PAISAGISMO
  {
    id: "paisagismo",
    label: "Paisagismo",
    grupo: "Áreas Externas & Especiais",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    descricao: "Plantio de árvores adultas, gramados nobres, canteiros tropicais e infraestrutura de irrigação automatizada.",
    benchmarkPrecoM2: 320,
    velocidadeTier: "Média",
    tags: ["Jardins", "Plantas Nativas", "Irrigação", "Iluminação Externa"]
  },
  // 5. SISTEMA MONOLÍTICO
  {
    id: "sistema_monolitico",
    label: "Sistema Monolítico",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    descricao: "Painéis de poliestireno (EPS) com malha de aço galvanizado e argamassa de alta resistência projetada.",
    benchmarkPrecoM2: 1200,
    velocidadeTier: "Rápida",
    tags: ["Painel EPS", "Concreto Projetado", "Térmica", "Acústica"]
  },
  // 6. STEEL FRAME
  {
    id: "steel_frame",
    label: "Steel Frame",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    descricao: "Montagem de esqueletos autoportantes em aço galvanizado leve (LSF) com encaixes milimétricos sem desperdício.",
    benchmarkPrecoM2: 1450,
    velocidadeTier: "Rápida",
    tags: ["Light Steel Frame", "Construção Seca", "Aço Galvanizado"]
  },
  // 7. ALVENARIA CONVENCIONAL
  {
    id: "alvenaria",
    label: "Alvenaria Convencional",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
    descricao: "Pedreiros executando assentamento de blocos cerâmicos e de concreto com colher de pedreiro e fio de prumo.",
    benchmarkPrecoM2: 450,
    velocidadeTier: "Média",
    tags: ["Blocos Cerâmicos", "Chapisco", "Reboco", "Massa Única"]
  },
  // 8. TIJOLO ECOLÓGICO
  {
    id: "tijolo_ecologico",
    label: "Tijolo Ecológico",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    descricao: "Construção modular com tijolos de solo-cimento prensado intertravados com furos para graute e conduítes.",
    benchmarkPrecoM2: 600,
    velocidadeTier: "Média",
    tags: ["Solo-Cimento", "Sustentabilidade", "Modular", "Ecológico"]
  },
  // 9. ACABAMENTOS
  {
    id: "acabamentos",
    label: "Acabamentos",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80",
    descricao: "Assentamento de lastras de porcelanato, cortes em meia-esquadria 45º, nivelamento com cunhas e rejunte epóxi.",
    benchmarkPrecoM2: 950,
    velocidadeTier: "Alta Precisão",
    tags: ["Acabamento Fino", "Requadro", "Soleiras", "Ralos Ocultos"]
  },
  // 10. PINTURA
  {
    id: "pintura",
    label: "Pintura",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
    descricao: "Pintores profissionais aplicando massa corrida lixada com máquina orbital, primer e pintura acrílica fosca e aveludada.",
    benchmarkPrecoM2: 240,
    velocidadeTier: "Rápida",
    tags: ["Airless", "Cimento Queimado", "Massa Corrida", "Esmalte"]
  },
  // 11. GESSO
  {
    id: "gesso",
    label: "Gesso",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    descricao: "Aplicação manual de gesso liso de alto brilho, rebaixamento de teto, sancas invertidas e cortineiros com led.",
    benchmarkPrecoM2: 190,
    velocidadeTier: "Rápida",
    tags: ["Forro de Gesso", "Sancas", "Cortineiros", "Gesso Liso"]
  },
  // 12. DRYWALL
  {
    id: "drywall",
    label: "Drywall",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80",
    descricao: "Instalação de guias e montantes de aço galvanizado, fixação de chapas de gesso acartonado e tratamento de juntas com fita.",
    benchmarkPrecoM2: 260,
    velocidadeTier: "Rápida",
    tags: ["Placas de Gesso", "Isolamento Acústico", "Chapa RU", "Divisórias"]
  },
  // 13. DESIGN DE INTERIORES
  {
    id: "design_interiores",
    label: "Design de Interiores",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    descricao: "Seleção de mostruários de tecidos nobres, paletas cromáticas, mobiliário assinado e paginação tridimensional.",
    benchmarkPrecoM2: 380,
    velocidadeTier: "Alta Precisão",
    tags: ["Mobiliário", "Decoração", "Curadoria", "Iluminação"]
  },
  // 14. ARQUITETURA
  {
    id: "arquitetura",
    label: "Arquitetura",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    descricao: "Desenho arquitetônico na prancheta com escalímetro, maquetes de estudo e plantas executivas completas.",
    benchmarkPrecoM2: 450,
    velocidadeTier: "Alta Precisão",
    tags: ["Conceitual", "Executivo", "BIM 3D", "Condomínios"]
  },
  // 15. ENGENHARIA CIVIL
  {
    id: "engenharia_civil",
    label: "Engenharia Civil",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    descricao: "Engenheiro civil de capacete e prancheta conferindo alinhamento de fôrmas e especificações técnicas de canteiro.",
    benchmarkPrecoM2: 500,
    velocidadeTier: "Alta Precisão",
    tags: ["ART", "Direção Técnica", "Fiscalização", "Qualidade"]
  },
  // 16. ENGENHARIA ELÉTRICA
  {
    id: "engenharia_eletrica",
    label: "Engenharia Elétrica",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    descricao: "Engenheiro elétrico com multímetro e osciloscópio inspecionando quadros de distribuição QGBT e subestações.",
    benchmarkPrecoM2: 290,
    velocidadeTier: "Alta Precisão",
    tags: ["Subestações", "SPDA", "Quadros QGBT", "Dimensionamento"]
  },
  // 17. ENGENHARIA ESTRUTURAL
  {
    id: "engenharia_estrutural",
    label: "Engenharia Estrutural",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    descricao: "Cálculo analítico e simulação 3D de tensões, flechas e consumo de aço em vigas e pilares de concreto e metal.",
    benchmarkPrecoM2: 220,
    velocidadeTier: "Alta Precisão",
    tags: ["Cálculo Estrutural", "Vãos Livres", "Otimização de Aço", "BIM"]
  },
  // 18. ENGENHARIA HIDRÁULICA
  {
    id: "engenharia_hidraulica",
    label: "Engenharia Hidráulica",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
    descricao: "Dimensionamento de bombas de recalque, barriletes, redes de pressurização e esgoto sanitário predial.",
    benchmarkPrecoM2: 280,
    velocidadeTier: "Alta Precisão",
    tags: ["Pressurização", "Aquecimento", "Água de Chuva", "Drenagem"]
  },
  // 19. ELÉTRICA
  {
    id: "eletrica",
    label: "Elétrica",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    descricao: "Eletricista passando fiação de cobre em eletrodutos, crimpando terminais e conectando disjuntores bipolares.",
    benchmarkPrecoM2: 340,
    velocidadeTier: "Média",
    tags: ["Cabeamento", "Circuitos", "Tomadas EV", "Disjuntores"]
  },
  // 20. HIDRÁULICA
  {
    id: "hidraulica",
    label: "Hidráulica",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    descricao: "Encanador realizando termofusão em tubos PPR, montagem de registros de pressão e testes de estanqueidade.",
    benchmarkPrecoM2: 310,
    velocidadeTier: "Média",
    tags: ["Tubulação PPR", "Esgoto PVC", "Água Quente", "Registros"]
  },
  // 21. IMPERMEABILIZAÇÃO
  {
    id: "impermeabilizacao",
    label: "Impermeabilização",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    descricao: "Aplicação com maçarico de manta asfáltica aluminizada e membranas de poliuretano em lajes expostas e baldrames.",
    benchmarkPrecoM2: 290,
    velocidadeTier: "Alta Precisão",
    tags: ["Manta Asfáltica", "Poliuretano", "Teste de Estanqueidade"]
  },
  // 22. COBERTURA
  {
    id: "cobertura",
    label: "Cobertura",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80",
    descricao: "Montagem e soldagem de treliças metálicas, colocação de telhas termoacústicas sanduíche e calhas galvanizadas.",
    benchmarkPrecoM2: 410,
    velocidadeTier: "Média",
    tags: ["Telha Sanduíche", "Estrutura Metálica", "Calhas", "Rufos"]
  },
  // 23. TELHADO
  {
    id: "telhado",
    label: "Telhado",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    descricao: "Montagem de caibros e ripas de madeira tratada com assentamento alinhado de telhas cerâmicas e de concreto.",
    benchmarkPrecoM2: 380,
    velocidadeTier: "Média",
    tags: ["Telhado Colonial", "Telha Concreto", "Madeiramento", "Cumeeiras"]
  },
  // 24. ESQUADRIAS
  {
    id: "esquadrias",
    label: "Esquadrias",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1200&q=80",
    descricao: "Fabricação e fixação no vão de esquadrias de alumínio preto fosco linha Gold com trilhos embutidos no piso.",
    benchmarkPrecoM2: 780,
    velocidadeTier: "Média",
    tags: ["Alumínio Gold", "Portas de Correr", "Persianas Integradas"]
  },
  // 25. VIDRAÇARIA
  {
    id: "vidracaria",
    label: "Vidraçaria",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    descricao: "Instalação de painéis de vidro temperado e laminado com ventosas profissionais em guarda-corpos e peles de vidro.",
    benchmarkPrecoM2: 650,
    velocidadeTier: "Média",
    tags: ["Pele de Vidro", "Guarda-Corpo", "Vidro Laminado", "Espelhos"]
  },
  // 26. REVESTIMENTOS
  {
    id: "revestimentos",
    label: "Revestimentos",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    descricao: "Azulejistas aplicando argamassa colante AC-III com desempenadeira dentada em paredes de cozinhas e banheiros.",
    benchmarkPrecoM2: 360,
    velocidadeTier: "Média",
    tags: ["Azulejos", "Pastilhas", "Pedras Naturais", "Revestimento 3D"]
  },
  // 27. PISOS
  {
    id: "pisos",
    label: "Pisos",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80",
    descricao: "Instalação de pisos vinílicos colados, tábuas de madeira maciça e porcelanatos de grandes formatos polidos.",
    benchmarkPrecoM2: 390,
    velocidadeTier: "Rápida",
    tags: ["Porcelanato", "Piso Vinílico", "Madeira Maciça", "Epóxi"]
  },
  // 28. MARCENARIA
  {
    id: "marcenaria",
    label: "Marcenaria",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    descricao: "Marceneiros cortando chapas de MDF com serra esquadrejadeira e montando armários planejados com amortecedores.",
    benchmarkPrecoM2: 1100,
    velocidadeTier: "Alta Precisão",
    tags: ["MDF Nobre", "Armários Planejados", "Painéis Ripados", "Ferragens Blum"]
  },
  // 29. MARMORARIA
  {
    id: "marmoraria",
    label: "Marmoraria",
    grupo: "Acabamentos & Interiores",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    descricao: "Corte diamantado de chapas de mármore e quartzito com polimento de bordas bisotadas e cubas esculpidas.",
    benchmarkPrecoM2: 890,
    velocidadeTier: "Alta Precisão",
    tags: ["Mármore Calacatta", "Quartzito", "Bancadas", "Ilhas Gourmet"]
  },
  // 30. SERRALHERIA
  {
    id: "serralheria",
    label: "Serralheria",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    descricao: "Serralheiro soldando perfis de aço com solda MIG/TIG e máscara fotocromática para escadas plissadas e portões.",
    benchmarkPrecoM2: 550,
    velocidadeTier: "Média",
    tags: ["Solda MIG/TIG", "Portões Automáticos", "Escadas Metálicas", "Grades"]
  },
  // 31. CLIMATIZAÇÃO
  {
    id: "climatizacao",
    label: "Climatização",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    descricao: "Instalação de linhas frigorígenas de cobre isoladas, dreno embutido e condensadoras de sistema central VRF.",
    benchmarkPrecoM2: 420,
    velocidadeTier: "Média",
    tags: ["Sistema VRF", "Ar Central", "Dutos de Ar", "Inverter"]
  },
  // 32. AUTOMAÇÃO
  {
    id: "automacao",
    label: "Automação",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    descricao: "Técnico programando painel touch de automação para controle de cenas de luz, persianas e som ambiente.",
    benchmarkPrecoM2: 350,
    velocidadeTier: "Alta Precisão",
    tags: ["Smart Home", "Cenas de Luz", "Áudio Multiroom", "Touch Screen"]
  },
  // 33. ENERGIA SOLAR
  {
    id: "energia_solar",
    label: "Energia Solar",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    descricao: "Montadores fixando módulos fotovoltaicos monocristalinos nos trilhos de alumínio do telhado com microinversores.",
    benchmarkPrecoM2: 480,
    velocidadeTier: "Rápida",
    tags: ["Placas Solares", "Inversores", "On-Grid", "Economia de Energia"]
  },
  // 34. PISCINAS
  {
    id: "piscinas",
    label: "Piscinas",
    grupo: "Áreas Externas & Especiais",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    descricao: "Armação em dupla malha de aço, concretagem de fundo e paredes com concreto projetado e revestimento em pedra hijau.",
    benchmarkPrecoM2: 1350,
    velocidadeTier: "Média",
    tags: ["Borda Infinita", "Pedra Hijau", "Piscina Aquecida", "SPA"]
  },
  // 35. REFORMAS
  {
    id: "reformas",
    label: "Reformas",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    descricao: "Equipe multidisciplinar executando demolição de paredes, abertura de vãos integrados e renovação completa.",
    benchmarkPrecoM2: 850,
    velocidadeTier: "Média",
    tags: ["Retrofit", "Reformas Residenciais", "Ampliação", "Modernização"]
  },
  // 36. DEMOLIÇÃO
  {
    id: "demolicao",
    label: "Demolição",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1200&q=80",
    descricao: "Operador de retroescavadeira com rompedor hidráulico demolindo alvenaria e estruturas antigas com remoção controlada.",
    benchmarkPrecoM2: 120,
    velocidadeTier: "Rápida",
    tags: ["Rompedor Hidráulico", "Bota-Fora", "Demolição Mecanizada", "Segurança"]
  },
  // 37. GERENCIAMENTO DE OBRAS
  {
    id: "gerenciamento_obras",
    label: "Gerenciamento de Obras",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    descricao: "Gestor técnico de obra em campo realizando controle de medições, estoque de materiais e alinhamento de empreiteiros.",
    benchmarkPrecoM2: 320,
    velocidadeTier: "Alta Precisão",
    tags: ["Fiscalização", "Controle de Medição", "Gestão de Empreiteiros", "Qualidade"]
  },
  // 38. PLANEJAMENTO DE OBRAS
  {
    id: "planejamento_obras",
    label: "Planejamento de Obras",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    descricao: "Elaboração de cronograma Gantt no MS Project com caminho crítico (EAP/WBS) e curvas de avanço físico de obra.",
    benchmarkPrecoM2: 150,
    velocidadeTier: "Alta Precisão",
    tags: ["Cronograma Físico", "Caminho Crítico", "Curva S", "MS Project"]
  },
  // 39. ORÇAMENTO DE OBRAS
  {
    id: "orcamento_obras",
    label: "Orçamento de Obras",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    descricao: "Levantamento detalhado de quantitativos com base em projetos executivos, cotações de insumos e BDI analítico.",
    benchmarkPrecoM2: 110,
    velocidadeTier: "Alta Precisão",
    tags: ["Planilha Orçamentária", "BDI", "Composição de Custos", "Quantitativos"]
  },
  // 40. PROJETOS
  {
    id: "projetos",
    label: "Projetos",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    descricao: "Conjunto completo de pranchas arquitetônicas, estruturais e complementares abertas na mesa de reunião para análise.",
    benchmarkPrecoM2: 490,
    velocidadeTier: "Alta Precisão",
    tags: ["Projetos Complementares", "Compatibilização", "Detalhamento", "Plantas"]
  },
  // 41. REGULARIZAÇÃO DE OBRAS
  {
    id: "regularizacao_obras",
    label: "Regularização de Obras",
    grupo: "Planejamento & Projetos",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    descricao: "Trâmites junto à Prefeitura municipal, obtenção de Alvará de Construção, CND da Receita Federal e Habite-se final.",
    benchmarkPrecoM2: 130,
    velocidadeTier: "Média",
    tags: ["Habite-se", "Alvará Prefeitura", "CND Receita", "Aprovação"]
  },
  // 42. CONSTRUÇÃO MODULAR
  {
    id: "construcao_modular",
    label: "Construção Modular",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    descricao: "Módulos volumétricos tridimensionais fabricados em indústria e acoplados no terreno por guindaste em dias.",
    benchmarkPrecoM2: 1750,
    velocidadeTier: "Rápida",
    tags: ["Módulos Volumétricos", "Offsite", "Velocidade Recorde"]
  },
  // 43. PRÉ-FABRICADOS
  {
    id: "pre_fabricados",
    label: "Pré-fabricados",
    grupo: "Estrutura & Construção",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    descricao: "Içamento e encaixe de pilares, vigas e lajes alveolares pré-moldadas de concreto protendido de alta densidade.",
    benchmarkPrecoM2: 980,
    velocidadeTier: "Rápida",
    tags: ["Pré-Moldados", "Guindaste", "Concreto Protendido"]
  },
  // 44. SEGURANÇA ELETRÔNICA
  {
    id: "seguranca_eletronica",
    label: "Segurança Eletrônica",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    descricao: "Técnico instalando câmeras IP 4K dome, sensores infravermelhos perimétricos e centrais de controle de acesso.",
    benchmarkPrecoM2: 210,
    velocidadeTier: "Rápida",
    tags: ["Câmeras IA", "Reconhecimento Facial", "CFTV 4K", "Perímetro"]
  },
  // 45. PREVENÇÃO E COMBATE A INCÊNDIO
  {
    id: "combate_incendio",
    label: "Prevenção e Combate a Incêndio",
    grupo: "Instalações & Engenharia",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    descricao: "Tubulação de ferro ranhurado vermelha, bicos de sprinkler automáticos, hidrantes e emissão de AVCB do Corpo de Bombeiros.",
    benchmarkPrecoM2: 195,
    velocidadeTier: "Alta Precisão",
    tags: ["Sprinklers", "AVCB Bombeiros", "Hidrantes", "Detectores"]
  }
]

export function getAreaById(id: string): AreaObra | undefined {
  return AREAS_OBRA.find(a => a.id.toLowerCase() === id.toLowerCase())
}
