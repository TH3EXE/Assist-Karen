document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-top-container');
    if (!menuContainer) return;

    // Gera o HTML do Menu
    menuContainer.innerHTML = `
        <nav class="navbar-container">
            <div class="navbar-content">
                <div class="brand">KAREN SYSTEM</div>
                <ul class="nav-links">
                    <li><a href="tattoos.html" id="link-tattoo">🐉 Tattoos</a></li>
                    <li><a href="piercing.html" id="link-piercing">💍 Piercing</a></li>
                    <li><a href="mapa.html" id="link-mapa">📍 Mapa</a></li>
                    <li><a href="admin.html" id="link-admin" style="border:1px solid #4cd137; color:#4cd137;">⚙️ Admin</a></li>
                    <li><a href="#" onclick="logoutSistema()" class="logout-btn">Sair</a></li>
                </ul>
            </div>
        </nav>
    `;

    // Marca o link ativo
    const path = window.location.pathname;
    if (path.includes('tattoos')) document.getElementById('link-tattoo').classList.add('active');
    if (path.includes('piercing')) document.getElementById('link-piercing').classList.add('active');
    if (path.includes('mapa')) document.getElementById('link-mapa').classList.add('active');
    if (path.includes('admin')) document.getElementById('link-admin').classList.add('active');
});

function logoutSistema() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '../index.html';
}