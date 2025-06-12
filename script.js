const imagens = [
  "carta1.png", "carta2.png", "carta3.png", "carta4.png",
  "carta5.png", "carta6.png", "carta7.png", "carta8.png",
  "carta9.png", "carta10.png", "carta11.png", "carta12.png"
];

const verso = "verso.png";

let paresEncontrados = 0;
let tentativas = 0;

const tabuleiro = document.getElementById("tabuleiro");
const paresSpan = document.getElementById("pares");
const tentativasSpan = document.getElementById("tentativas");

let cartaVirada = null;
let travado = false;

function carregarJogo() {
  tabuleiro.innerHTML = "";
  paresEncontrados = 0;
  tentativas = 0;
  atualizarPainel();

  const cartas = [...imagens, ...imagens].sort(() => Math.random() - 0.5);

  cartas.forEach((imagem) => {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.dataset.imagem = imagem;

    carta.innerHTML = `
      <img class="verso" src="imagens/${verso}" alt="Verso" />
      <img class="frente" src="imagens/${imagem}" alt="Frente" />
    `;

    carta.addEventListener("click", () => {
      if (travado || carta.classList.contains("virada")) return;

      carta.classList.add("virada");

      if (!cartaVirada) {
        cartaVirada = carta;
      } else {
        const segundaCarta = carta;
        tentativas++;
        atualizarPainel();

        if (cartaVirada.dataset.imagem === segundaCarta.dataset.imagem) {
          paresEncontrados++;
          atualizarPainel();
          cartaVirada = null;

          if (paresEncontrados === 12) {
            setTimeout(() => {
              alert("🎉 Parabéns! Você encontrou todos os pares!");
            }, 500);
          }
        } else {
          travado = true;
          setTimeout(() => {
            cartaVirada.classList.remove("virada");
            segundaCarta.classList.remove("virada");
            cartaVirada = null;
            travado = false;
          }, 1000);
        }
      }
    });

    tabuleiro.appendChild(carta);
  });
}

function atualizarPainel() {
  paresSpan.textContent = paresEncontrados;
  tentativasSpan.textContent = tentativas;
}

function reiniciarJogo() {
  cartaVirada = null;
  travado = false;
  carregarJogo();
}

carregarJogo();
