// script.js - Todas as interações do site NUGEDIS

// Aguarda o DOM carregar completamente antes de executar
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== BOTÃO "QUERO SABER MAIS" =====
    const saibaMaisBtn = document.getElementById('saibaMaisBtn');
    if (saibaMaisBtn) {
        saibaMaisBtn.addEventListener('click', function() {
            alert("📢 O NUGEDIS realiza acolhimento psicológico e social, campanhas educativas e formações. Entre em contato pelo Instagram para saber a programação mensal!");
        });
    }
    
    // ===== BOTÃO "AGENDAR VISITA / RECEBER INFORMAÇÕES" =====
    const agendarVisita = document.getElementById('agendarVisita');
    if (agendarVisita) {
        agendarVisita.addEventListener('click', function() {
            let resposta = confirm("Você será redirecionado para o Instagram do NUGEDIS para enviar uma mensagem. Deseja continuar?");
            if (resposta) {
                window.open("https://www.instagram.com/nugedis.marechal", "_blank");
            }
        });
    }
    
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
    
    // Ação de clique para voltar ao topo
    if (btnTopo) {
        btnTopo.addEventListener('click', function() {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }
    
    // ===== NAVEGAÇÃO SUAVE DO MENU =====
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // remove o #
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
    
    // ===== EXTRA: Efeito de boas-vindas no console (para desenvolvedores) =====
    console.log("🌈 NUGEDIS MD - Site carregado com sucesso! 🌈");
    console.log("📢 Acesse nossas redes: instagram.com/nugedis.marechal");
    
    // ===== EXTRA: Animação suave ao carregar os cards =====
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // delay progressivo
    });
    
});