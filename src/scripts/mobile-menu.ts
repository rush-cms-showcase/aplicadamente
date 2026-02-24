function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn')
  const menu = document.getElementById('mobile-menu')
  const iconMenu = document.getElementById('icon-menu')
  const iconClose = document.getElementById('icon-close')
  const header = document.getElementById('main-header')

  if (!btn || !menu || !iconMenu || !iconClose || !header) return

  // Remove existing listener if any, by replacing element
  const newBtn = btn.cloneNode(true)
  btn.parentNode?.replaceChild(newBtn, btn)

  newBtn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden')
    
    if (isHidden) {
      menu.classList.remove('hidden')
      menu.classList.add('flex')
      iconMenu.classList.add('hidden')
      iconMenu.classList.remove('block')
      iconClose.classList.remove('hidden')
      iconClose.classList.add('block')
      header.classList.add('bg-white')
    } else {
      menu.classList.add('hidden')
      menu.classList.remove('flex')
      iconMenu.classList.remove('hidden')
      iconMenu.classList.add('block')
      iconClose.classList.add('hidden')
      iconClose.classList.remove('block')
      header.classList.remove('bg-white')
    }
  })
}

initMobileMenu()

document.addEventListener('astro:after-swap', initMobileMenu)
document.addEventListener('astro:page-load', initMobileMenu)
