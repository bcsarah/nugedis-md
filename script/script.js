/* @author bcsarah@script.js
 *
 * Arquivo JS principal do site.
 * Cada função configura uma parte específica da página.
 */

"use strict";

/* ===== NAVEGAÇÃO ===== */
function configurarNavegacao() {
    const links = document.querySelectorAll("nav a");

    links.forEach((link) => {
        link.addEventListener("click", (evento) => {
            const destino = document.querySelector(link.getAttribute("href"));

            if (!destino) {
                return;
            }

            evento.preventDefault();
            destino.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });
}

/* ===== LOADING ===== */
function configurarLoading() {
    const loading = document.getElementById("loading");

    if (!loading) {
        return;
    }

    function esconderLoading() {
        loading.classList.add("esconder");

        // Remove a tela após a transição, sem manter o elemento sobre a página.
        loading.addEventListener("transitionend", () => {
            loading.remove();
        }, { once: true });
    }

    if (document.readyState === "complete") {
        esconderLoading();
    } else {
        window.addEventListener("load", esconderLoading, { once: true });
    }
}

/* ===== BOTÃO VOLTAR AO TOPO ===== */
function configurarBotaoTopo() {
    const botao = document.getElementById("btnTopo");

    if (!botao) {
        return;
    }

    function atualizarBotao() {
        botao.classList.toggle("visivel", window.scrollY > 300);
    }

    window.addEventListener("scroll", atualizarBotao, { passive: true });

    botao.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    atualizarBotao();
}

/* ===== MODO ESCURO ===== */
function configurarModoEscuro() {
    const botao = document.getElementById("darkModeToggle");

    if (!botao) {
        return;
    }

    function aplicarModoEscuro(ativado) {
        document.body.classList.toggle("dark-mode", ativado);
        botao.textContent = ativado ? "☀️" : "🌙";
        botao.setAttribute(
            "aria-label",
            ativado ? "Ativar modo claro" : "Ativar modo escuro"
        );
        botao.setAttribute("aria-pressed", String(ativado));
    }

    let modoSalvo = "disabled";

    try {
        modoSalvo = localStorage.getItem("darkMode") || "disabled";
    } catch (erro) {
        // O site continua funcionando mesmo se o navegador bloquear o localStorage.
    }

    aplicarModoEscuro(modoSalvo === "enabled");

    botao.addEventListener("click", () => {
        const ativado = !document.body.classList.contains("dark-mode");

        aplicarModoEscuro(ativado);

        try {
            localStorage.setItem("darkMode", ativado ? "enabled" : "disabled");
        } catch (erro) {
            // A preferência não será salva, mas o tema muda normalmente.
        }
    });
}

/* ===== BARRA LATERAL ===== */
function configurarBarraLateral() {
    const aside = document.querySelector("main aside");
    const botao = document.getElementById("sidebarToggle");
    const textoBotao = botao?.querySelector(".toggle-text");

    if (!aside || !botao || !textoBotao) {
        return;
    }

    function atualizarEstado() {
        const fechado = aside.classList.contains("fechado");

        textoBotao.textContent = fechado ? "Abrir" : "Fechar";
        botao.setAttribute("aria-expanded", String(!fechado));
    }

    // A barra começa fechada, como na versão anterior do site.
    aside.classList.add("fechado");
    atualizarEstado();

    botao.addEventListener("click", () => {
        aside.classList.toggle("fechado");
        atualizarEstado();
    });
}

/* ===== INICIALIZAÇÃO ===== */
document.addEventListener("DOMContentLoaded", () => {
    configurarNavegacao();
    configurarLoading();
    configurarBotaoTopo();
    configurarModoEscuro();
    configurarBarraLateral();
});
