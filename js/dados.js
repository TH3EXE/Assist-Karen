// --- PRODUTOS PARA VITRINE (KAREN SYSTEM) ---
const bancoVitrine = [
    // === TATUAGENS ===
    { 
        id: 1, tipo: 'tattoo', titulo: 'Tigre Realista', 
        img: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=500&q=80', 
        preco: 1200, promo: 950, desc: "Sessão de realismo, preto e cinza." 
    },
    { 
        id: 2, tipo: 'tattoo', titulo: 'Dragão Oriental', 
        img: 'https://images.unsplash.com/photo-1590246756012-154b9f750d19?auto=format&fit=crop&w=500&q=80', 
        preco: 2500, promo: null, desc: "Fechamento de costas ou braço." 
    },
    { 
        id: 3, tipo: 'tattoo', titulo: 'Rosa Minimalista', 
        img: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=500&q=80', 
        preco: 350, promo: 300, desc: "Traços finos (Fineline)." 
    },
    { 
        id: 4, tipo: 'tattoo', titulo: 'Caveira Old School', 
        img: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=500&q=80', 
        preco: 600, promo: null, desc: "Cores sólidas e traço grosso." 
    },
    { 
        id: 5, tipo: 'tattoo', titulo: 'Geométrico Ponto', 
        img: 'https://images.unsplash.com/photo-1612459284970-e8f027596582?auto=format&fit=crop&w=500&q=80', 
        preco: 800, promo: 700, desc: "Pontilhismo e geometria sagrada." 
    },
    { 
        id: 6, tipo: 'tattoo', titulo: 'Lettering Gótico', 
        img: 'https://images.unsplash.com/photo-1582234032608-59c92257d07d?auto=format&fit=crop&w=500&q=80', 
        preco: 400, promo: null, desc: "Caligrafia personalizada." 
    },

    // === PIERCINGS ===
    { 
        id: 7, tipo: 'piercing', titulo: 'Septo Ferradura', 
        img: 'https://images.unsplash.com/photo-1626049665806-3b7c80527376?auto=format&fit=crop&w=500&q=80', 
        preco: 90, promo: 75, desc: "Aço cirúrgico 316L básico." 
    },
    { 
        id: 8, tipo: 'piercing', titulo: 'Umbigo Zircônia', 
        img: 'https://images.unsplash.com/photo-1605218427306-0296c2c53882?auto=format&fit=crop&w=500&q=80', 
        preco: 120, promo: null, desc: "Pedra brilhante dupla." 
    },
    { 
        id: 9, tipo: 'piercing', titulo: 'Alargador Madeira', 
        img: 'https://images.unsplash.com/photo-1576504677634-06b2130bd1f3?auto=format&fit=crop&w=500&q=80', 
        preco: 50, promo: null, desc: "Par de alargadores 12mm." 
    },
    { 
        id: 10, tipo: 'piercing', titulo: 'Helix Argola Ouro', 
        img: 'https://images.unsplash.com/photo-1515524738708-327f6b0037a7?auto=format&fit=crop&w=500&q=80', 
        preco: 250, promo: 200, desc: "Banhado a ouro 18k." 
    },
    { 
        id: 11, tipo: 'piercing', titulo: 'Nostril Ponto de Luz', 
        img: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=500&q=80', 
        preco: 60, promo: null, desc: "Clássico pontinho de luz." 
    },
    { 
        id: 12, tipo: 'piercing', titulo: 'Industrial Transversal', 
        img: 'https://images.unsplash.com/photo-1628551403239-0d24497576a8?auto=format&fit=crop&w=500&q=80', 
        preco: 150, promo: 130, desc: "Haste transversal industrial." 
    }
];

// Agenda Inicial (Mantida)
const agendaInicial = [
    { id: 1, cliente: 'Cliente Teste 1', servico: 'Tatuagem', valor: 450, data: '2025-10-25T14:00', status: 'Concluido' },
    { id: 2, cliente: 'Cliente Teste 2', servico: 'Piercing', valor: 80, data: '2025-10-26T10:00', status: 'Pendente' }
];

const gastosInicial = [
    { id: 1, descricao: 'Materiais Descartáveis', valor: 150, data: '2025-10-01' }
];
