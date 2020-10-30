import Component from "../core/component";
import Input from '../ui/input'

export default class Editor implements Component {

  private _sceneNameInput: Input
  private _requestAnimationFrameId: number

  constructor() {
    
    this._sceneNameInput = new Input({
      style: `
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
      `,
      onChange: (event) => console.log(event.target.value)
    })
      

    this.start()
  }

  start = () => {
    this.update()
  }

  update = () => {
    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  destroy = () => {
    // Cleanup
    this._sceneNameInput.destroy()

    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }
}
