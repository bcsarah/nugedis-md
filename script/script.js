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
const aside = document.querySelector('aside');
let asideAberto = false;

if (sidebarToggle && aside) {
    // Estado inicial: fechado
    aside.classList.add('fechado');
    sidebarToggle.querySelector('.toggle-text').textContent = 'Abrir';

    // Evento de clique no toggle
    sidebarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        asideAberto = !asideAberto;
        aside.classList.toggle('fechado');
        
        if (asideAberto) {
            this.querySelector('.toggle-text').textContent = 'Fechar';
        } else {
            this.querySelector('.toggle-text').textContent = 'Abrir';
        }
    });

    // Função para ler arquivos dentro de DATA
    async function carregarArquivo(elemento) {
        const nomeArquivo = elemento.dataset.arquivo; // Pega o nome do data-arquivo
        
        try {
            const resposta = await fetch(`data/${nomeArquivo}`);
            const texto = await resposta.text();
            elemento.innerHTML = texto.replace(/\n/g, '<br>');
        } catch (erro) {
            elemento.textContent = `Erro ao carregar ${nomeArquivo}.`;
        }
    }

    // CARREGA TODOS OS <p> COM data-arquivo
    document.querySelectorAll('.textoArquivo').forEach(carregarArquivo);
}

    // ===== LOG DE SUCESSO =====
    console.log('🚀 NUGEDIS Marechal - Site carregado com sucesso!');
    console.log('🏳️‍🌈 Respeito, diversidade e inclusão para todes!');

});
