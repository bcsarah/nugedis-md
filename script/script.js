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

    // Usando requestAnimationFrame para melhor performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(toggleTopButton);
    });

    // Clique para voltar ao topo
    if (btnTopo) {
        btnTopo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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
    }

    // ========================================
    // FUNÇÃO PARA LER ARQUIVOS DA PASTA DATA
    // ========================================
    
    /**
     * Função que carrega o conteúdo de um arquivo txt
     * @param {HTMLElement} elemento - O elemento que receberá o conteúdo
     */
    async function carregarArquivo(elemento) {
        const nomeArquivo = elemento.dataset.arquivo; // Pega o nome do data-arquivo
        
        // Verifica se tem nome do arquivo
        if (!nomeArquivo) {
            elemento.textContent = '⚠️ Nome do arquivo não especificado';
            return;
        }
        
        try {
            const resposta = await fetch(`data/${nomeArquivo}`);
            
            // Verifica se o arquivo existe
            if (!resposta.ok) {
                throw new Error(`Arquivo não encontrado: ${nomeArquivo}`);
            }
            
            const texto = await resposta.text();
            
            // Se o texto estiver vazio
            if (texto.trim() === '') {
                elemento.innerHTML = '📭 Arquivo vazio';
                return;
            }
            
            // Substitui quebras de linha por <br>
            elemento.innerHTML = texto.replace(/\n/g, '<br>');
            
        } catch (erro) {
            console.error(`Erro ao carregar ${nomeArquivo}:`, erro);
            elemento.innerHTML = `❌ Erro ao carregar <strong>${nomeArquivo}</strong>`;
        }
    }

    /**
     * Função para recarregar todos os arquivos
     */
    function recarregarTodosArquivos() {
        document.querySelectorAll('.textoArquivo').forEach(carregarArquivo);
        console.log('🔄 Arquivos recarregados!');
    }

    /**
     * Função para carregar um arquivo específico pelo ID
     * @param {string} id - ID do elemento
     * @param {string} nomeArquivo - Nome do arquivo (opcional)
     */
    async function carregarArquivoPorId(id, nomeArquivo = null) {
        const elemento = document.getElementById(id);
        if (!elemento) {
            console.error(`Elemento com ID "${id}" não encontrado`);
            return;
        }
        
        // Se não passou o nome do arquivo, usa o data-arquivo
        if (nomeArquivo) {
            elemento.dataset.arquivo = nomeArquivo;
        }
        
        await carregarArquivo(elemento);
    }

    // ===== CARREGA TODOS OS ARQUIVOS AO INICIAR =====
    recarregarTodosArquivos();

    // ===== EXPÕE FUNÇÕES GLOBAIS PARA USO NO HTML =====
    window.carregarArquivo = carregarArquivo;
    window.recarregarTodosArquivos = recarregarTodosArquivos;
    window.carregarArquivoPorId = carregarArquivoPorId;

    // ===== LOG DE SUCESSO =====
    console.log('🚀 NUGEDIS Marechal - Site carregado com sucesso!');
    console.log('📁 Leitor de arquivos ativo!');
    console.log('💡 Para carregar um arquivo, use: <p class="textoArquivo" data-arquivo="nome.txt"></p>');
    console.log('🏳️‍🌈 Respeito, diversidade e inclusão para todes!');

});