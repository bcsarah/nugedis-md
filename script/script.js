// Espera o DOM
document.addEventListener('DOMContentLoaded', function() {

    // ===== Botões de Navegação ao Topo (Sobre, Atividades etc) =====
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // remove o #
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

    // Mostrar/esconder botão conforme rolagem
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btnTopo.style.display = 'flex';
        } else {
            btnTopo.style.display = 'none';
        }
    });

    // Ação de clique para voltar ao topo com animação suave
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
            // Adiciona um pequeno delay para mostrar o loading (opcional)
            setTimeout(function() {
                loading.classList.add('esconder');
            }, 800);
        }
    });
});
