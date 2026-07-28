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
        if (btnTopo) {
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

    // ===== SCROLL SUAVE PARA LINKS ÂNCORA =====
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

    if (welcomeBanner) {
        setTimeout(fecharWelcome, 6000);

        document.addEventListener('click', function(e) {
            if (welcomeBanner && !welcomeBanner.contains(e.target)) {
                fecharWelcome();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fecharWelcome();
            }
        });
    }

    // ===== ASIDE - TOGGLE PARA MOBILE =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarContent = document.getElementById('sidebarContent');
    let sidebarAberto = false;

    if (sidebarToggle && sidebarContent) {
        sidebarToggle.addEventListener('click', function() {
            sidebarAberto = !sidebarAberto;
            sidebarContent.classList.toggle('ativo');
            
            const toggleText = this.querySelector('.toggle-text');
            const toggleIcon = this.querySelector('.toggle-icon');
            
            if (toggleText) {
                toggleText.textContent = sidebarAberto ? 'Fechar' : 'Informações';
            }
            if (toggleIcon) {
                toggleIcon.textContent = sidebarAberto ? '✕' : '📌';
            }
        });

        document.addEventListener('click', function(e) {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 1024 && sidebar && !sidebar.contains(e.target)) {
                if (sidebarAberto) {
                    sidebarAberto = false;
                    sidebarContent.classList.remove('ativo');
                    
                    const toggleText = sidebarToggle.querySelector('.toggle-text');
                    const toggleIcon = sidebarToggle.querySelector('.toggle-icon');
                    if (toggleText) toggleText.textContent = 'Informações';
                    if (toggleIcon) toggleIcon.textContent = '📌';
                }
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebarAberto) {
                sidebarAberto = false;
                sidebarContent.classList.remove('ativo');
                
                const toggleText = sidebarToggle.querySelector('.toggle-text');
                const toggleIcon = sidebarToggle.querySelector('.toggle-icon');
                if (toggleText) toggleText.textContent = 'Informações';
                if (toggleIcon) toggleIcon.textContent = '📌';
            }
        });
    }

    // ===== VERIFICA TAMANHO DA TELA =====
    function verificarTamanhoTela() {
        if (window.innerWidth > 1024) {
            if (sidebarContent) {
                sidebarContent.classList.add('ativo');
                sidebarContent.style.display = 'block';
            }
            if (sidebarToggle) {
                sidebarToggle.style.display = 'none';
            }
        } else {
            if (sidebarContent && !sidebarAberto) {
                sidebarContent.classList.remove('ativo');
                sidebarContent.style.display = '';
            }
            if (sidebarToggle) {
                sidebarToggle.style.display = 'flex';
            }
        }
    }

    verificarTamanhoTela();
    window.addEventListener('resize', verificarTamanhoTela);

    // ===== LAZY LOADING PARA IMAGENS =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.loading = 'lazy';
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== LOG DE SUCESSO =====
    console.log('🚀 NUGEDIS Marechal - Site carregado com sucesso!');
    console.log('🏳️‍🌈 Respeito, diversidade e inclusão para todes!');

});
