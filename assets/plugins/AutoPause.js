class AutoPause {
  constructor() {
    this.threshold = 0.25
    this.handlerIntersection = this.handlerIntersection.bind(this)
    this.handleVisibilitychange = this.handleVisibilitychange.bind(this)
  }

  run(player) {
    this.player = player
    const observer = new IntersectionObserver(this.handlerIntersection, {
      threshold: this.threshold // porcentaje de vision del elemento en el contenedor
    })

    observer.observe(this.player.media)

    document.addEventListener("visibilitychange", this.handleVisibilitychange)
  }

  handlerIntersection(entries) {
    const entry = entries[0]
    const isVisible = entry.intersectionRatio >= this.threshold

    if (isVisible) {
      this.player.play()
    } else {
      this.player.pause()
    }
    console.log(entry)
  }

  handleVisibilitychange() {
    const isVisible = document.visibilityState === "visible"
    if (isVisible) {
      this.player.play()
    } else {
      this.player.pause()
    }
  }

}

export default AutoPause