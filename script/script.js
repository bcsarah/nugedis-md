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

    // ===== BOTÃO VOLTAR AO TOPO =====
    const btnTopo = document.getElementById('btnTopo');

    function toggleTopButton() {
        if (window.scrollY > 300) {
            btnTopo.style.display = 'flex';
            btnTopo.style.opacity = '0';
            btnTopo.style.transform = 'scale(0.8)';
            setTimeout(() => {
                btnTopo.style.opacity = '1';
                btnTopo.style.transform = 'scale(1)';
            }, 50);
        } else {
            btnTopo.style.display = 'none';
        }
    }

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(toggleTopButton);
    });

    if (btnTopo) {
        btnTopo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
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

    // ===== MELHORIAS DE PERFORMANCE =====

    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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

    // ===== BANNER DE BOAS-VINDAS =====
    const welcomeBanner = document.getElementById('welcomeBanner');
    
    function fecharWelcome() {
        if (welcomeBanner) {
            welcomeBanner.style.animation = 'welcomeSlideUp 0.4s ease forwards';
            setTimeout(() => {
                welcomeBanner.style.display = 'none';
            }, 400);
        }
    }

    // Fecha automaticamente após 6 segundos
    if (welcomeBanner) {
        setTimeout(fecharWelcome, 6000);

        // Fecha ao clicar fora do banner
        document.addEventListener('click', function(e) {
            if (welcomeBanner && !welcomeBanner.contains(e.target)) {
                fecharWelcome();
            }
        });

        // Fecha ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fecharWelcome();
            }
        });
    }

    // ===== LOG DE SUCESSO =====
    console.log('🚀 NUGEDIS Marechal - Site carregado com sucesso!');
    console.log('🏳️‍🌈 Respeito, diversidade e inclusão para todes!');

}); // FECHA O DOMContentLoaded
