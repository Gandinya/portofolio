const loader=document.getElementById('loader');const hideLoader=()=>loader?.classList.add('hide');window.addEventListener('load',()=>setTimeout(hideLoader,620),{once:true});setTimeout(hideLoader,2600);
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const portrait=document.querySelector('#heroPortrait');const portraitImg=portrait?.querySelector('img');portraitImg?.addEventListener('error',()=>portrait.classList.add('media-error'),{once:true});window.addEventListener('mousemove',e=>{if(!portrait||window.innerWidth<760)return;const x=(e.clientX/window.innerWidth-.5)*12;const y=(e.clientY/window.innerHeight-.5)*10;portrait.style.transform=`translate(${x}px,${y}px)`});
    document.querySelectorAll('.visual img').forEach(img=>{const frame=img.closest('.visual');img.addEventListener('error',()=>frame.classList.add('media-error'),{once:true})});
    let activeModal=null,lastTrigger=null;const openModal=trigger=>{const modal=document.getElementById(trigger.dataset.modal);if(!modal)return;lastTrigger=trigger;activeModal=modal;modal.classList.add('open');document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('.modal-close')?.focus(),100)};const closeModal=()=>{if(!activeModal)return;activeModal.classList.remove('open');document.body.classList.remove('modal-open');const trigger=lastTrigger;activeModal=null;setTimeout(()=>trigger?.focus(),100)};document.querySelectorAll('[data-modal]').forEach(trigger=>{trigger.addEventListener('click',()=>openModal(trigger));trigger.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(trigger)}})});document.querySelectorAll('[data-close-modal]').forEach(button=>button.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

    
    // Seamless running text. All copies are identical and the movement equals
    // exactly one group's rendered width, so the restart is invisible.
    const setupSeamlessTicker = () => {
      const ticker = document.querySelector('.ticker');
      const track = ticker?.querySelector('.ticker-track');
      const original = track?.querySelector('.ticker-group');
      if (!ticker || !track || !original) return;

      // Remove old clones first so the width measurement stays accurate.
      track.replaceChildren(original);
      const groupWidth = original.getBoundingClientRect().width;
      if (!groupWidth) return;

      // Cover the whole viewport AND one full extra group to prevent gaps.
      const copies = Math.max(2, Math.ceil(ticker.clientWidth / groupWidth) + 2);
      for (let i = 1; i < copies; i++) {
        const clone = original.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      }
      track.style.setProperty('--ticker-shift', groupWidth + 'px');
      track.style.setProperty('--ticker-duration', groupWidth / 70 + 's');
    };

    setupSeamlessTicker();
    document.fonts?.ready.then(setupSeamlessTicker);
    let tickerResizeFrame;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(tickerResizeFrame);
      tickerResizeFrame = requestAnimationFrame(setupSeamlessTicker);
    }, { passive: true });
