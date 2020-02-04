// PRAATBAK
export const fetchPraatbak = () => fetch('https://api.jsonbin.io/b/5e37f9cc50a7fe418c58c024/latest')
  .then(resp => resp.json())
  .then(json => json
    .messages
    .join('\n')
  )

export const savePraatbak = () => {
  const messages = praatbakTxt.split('\n')
  return fetch('https://api.jsonbin.io/b/5e37f9cc50a7fe418c58c024', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'versioning': false
      },
      body: JSON.stringify({
        messages
      })
    })
    .then(resp => resp.json())
    .then(json => json.data
      .messages
      .join('\n')
    )
}

// FAVICON

export const changeFavicon = link => {
  let $favicon = document.querySelector('link[rel="icon"]')
  // If a <link rel="icon"> element already exists,
  // change its href to the given link.
  if ($favicon !== null) {
    $favicon.href = link
    // Otherwise, create a new element and append it to <head>.
  } else {
    $favicon = document.createElement('link')
    $favicon.rel = 'icon'
    $favicon.href = link
    document.head.appendChild($favicon)
  }
}

let faviCounter = 0
export const metaMarquee = () => {
  document.title = `${document.title.slice(1)}${document.title.slice(0, 1)}`.replace('DG', 'D G').replace('DH', 'D H').replace('NA', 'N A').replace('SH', 'S H')
  const canvas = document.createElement('canvas')
  canvas.width = 120
  canvas.height = 120
  const ctx = canvas.getContext('2d')
  ;([60, 48, 36, 24, 12])
    .forEach((rad, i) => {
      let circle = new Path2D()
      circle.moveTo(125, 35)
      circle.arc(60, 60, rad, 0, 2 * Math.PI)
      ctx.fillStyle = ((5 - (faviCounter % 5)) === i) ? '#000000' : '#ffa500'
      ctx.fill(circle)
    })
  const faviconImgUrl = canvas.toDataURL()
  changeFavicon(faviconImgUrl)
  faviCounter++
}