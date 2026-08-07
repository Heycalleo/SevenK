const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const detailButtons = document.querySelectorAll('.detail-toggle');

async function loadGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  try {
    const res = await fetch('data/gallery.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Tidak bisa memuat data gallery');
    const items = await res.json();
    if (!Array.isArray(items)) throw new Error('Gallery JSON tidak valid');

    grid.innerHTML = '';
    items.forEach((src) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';

      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Foto galeri kelas';
      img.loading = 'lazy';
      img.className = 'gallery-thumb';
      img.addEventListener('click', () => openLightbox(src));

      const actions = document.createElement('div');
      actions.className = 'gallery-actions';

      const download = document.createElement('a');
      download.href = src;
      download.download = src.split('/').pop();
      download.className = 'download-btn';
      download.textContent = 'Download';
      actions.appendChild(download);

      card.appendChild(img);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  } catch (error) {
    const grid = document.getElementById('galleryGrid');
    if (grid) {
      grid.innerHTML = '<div class="gallery-card"><p class="muted">Galeri tidak dapat dimuat.</p></div>';
    }
    console.error(error);
  }
}

function openLightbox(src) {
  if (!src) return;

  let overlay = document.getElementById('lightboxOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightboxOverlay';
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <div class="lightbox-inner">
        <div class="lightbox-header">
          <button id="lightboxClose" class="lightbox-close" aria-label="Tutup">✕</button>
          <a id="lightboxDownload" class="download-btn lightbox-download" href="" download="" aria-label="Download gambar">Download</a>
        </div>
        <img id="lightboxImg" src="" alt="Gambar galeri diperbesar" />
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.id === 'lightboxClose') {
        overlay.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
      }
    });
  }

  const img = overlay.querySelector('#lightboxImg');
  const download = overlay.querySelector('#lightboxDownload');
  if (img) {
    img.src = src;
  }
  if (download) {
    download.href = src;
    download.download = src.split('/').pop();
  }

  overlay.classList.add('open');
}

menuToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 720) {
      siteNav?.classList.remove('open');
    }
  });
});

detailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    if (panel instanceof HTMLElement) {
      panel.classList.toggle('open');
      button.textContent = panel.classList.contains('open') ? 'Sembunyikan' : 'Detail';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  loadGallery();
});
