export function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.top + rect.height > 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width > 0;

  return vertInView && horInView;
}

/**
 * checks whether event happened outside the target element or not. commonly used for click and touch events
 * @param target target element to check against
 * @param event event object
 * @param onlyVisible if true only visible elements will be checked, by default true
 * @returns
 */
export function isEventHappendOutside(
  target: HTMLElement,
  event: Event,
  onlyVisible = true
) {
  if (
    target.contains(event.target as Node) ||
    (!isElementInViewport(target) && onlyVisible)
  ) {
    return false;
  }
  return true;
}
