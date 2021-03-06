import { isUndefined } from 'lodash'
import touch from 'touches'

export function getRGBString(r, g, b) {
  g = isUndefined(g) ? r : g
  b = isUndefined(b) ? r : b
  return `rgb(${r},${g},${b});`
}

export function hsv2rgb(hue, saturation, value) {
  let chroma = value * saturation
  let hue1 = hue / 60
  let x = chroma * (1 - Math.abs((hue1 % 2) - 1))
  let r1, g1, b1
  if (hue1 >= 0 && hue1 <= 1) {
    ;[r1, g1, b1] = [chroma, x, 0]
  } else if (hue1 >= 1 && hue1 <= 2) {
    ;[r1, g1, b1] = [x, chroma, 0]
  } else if (hue1 >= 2 && hue1 <= 3) {
    ;[r1, g1, b1] = [0, chroma, x]
  } else if (hue1 >= 3 && hue1 <= 4) {
    ;[r1, g1, b1] = [0, x, chroma]
  } else if (hue1 >= 4 && hue1 <= 5) {
    ;[r1, g1, b1] = [x, 0, chroma]
  } else if (hue1 >= 5 && hue1 <= 6) {
    ;[r1, g1, b1] = [chroma, 0, x]
  }

  let m = value - chroma
  let [r, g, b] = [r1 + m, g1 + m, b1 + m]

  // Change r,g,b values from [0,1] to [0,255]
  return [255 * r, 255 * g, 255 * b]
}

export function xy2polar(x, y) {
  let r = Math.sqrt(x * x + y * y)
  let phi = Math.atan2(y, x)
  return [r, phi]
}

// rad in [-π, π] range
// return degree in [0, 360] range
export function rad2deg(rad) {
  return ((rad + Math.PI) / (2 * Math.PI)) * 360
}

export function addTouchEvents(el, callbacks) {
  touch(el, { target: el, filtered: true })
    .on('start', callbacks.start)
    .on('move', callbacks.move)
    .on('end', e => {})
}

export function touchesToPolar(e) {
  const {clientX, clientY} = e.touches[0]
  console.log(e.touches[0]);
  //xy2polar2(clientX, clientY)
  //let [r, phi] = xy2polar(clientX, clientY)
  //let deg = rad2deg(phi)
  //console.log(deg);
}