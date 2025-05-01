
export function setupScrollReveal() {
  const scrollFx = () => {
    const elements = document.querySelectorAll('.scroll-fx');
    
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.classList.add('visible');
        
        // Check for scramble text elements and trigger their effect
        const scrambleTexts = element.querySelectorAll('.text-scramble');
        scrambleTexts.forEach((text) => {
          if (!text.classList.contains('scrambled')) {
            text.classList.add('scrambled');
            scrambleText(text as HTMLElement);
          }
        });
      }
    });
  };

  // Text scramble effect function
  const scrambleText = (element: HTMLElement) => {
    const originalText = element.dataset.text || element.textContent || '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_-+=[]{}|;:,.<>?';
    let iteration = 0;
    const maxIterations = 15; // Increased iterations for longer effect
    let interval: number | null = null;

    interval = window.setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((letter, index) => {
          // Gradually reveal letters from left to right
          if (index < Math.floor(iteration / maxIterations * originalText.length)) {
            return originalText[index];
          }
          // Replace others with random characters
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');

      if (iteration >= maxIterations) {
        clearInterval(interval!);
        element.textContent = originalText; // Ensure final text is correct
      }
      
      iteration += 1;
    }, 70); // Slower decryption effect
  };

  window.addEventListener('scroll', scrollFx);
  // Initial check
  setTimeout(scrollFx, 100);
  
  return () => window.removeEventListener('scroll', scrollFx);
}
