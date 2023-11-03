export default (name, offset = 0) => {
  const el = document.getElementById(name)

  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: el.offsetTop + offset, behavior: 'smooth' })
  } else {
    window.scrollTo(0, el.offsetTop + offset)
  }
}