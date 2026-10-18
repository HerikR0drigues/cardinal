import { useRef } from 'react'
import type { PointerEvent } from 'react'

const MAX_TILT_DEGREES = 14
const CSS_VARIABLES = ['--tilt-x', '--tilt-y', '--glare-x', '--glare-y']

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const onPointerMove = (event: PointerEvent<T>) => {
    const element = ref.current
    if (!element || event.pointerType === 'touch') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    element.dataset.active = 'true'
    element.style.setProperty('--tilt-x', `${(0.5 - y) * 2 * MAX_TILT_DEGREES}deg`)
    element.style.setProperty('--tilt-y', `${(x - 0.5) * 2 * MAX_TILT_DEGREES}deg`)
    element.style.setProperty('--glare-x', `${x * 100}%`)
    element.style.setProperty('--glare-y', `${y * 100}%`)
  }

  const onPointerLeave = () => {
    const element = ref.current
    if (!element) return
    delete element.dataset.active
    CSS_VARIABLES.forEach((name) => element.style.removeProperty(name))
  }

  return { ref, onPointerMove, onPointerLeave }
}
