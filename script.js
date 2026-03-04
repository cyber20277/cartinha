(function() {
  // ===== ELEMENTOS PRINCIPAIS =====
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
  
  // ===== ELEMENTOS DE ÁUDIO =====
  const musica = document.getElementById('musicaFundo');
  const audioControl = document.getElementById('audio-control');
  const ativarAudio = document.getElementById('ativarAudio');
  
  // ===== CONFIGURAÇÃO INICIAL =====
  let musicaTocando = false;
  
  // Mostra apenas a seção hero inicialmente
  function showSection(target) {
    [hero, fotos, carta, pedido, final].forEach(sec => {
      sec.classList.add('hidden-section');
    });
    target.classList.remove('hidden-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  showSection(hero);
  
  // ===== CONFIGURAÇÃO DA MÚSICA =====
  if (musica) {
    musica.volume = 0.4;
    
    // Função para tocar música
    function playMusic() {
      if (!musicaTocando) {
        musica.play()
          .then(() => {
            musicaTocando = true;
            audioControl.style.display = 'none';
          })
          .catch(e => {
            console.log('Aguardando interação do usuário');
          });
      }
    }
    
    // Tenta tocar automaticamente (pode falhar no celular)
    playMusic();
    
    // Botão manual para ativar áudio
    if (ativarAudio) {
      ativarAudio.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        playMusic();
      });
      
      ativarAudio.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        playMusic();
      });
    }
    
    // Se clicar em qualquer lugar, tenta tocar (para navegadores que exigem interação)
    document.addEventListener('click', function initAudio() {
      playMusic();
      document.removeEventListener('click', initAudio);
    }, { once: true });
    
    document.addEventListener('touchstart', function initAudio() {
      playMusic();
      document.removeEventListener('touchstart', initAudio);
    }, { once: true });
  }
  
  // ===== FUNÇÕES DE NAVEGAÇÃO =====
  function handleNavigation(targetSection) {
    return function(e) {
      e.preventDefault();
      e.stopPropagation();
      showSection(targetSection);
    };
  }
  
  // ===== EVENTOS DE CLIQUE (com suporte a touch) =====
  btnSurpresa.addEventListener('click', handleNavigation(fotos));
  btnSurpresa.addEventListener('touchstart', handleNavigation(fotos));
  
  btnProximo1.addEventListener('click', handleNavigation(carta));
  btnProximo1.addEventListener('touchstart', handleNavigation(carta));
  
  btnProximo2.addEventListener('click', handleNavigation(pedido));
  btnProximo2.addEventListener('touchstart', handleNavigation(pedido));
  
  // ===== BOTÃO SIM =====
  function handleSim(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Explosão de corações
    for (let i = 0; i < 24; i++) {
      setTimeout(() => createHeart('explosionHearts'), i * 30);
    }
    
    // Vai para tela final
    setTimeout(() => {
      showSection(final);
      
      // Cria corações contínuos
      for (let i = 0; i < 10; i++) {
        setTimeout(() => createHeart('finalHearts'), i * 100);
      }
      
      // Loop de corações
      if (window.heartInterval) clearInterval(window.heartInterval);
      window.heartInterval = setInterval(() => createHeart('finalHearts'), 500);
    }, 400);
  }
  
  btnSim.addEventListener('click', handleSim);
  btnSim.addEventListener('touchstart', handleSim);
  
  // ===== BOTÃO NÃO (FUGÃO) =====
  function fugirBotao(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const btn = btnNao;
    const parent = btn.parentElement;
    const btnRect = btn.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    
    const maxX = parentRect.width - btnRect.width - 20;
    const maxY = parentRect.height - btnRect.height - 20;
    
    if (maxX < 10 || maxY < 10) return;
    
    const novoX = Math.random() * maxX;
    const novoY = Math.random() * maxY;
    
    btn.style.position = 'absolute';
    btn.style.left = novoX + 'px';
    btn.style.top = novoY + 'px';
    btn.style.transition = 'left 0.2s ease, top 0.2s ease';
    
    setTimeout(() => {
      btn.style.transition = '';
    }, 200);
  }
  
  btnNao.addEventListener('mouseover', fugirBotao);
  btnNao.addEventListener('touchstart', fugirBotao);
  btnNao.addEventListener('click', fugirBotao);
  
  // ===== FUNÇÃO PARA CRIAR CORAÇÕES =====
  function createHeart(containerId) {
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
  
  // ===== CORAÇÕES AMBIENTE NO HERO =====
  setInterval(() => {
    if (!hero.classList.contains('hidden-section')) {
      createHeart('herosHearts');
    }
  }, 800);
  
  // ===== PREVENIR ZOOM NOS BOTÕES =====
  const allBtns = document.querySelectorAll('.btn');
  allBtns.forEach(btn => {
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
    }, { passive: false });
  });
  
})();