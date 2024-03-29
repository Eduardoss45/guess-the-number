// Gerar um número aleatório entre 1 e 100
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;

// Referenciar elementos HTML
let historicoPalpites = document.querySelector("#palpites");
let nivelQuenteFrio = document.querySelector("#nivelQuenteFrio");
let botaoEnviar = document.querySelector("#enviarPalpite");
let campoPalpite = document.querySelector("#campoPalpite");
let contagemPalpites = 1;
let botaoReinicio;

// Conjunto para armazenar palpites únicos
let palpitesUnicos = new Set();

// Função para verificar o palpite do usuário
function verificarPalpite() {
  // Obter o palpite do usuário do campo de entrada
  let palpiteUsuario = Number(campoPalpite.value);

  // Verificar se o palpite está dentro do intervalo permitido
  if (isNaN(palpiteUsuario) || palpiteUsuario < 1 || palpiteUsuario > 100) {
    alert("Por favor, insira um número entre 1 e 100.");
    campoPalpite.value = "";  // Limpar o campo
    campoPalpite.focus();     // Focar no campo para a próxima entrada
    return;
  }

  // Verificar se o palpite já foi feito
  if (palpitesUnicos.has(palpiteUsuario)) {
    alert("Você já fez esse palpite. Tente um número diferente.");
    campoPalpite.value = "";  // Limpar o campo
    campoPalpite.focus();     // Focar no campo para a próxima entrada
    return;
  }

  // Adicionar o palpite ao conjunto de palpites únicos
  palpitesUnicos.add(palpiteUsuario);

  // Atualizar histórico de palpites
  if (palpiteUsuario === 1) {
    historicoPalpites.textContent = "Palpites anteriores: ";
  }
  historicoPalpites.textContent += palpiteUsuario + " ";

  // Verificar se o palpite está correto
  if (palpiteUsuario === numeroAleatorio) {
    // Se o palpite estiver correto, configurar o final do jogo e exibir mensagem de vitória
    nivelQuenteFrio.style.background = "black";
    configFimDeJogo();
    alert(`Parabéns! Você acertou o número em ${contagemPalpites} palpites. O número era ${numeroAleatorio}.`);
    return;  // Evitar a execução do restante do código
  } else if (contagemPalpites === 10) {
    // Se atingir o limite de palpites, terminar o jogo
    nivelQuenteFrio.style.background = "red";
    configFimDeJogo();
  } else {
    // Dar feedback ao usuário com base no palpite
    if (palpiteUsuario < numeroAleatorio) {
      nivelQuenteFrio.style.background = "green";
    } else if (palpiteUsuario > numeroAleatorio) {
      nivelQuenteFrio.style.background = "yellow";
    }
  }

  // Atualizar contagem de palpites
  contagemPalpites++;

  // Limpar campo de palpite e focar nele para a próxima entrada
  campoPalpite.value = "";
  campoPalpite.focus();
}

// Adicionar evento de clique ao botão de envio de palpite
botaoEnviar.addEventListener("click", verificarPalpite);

// Função para configurar o final do jogo
function configFimDeJogo() {
  // Desabilitar campos de entrada
  campoPalpite.disabled = true;
  botaoEnviar.disabled = true;

  // Criar botão de reinício
  botaoReinicio = document.createElement("button");
  botaoReinicio.id = "reiniciarJogo";  // Adiciona o ID para aplicar o estilo
  botaoReinicio.textContent = "Iniciar novo jogo";
  document.body.appendChild(botaoReinicio);

  // Adicionar evento de clique ao botão de reinício
  botaoReinicio.addEventListener("click", reiniciarJogo);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  // Habilitar campos de entrada e redefinir configurações
  campoPalpite.disabled = false;
  botaoEnviar.disabled = false;
  contagemPalpites = 1;
  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
  nivelQuenteFrio.style.background = "white";
  historicoPalpites.textContent = "";

  // Limpar conjunto de palpites únicos
  palpitesUnicos.clear();

  // Remover botão de reinício, se existir
  if (botaoReinicio) {
    document.body.removeChild(botaoReinicio);
    botaoReinicio = null;
  }

  // Limpar campo de palpite e focar nele para a próxima entrada
  campoPalpite.value = "";
  campoPalpite.focus();
}
