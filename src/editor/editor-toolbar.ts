import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";
import EditorGrid from "./editor-grid";

export default class EditorToolbar implements Component {
  private _inputs: Input[]
  private _requestAnimationFrameId: number

  constructor(
    private _editorScene: Scene,
    private _editorGrid: EditorGrid
  ) {
    this._editorScene = _editorScene
    this._editorGrid = _editorGrid
      
    this.start()
  }

  start = () => {
    this.renderInputs()
  }

  destroy = () => {
    this._inputs.forEach(input => {
      input.destroy()
    })

    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }


  renderInputs = () => {
    this._inputs = [
      new Input({
      name: 'sceneName',
      placeholder: 'Insert a scene name...',
      style: `
        display: flex;
        position: absolute;
        top: 10px;
        left: 10px;
        width: 180px;
      `,
      onChange: (event) => {
        this._editorScene.setName(event.target.value)
      },
    }),
    new Input({
      name: 'gridWidth',
      type: 'number',
      placeholder: 'Grid width...',
      style: `
        display: flex;
        position: absolute;
        top: 40px;
        left: 10px;
        width: 80px;
      `,
      defaultValue: `${this._editorGrid.getWidth()}`,
      onChange: (event) => {
        this._editorGrid.setWidth(Number(event.target.value))
      },
    }),
    new Input({
      name: 'gridDepth',
      type: 'number',
      placeholder: 'Grid depth...',
      style: `
        display: flex;
        position: absolute;
        top: 40px;
        left: 110px;
        width: 80px;
      `,
      defaultValue: `${this._editorGrid.getDepth()}`,
      onChange: (event) => {
        this._editorGrid.setDepth(Number(event.target.value))
      },
    }),
    ]
  }
}
