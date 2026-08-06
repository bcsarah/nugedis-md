// ========================================
// DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', function() {

    // ===== BOTÕES DE NAVEGAÇÃO =====
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        });
    });

    // ===== TELA DE LOADING =====
    window.addEventListener('load', function() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(function() {
                loading.classList.add('esconder');
                setTimeout(function() {
                    loading.style.display = 'none';
                }, 800);
            }, 800);
        }
    });

    // ===== MODO ESCURO =====
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (darkModeToggle) {
        const darkModePreference = localStorage.getItem('darkMode');
        if (darkModePreference === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
        }

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                this.textContent = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                this.textContent = '🌙';
            }
        });
    }

    // ===== ASIDE - TOGGLE =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarContent = document.getElementById('sidebarContent');
    let sidebarAberto = true;

    if (sidebarToggle && sidebarContent) {
        // Estado inicial: aberto em desktop, fechado em mobile
        function definirEstadoInicial() {
            sidebarContent.style.display = 'none';
            sidebarAberto = false;
            sidebarToggle.querySelector('.toggle-text').textContent = 'Abrir';
        }

        // Evento de clique no toggle
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            sidebarAberto = !sidebarAberto;
            
            if (sidebarAberto) {
                sidebarContent.style.display = 'block';
                this.querySelector('.toggle-text').textContent = 'Fechar';
            } else {
                sidebarContent.style.display = 'none';
                this.querySelector('.toggle-text').textContent = 'Abrir';
            }
        });

        // Fecha ao clicar fora
        document.addEventListener('click', function(e) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
                if (sidebarAberto) {
                    sidebarAberto = false;
                    sidebarContent.style.display = 'none';
                    const toggleText = sidebarToggle.querySelector('.toggle-text');
                    if (toggleText) toggleText.textContent = 'Abrir';
                }
            }
        });

        // Fecha ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebarAberto) {
                sidebarAberto = false;
                sidebarContent.style.display = 'none';
                const toggleText = sidebarToggle.querySelector('.toggle-text');
                if (toggleText) toggleText.textContent = 'Abrir';
            }
        });

        definirEstadoInicial();

        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && !sidebarAberto) {
                sidebarAberto = true;
                sidebarContent.style.display = 'block';
                sidebarToggle.querySelector('.toggle-text').textContent = 'Fechar';
            }
        });
    }

    // ===== LOG DE SUCESSO =====
    console.log('🚀 NUGEDIS Marechal - Site carregado com sucesso!');
    console.log('🏳️‍🌈 Respeito, diversidade e inclusão para todes!');

});