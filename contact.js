document.addEventListener('DOMContentLoaded', () => {
  const email = 'ekurushadrach8@gmail.com';
  function showToast(text){
    let t = document.getElementById('toast');
    if(!t){ t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = text; t.classList.add('show');
    setTimeout(()=> t.classList.remove('show'), 2000);
  }

  document.querySelectorAll('a[data-contact]').forEach(a => {
    a.addEventListener('click', (e) => {
      // try to open mail client normally; after 300ms if window still visible, copy fallback
      const fallbackTimer = setTimeout(() => {
        navigator.clipboard?.writeText(email).then(()=> showToast('Email address copied to clipboard'))
          .catch(()=> showToast('Email: ' + email));
      }, 300);
      // clear fallback if the browser navigates away (mailto handled)
      window.addEventListener('pagehide', () => clearTimeout(fallbackTimer));
    });
  });
});
