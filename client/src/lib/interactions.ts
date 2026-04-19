/**
 * Interactivity Module
 * Handles scroll reveal animations and copy-to-clipboard functionality
 */

export function initializeInteractions() {
  // 1. Animazione di apparizione al caricamento/scroll (Reveal Effect)
  const revealElements = document.querySelectorAll(
    '.card, .section-container, h1, h2, .reveal'
  );

  // Aggiungiamo la classe 'reveal' a tutti gli elementi che vogliamo animare
  revealElements.forEach((el) => el.classList.add('reveal'));

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Esegui subito per gli elementi già in vista

  // 2. Funzione per copiare il codice (se hai dei blocchi di codice)
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach((block) => {
    const button = document.createElement('button');
    button.innerText = 'Copia Codice';
    button.className = 'copy-button';
    button.style.cssText = `
      position: absolute;
      right: 10px;
      top: 10px;
      padding: 8px 12px;
      background: var(--accent, #00979D);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
      z-index: 10;
    `;

    block.style.position = 'relative';
    block.appendChild(button);

    // Hover effect
    button.addEventListener('mouseenter', () => {
      button.style.background = 'var(--accent-light, #60a5fa)';
      button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
      if (button.innerText === 'Copia Codice') {
        button.style.background = 'var(--accent, #00979D)';
        button.style.transform = 'scale(1)';
      }
    });

    button.addEventListener('click', async () => {
      try {
        const codeElement = block.querySelector('code');
        const code = codeElement ? codeElement.innerText : block.innerText;
        
        await navigator.clipboard.writeText(code);
        
        button.innerText = '✓ Copiato!';
        button.style.background = '#22c55e';
        
        setTimeout(() => {
          button.innerText = 'Copia Codice';
          button.style.background = 'var(--accent, #00979D)';
          button.style.transform = 'scale(1)';
        }, 2000);
      } catch (err) {
        console.error('Errore nella copia:', err);
        button.innerText = 'Errore!';
        button.style.background = '#ef4444';
        
        setTimeout(() => {
          button.innerText = 'Copia Codice';
          button.style.background = 'var(--accent, #00979D)';
        }, 2000);
      }
    });
  });
}

// Throttle function for scroll events (performance optimization)
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer alternative (more performant)
export function initializeIntersectionObserver() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const revealElements = document.querySelectorAll(
    '.card, .section-container, h1, h2, .reveal'
  );
  revealElements.forEach((el) => observer.observe(el));
}
