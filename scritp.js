
if (!localStorage.getItem("usuarios")) {
    const usuariosPadrao = [
        { usuario: "admin", senha: "1234" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosPadrao));
}

window.onload = carregarLogs;


function mostrarLogin() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("cadastroBox").style.display = "none";
}

function mostrarCadastro() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("cadastroBox").style.display = "block";
}


function cadastrar() {
    const usuario = document.getElementById("cadUser").value.trim();
    const senha = document.getElementById("cadPass").value.trim();
    const msg = document.getElementById("mensagem");

    if (!usuario || !senha) {
        msg.innerText = "Preencha todos os campos!";
        msg.style.color = "red";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        msg.innerText = "Usuário já existe!";
        msg.style.color = "orange";
        return;
    }

    usuarios.push({ usuario, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    msg.innerText = "Cadastro realizado!";
    msg.style.color = "green";

    registrarLog(usuario, "Cadastro realizado");
}


function fazerLogin() {
    const usuario = document.getElementById("loginUser").value.trim();
    const senha = document.getElementById("loginPass").value.trim();
    const msg = document.getElementById("mensagem");

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const user = usuarios.find(u => u.usuario === usuario);

    if (!user) {
        msg.innerText = "Usuário não encontrado!";
        msg.style.color = "red";
        registrarLog(usuario, "Usuário não encontrado");
        return;
    }

    if (user.senha !== senha) {
        msg.innerText = "Senha incorreta!";
        msg.style.color = "orange";
        registrarLog(usuario, "Senha incorreta");
        return;
    }

    msg.innerText = "Login bem-sucedido!";
    msg.style.color = "green";
    registrarLog(usuario, "Login OK");
}


function registrarLog(usuario, acao) {
    const data = new Date().toLocaleString();
    const log = `${data} | ${usuario} | ${acao}`;

    console.log(log);

    let logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.unshift(log);
    localStorage.setItem("logs", JSON.stringify(logs));

    carregarLogs();
}

function carregarLogs() {
    const lista = document.getElementById("logList");
    lista.innerHTML = "";

    let logs = JSON.parse(localStorage.getItem("logs")) || [];

    logs.slice(0, 5).forEach(l => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = l;
        lista.appendChild(li);
    });
}