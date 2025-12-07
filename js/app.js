// --- VERIFICAÇÃO DE LOGIN ---
document.addEventListener('DOMContentLoaded', () => {
    const isLogado = localStorage.getItem('usuarioLogado');
    const isLoginPage = document.getElementById('login-box');

    if (!isLogado && !isLoginPage) window.location.href = '../index.html';
    
    // Roteador de funções
    if (document.getElementById('gallery-container')) renderizarVitrine();
    if (document.getElementById('admin-dashboard')) initAdmin();
    if (document.getElementById('map-container')) initMapReal();
});

function login() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if (u === 'Karen' && p === 'admin') {
        localStorage.setItem('usuarioLogado', 'true');
        window.location.href = 'pages/admin.html';
    } else {
        alert('Credenciais inválidas!');
    }
}

// --- VITRINE ---
function renderizarVitrine() {
    const container = document.getElementById('gallery-container');
    const tipo = container.getAttribute('data-tipo');
    const itens = bancoVitrine.filter(i => i.tipo === tipo);

    itens.forEach(item => {
        let preco = `<h3>R$ ${item.preco}</h3>`;
        let promo = '';
        if (item.promo) {
            const desc = Math.round(((item.preco - item.promo) / item.preco) * 100);
            promo = `<span class="promo-badge">-${desc}% OFF</span>`;
            preco = `<span style="text-decoration:line-through; color:#777">R$ ${item.preco}</span> <h3 style="color:var(--success)">R$ ${item.promo}</h3>`;
        }
        container.innerHTML += `
            <div class="gallery-item">
                ${promo}
                <div class="gallery-img" style="background-image: url('${item.img}')"></div>
                <div class="gallery-info">
                    <h4>${item.titulo}</h4>
                    <div style="margin-top:10px">${preco}</div>
                </div>
            </div>
        `;
    });
}

// --- MAPA REAL ---
function initMapReal() {
    const map = L.map('map-container').setView([-23.5505, -46.6333], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

    document.getElementById('map-status').innerText = '📡 Buscando sua localização...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            map.setView([latitude, longitude], 14);
            L.marker([latitude, longitude]).addTo(map).bindPopup("<b>Você está aqui</b>").openPopup();
            buscarEstudios(latitude, longitude, map);
            document.getElementById('map-status').innerText = '✅ Localização encontrada. Buscando estúdios...';
        }, () => {
            document.getElementById('map-status').innerText = '⚠️ GPS negado. Mostrando São Paulo.';
            buscarEstudios(-23.5505, -46.6333, map);
        });
    }
}

async function buscarEstudios(lat, lng, map) {
    const query = `[out:json];(node["shop"="tattoo"](around:5000, ${lat}, ${lng});way["shop"="tattoo"](around:5000, ${lat}, ${lng}););out center;`;
    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await res.json();
    
    const grid = document.getElementById('studios-grid');
    grid.innerHTML = '';

    if(data.elements.length === 0) grid.innerHTML = '<p>Nenhum estúdio encontrado nesta região.</p>';

    data.elements.forEach((local, idx) => {
        const latL = local.lat || local.center.lat;
        const lngL = local.lon || local.center.lon;
        const nome = local.tags.name || "Estúdio Sem Nome";
        L.marker([latL, lngL]).addTo(map).bindPopup(`<b>${nome}</b>`);
        
        grid.innerHTML += `
            <div class="card">
                <div class="gallery-img" style="height:150px; background-image:url('https://loremflickr.com/300/200/tattoo?lock=${idx}')"></div>
                <div style="padding:10px">
                    <h4>${nome}</h4>
                    <a href="https://maps.google.com/?q=${latL},${lngL}" target="_blank" class="btn full" style="margin-top:10px; font-size:0.8rem">Abrir GPS</a>
                </div>
            </div>
        `;
    });
}

// --- ADMIN (AGENDA & FINANCEIRO) ---
let agenda = JSON.parse(localStorage.getItem('agendaDB')) || agendaInicial;
let gastos = JSON.parse(localStorage.getItem('gastosDB')) || gastosInicial;
let chartInstance = null;

function initAdmin() {
    renderizarAgenda();
    renderizarFinanceiro();
    mudarAba('agenda');
}

function mudarAba(aba) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${aba}`).classList.remove('hidden');
    document.getElementById(`tab-${aba}`).classList.add('active');
    if(aba === 'financeiro') atualizarGrafico();
}

function renderizarAgenda() {
    const tbody = document.getElementById('agenda-body');
    tbody.innerHTML = '';
    agenda.forEach(item => {
        let badge = item.status === 'Concluido' ? 'st-concluido' : (item.status === 'Cancelado' ? 'st-cancelado' : 'st-pendente');
        tbody.innerHTML += `
            <tr>
                <td>${new Date(item.data).toLocaleDateString()} ${new Date(item.data).toLocaleTimeString().slice(0,5)}</td>
                <td>${item.cliente}<br><small>${item.servico}</small></td>
                <td>R$ ${item.valor}</td>
                <td><span class="badge ${badge}">${item.status}</span></td>
                <td>
                    <select onchange="mudarStatus(${item.id}, this.value)" style="margin:0; padding:5px; width:auto;">
                        <option value="" disabled selected>Ação</option>
                        <option value="Concluido">Concluir</option>
                        <option value="Cancelado">Cancelar</option>
                        <option value="Pendente">Pendente</option>
                    </select>
                </td>
            </tr>
        `;
    });
}

function mudarStatus(id, status) {
    const idx = agenda.findIndex(a => a.id === id);
    if(idx > -1) {
        agenda[idx].status = status;
        localStorage.setItem('agendaDB', JSON.stringify(agenda));
        renderizarAgenda();
        renderizarFinanceiro();
    }
}

function salvarNovo(e) {
    e.preventDefault();
    agenda.push({
        id: Date.now(),
        cliente: document.getElementById('cli').value,
        servico: document.getElementById('serv').value,
        valor: parseFloat(document.getElementById('val').value),
        data: document.getElementById('dat').value,
        status: 'Pendente'
    });
    localStorage.setItem('agendaDB', JSON.stringify(agenda));
    renderizarAgenda();
    toggleModal('modal-agenda');
    e.target.reset();
}

function salvarGasto(e) {
    e.preventDefault();
    gastos.push({
        id: Date.now(),
        descricao: document.getElementById('g-desc').value,
        valor: parseFloat(document.getElementById('g-val').value),
        data: document.getElementById('g-dat').value
    });
    localStorage.setItem('gastosDB', JSON.stringify(gastos));
    renderizarFinanceiro();
    atualizarGrafico();
    toggleModal('modal-gasto');
    e.target.reset();
}

function renderizarFinanceiro() {
    const entradas = agenda.filter(a => a.status === 'Concluido').reduce((acc, i) => acc + i.valor, 0);
    const saidas = gastos.reduce((acc, i) => acc + i.valor, 0);
    document.getElementById('kpi-entrada').innerText = `R$ ${entradas.toFixed(2)}`;
    document.getElementById('kpi-saida').innerText = `R$ ${saidas.toFixed(2)}`;
    document.getElementById('kpi-lucro').innerText = `R$ ${(entradas - saidas).toFixed(2)}`;
    
    const lista = document.getElementById('lista-gastos');
    lista.innerHTML = '';
    gastos.forEach(g => {
        lista.innerHTML += `<div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #333;"><span>${g.descricao}</span><span style="color:var(--danger)">- R$ ${g.valor}</span></div>`;
    });
}

function atualizarGrafico() {
    const ctx = document.getElementById('financeChart').getContext('2d');
    const entradas = agenda.filter(a => a.status === 'Concluido').reduce((acc, i) => acc + i.valor, 0);
    const saidas = gastos.reduce((acc, i) => acc + i.valor, 0);

    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Entrada', 'Saída'],
            datasets: [{ data: [entradas, saidas], backgroundColor: ['#2ecc71', '#e74c3c'], borderWidth: 0 }]
        },
        options: { plugins: { legend: { position: 'bottom', labels: { color: 'white' } } } }
    });
}

function toggleModal(id) { document.getElementById(id).classList.toggle('hidden'); }
