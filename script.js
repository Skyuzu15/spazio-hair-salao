/* Navegação mobile */
const botaoMenu = document.querySelector("#menu-hamburguer");
const menu = document.querySelector("#nav-principal");

function fecharMenu() {
    menu.classList.remove("ativo");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", () => {
    const aberto = botaoMenu.getAttribute("aria-expanded") !== "true";
    menu.classList.toggle("ativo", aberto);
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
        fecharMenu();
        botaoMenu.focus();
    }
});
window.matchMedia("(min-width: 769px)").addEventListener("change", fecharMenu);

/* O envio é encaminhado ao WhatsApp informado no site; o cliente confirma o envio no aplicativo. */
const formularioAgendamento = document.querySelector("#form-agendamento");
const inputNome = document.querySelector("#nome");
const erroNome = document.querySelector("#erro-nome");
const selectServico = document.querySelector("#servico-form");
const erroServico = document.querySelector("#erro-servico");
const inputTelefone = document.querySelector("#telefone");
const erroTelefone = document.querySelector("#erro-telefone");
const mensagemStatus = document.querySelector("#mensagem-sucesso");
const numeroWhatsApp = "5544999059523";

function definirErro(campo, elementoErro, texto) {
    elementoErro.textContent = texto;
    if (texto) campo.setAttribute("aria-invalid", "true");
    else campo.removeAttribute("aria-invalid");
}

formularioAgendamento.addEventListener("submit", (event) => {
    event.preventDefault();
    mensagemStatus.textContent = "";

    const nome = inputNome.value.trim();
    const servico = selectServico.value;
    const telefone = inputTelefone.value.replace(/\D/g, "");
    const nomeValido = nome.length > 0;
    const servicoValido = servico !== "";
    const telefoneValido = telefone.length === 10 || telefone.length === 11;

    definirErro(inputNome, erroNome, nomeValido ? "" : "Digite seu nome.");
    definirErro(selectServico, erroServico, servicoValido ? "" : "Selecione um serviço.");
    definirErro(inputTelefone, erroTelefone, telefoneValido ? "" : "Digite um telefone com DDD (10 ou 11 dígitos).");

    if (!nomeValido || !servicoValido || !telefoneValido) {
        const primeiroInvalido = [inputNome, inputTelefone, selectServico].find((campo) => campo.getAttribute("aria-invalid") === "true");
        primeiroInvalido.focus();
        return;
    }

    const texto = `Olá! Gostaria de consultar um horário.\nNome: ${nome}\nTelefone: ${inputTelefone.value}\nServiço: ${servico}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    const janelaWhatsApp = window.open("about:blank", "_blank");
    if (!janelaWhatsApp) {
        mensagemStatus.textContent = "O navegador bloqueou a abertura do WhatsApp. Permita pop-ups para este site e tente novamente.";
        return;
    }
    janelaWhatsApp.opener = null;
    janelaWhatsApp.location.href = url;
    mensagemStatus.textContent = "O WhatsApp foi aberto com a mensagem preenchida. Revise e toque em Enviar no WhatsApp para encaminhar sua solicitação.";
});

inputTelefone.addEventListener("input", () => {
    const numeros = inputTelefone.value.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 2) inputTelefone.value = numeros ? `(${numeros}` : "";
    else if (numeros.length <= 6) inputTelefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    else if (numeros.length <= 10) inputTelefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    else inputTelefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    if (numeros.length === 10 || numeros.length === 11) definirErro(inputTelefone, erroTelefone, "");
    mensagemStatus.textContent = "";
});

inputNome.addEventListener("input", () => {
    if (inputNome.value.trim()) definirErro(inputNome, erroNome, "");
    mensagemStatus.textContent = "";
});
selectServico.addEventListener("change", () => {
    if (selectServico.value) definirErro(selectServico, erroServico, "");
    mensagemStatus.textContent = "";
});

document.querySelectorAll(".btn-servico").forEach((botao) => {
    botao.addEventListener("click", () => {
        selectServico.value = botao.dataset.servico;
        definirErro(selectServico, erroServico, "");
    });
});
