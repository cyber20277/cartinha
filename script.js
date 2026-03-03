(function() {
  // elementos principais
  const hero = document.getElementById('hero');
  const fotos = document.getElementById('fotos');
  const carta = document.getElementById('carta');
  const pedido = document.getElementById('pedido');
  const final = document.getElementById('final');
  
  const btnSurpresa = document.getElementById('btnSurpresa');
  const btnProximo1 = document.getElementById('btnProximo1');
  const btnProximo2 = document.getElementById('btnProximo2');
  const btnSim = document.getElementById('btnSim');
  const btnNao = document.getElementById('btnNao');
  
  // audio (opcional)
  const musica = document.getElementById('musicaFundo');
  
  // função para mostrar seção e esconder outras
  function showSection(target) {
    [hero, fotos, carta, pedido, final].forEach(sec => sec.classList.add('hidden-section'));
    target.classList.remove('hidden-section');
    // rolar topo suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Botão SURPRESA: hero -> fotos
  btnSurpresa.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(fotos);
    // musica play (descomente se quiser)
    // musica.play().catch(()=>{});
  });
  
  btnProximo1.addEventListener('click', () => showSection(carta));
  btnProximo2.addEventListener('click', () => showSection(pedido));
  
  // BOTÃO SIM: animação de corações e vai pra final
  btnSim.addEventListener('click', (e) => {
    e.preventDefault();
    // explosão de corações
    for (let i = 0; i < 24; i++) {
      createHeart('explosionHearts', true);
    }
    // depois de 0.5s vai pra tela final e inicia corações contínuos
    setTimeout(() => {
      showSection(final);
      // encher de corações por um tempo
      for (let i = 0; i < 10; i++) {
        setTimeout(() => createHeart('finalHearts'), i * 200);
      }
      // loop a cada 1s
      if (window.heartInterval) clearInterval(window.heartInterval);
      window.heartInterval = setInterval(() => createHeart('finalHearts'), 600);
    }, 400);
  });

  // BOTÃO NÃO: comportamento fujão
  btnNao.addEventListener('mouseover', (e) => fugirBotao(e));
  btnNao.addEventListener('touchstart', (e) => {
    e.preventDefault();  // evitar clique duplo
    fugirBotao(e);
  });
  
  function fugirBotao(e) {
    const btn = btnNao;
    const parent = btn.parentElement;
    const maxX = parent.clientWidth - btn.clientWidth - 20;
    const maxY = parent.clientHeight - btn.clientHeight - 20;
    if (maxX < 10 || maxY < 10) return;  // sem espaço

    let novoX = Math.random() * maxX;
    let novoY = Math.random() * maxY;
    // deslocar relativo
    btn.style.position = 'relative';
    btn.style.left = novoX + 'px';
    btn.style.top = novoY + 'px';
    btn.classList.add('fugindo');
    setTimeout(() => btn.classList.remove('fugindo'), 300);
  }

  // também ao tentar clicar, foge (caso toque direto)
  btnNao.addEventListener('click', (e) => {
    e.preventDefault();
    fugirBotao(e);
  });

  // função para criar corações flutuantes
  function createHeart(containerId, randomPos = true) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
    heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
    heart.style.opacity = Math.random() * 0.6 + 0.3;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }

  // corações iniciais no hero (ambiente)
  setInterval(() => {
    if (!hero.classList.contains('hidden-section')) {
      createHeart('herosHearts');
    }
  }, 800);

  // opcional: prevenir menu contexto em botoes (celular)
  window.addEventListener('contextmenu', e => e.preventDefault());

  // iniciar com hero apenas
  showSection(hero);

  // botões grandes e sem zoom indesejado
  const allBtns = document.querySelectorAll('.btn');
  allBtns.forEach(btn => {
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();  // evita zoom duplo
    }, { passive: false });
  });

})();