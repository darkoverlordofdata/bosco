module bosco.utils {
  "use strict"

  /**
   * Input Controller
   */
  export class Input {

    /** the input singleton */
    private static _input = new Input()

    /** 
     * @returns the curent mouse position 
     */
    static get mousePosition() {
      return Input._input.mousePosition
    }

    /**
     * @param key
     * @returns true if key is in down state
     */
    static getKeyDown(key) {
      return Input._input.isDown(key.charCodeAt(0))
    }

    /**
     * @param key
     * @returns true if key is in up state
     */
    static getKeyUp(key) {
      return Input._input.isUp(key.charCodeAt(0))
    }

    /**
     * @param mouseButton reserved for future use
     * @returns true if the mouse button is in the down state
     */
    static getMouseButtonUp(mouseButton) {
      return !Input._input.mouseButtonDown
    }

    /**
     * @param mouseButton reserved for future use
     * @returns true if the mouse button is in the down state
     */
    static getMouseButton(mouseButton) {
      return Input._input.mouseDown
    }

    /**
     * @param mouseButton reserved for future use
     * @returns true if the mouse button is in the down state
     */
    static getMouseButtonDown(mouseButton) {
      return Input._input.mouseButtonDown
    }

    /**
     * update should be called every game loop
     */
    static update() {
      Input._input.mouseDown = false
      Input._input.states = {}
    }

    public states = {}
    public mouseDown:boolean = false
    public mouseButtonDown:boolean = false
    public mousePosition = {x:0, y:0}
    public isFullScreen:boolean

    isDown = (keyCode) => this.states[keyCode]
    isUp = (keyCode) => !this.states[keyCode]

    /**
     * connect the event listeners
     */
    constructor() {

      document.addEventListener('touchstart', this.onTouchStart, true)
      document.addEventListener('touchmove', this.onTouchMove, true)
      document.addEventListener('touchend', this.onTouchEnd, true)
      document.addEventListener('mousedown', this.onTouchStart, true)
      document.addEventListener('mousemove', this.onTouchMove, true)
      document.addEventListener('mouseup', this.onTouchEnd, true)
      window.addEventListener('keydown', this.onKeyDown, true)
      window.addEventListener('keyup', this.onKeyUp, true)

    }

    private onKeyUp = (event) => {
      if (this.states[event.keyCode]) this.states[event.keyCode] = false
    }

    private onKeyDown = (event) => {
      this.states[event.keyCode] = true
    }

    private onTouchStart = (event) => {
      event = event.targetTouches ? event.targetTouches[0] : event
      if (this.isFullScreen === undefined) this.checkFullScreen()

      this.mouseDown = true
      this.mouseButtonDown = true
      this.mousePosition.x = parseInt(event.clientX)
      this.mousePosition.y = parseInt(event.clientY)
      return true
    }

    private onTouchMove = (event) => {
      event = event.targetTouches ? event.targetTouches[0] : event
      this.mousePosition.x = parseInt(event.clientX)
      this.mousePosition.y = parseInt(event.clientY)
    }

    private onTouchEnd = (event) => {
      this.mouseDown = false
      this.mouseButtonDown = false
    }

    private checkFullScreen() {
      if (this.isFullScreen === undefined) {
        if (bosco.config.fullScreen === undefined) {
          this.isFullScreen = false
        } else {
          this.isFullScreen = bosco.isMobile() || bosco.config.fullScreen
        }
      }

      if (this.isFullScreen) {
        try {
          if (document.documentElement['requestFullscreen']) {
            document.documentElement['requestFullscreen']()
          } else if (document.documentElement['mozRequestFullScreen']) {
            document.documentElement['mozRequestFullScreen']()
          } else if (document.documentElement['webkitRequestFullscreen']) {
            document.documentElement['webkitRequestFullscreen']()
          } else if (document.documentElement['msRequestFullscreen']) {
            document.documentElement['msRequestFullscreen']()
          }
        } catch (e) {}
      }
    }

  }
}