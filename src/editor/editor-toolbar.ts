import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";
import EditorGrid from "./editor-grid";

const GRID_MAX_SIZE = 30
const GRID_MIN_SIZE = 1

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

  clampGridInput = (value: number): number => {
    if (value > GRID_MAX_SIZE) return GRID_MAX_SIZE
    if (value < GRID_MIN_SIZE) return GRID_MIN_SIZE

    return value
  }

  renderInputs = () => {
    this._inputs = [
      new Input({
      name: 'sceneName',
      placeholder: 'Scene name',
      style: `
        display: flex;
        position: absolute;
        top: 10px;
        left: 10px;
        width: 140px;
      `,
      onChange: (event) => {
        this._editorScene.setName(event.target.value)
      },
    }),
    new Input({
      name: 'saveScene',
      type: 'button',
      value: 'Save',
      style: `
        display: flex;
        position: absolute;
        top: 10px;
        left: 166px;
        width: 50px;
      `,
    }),
    new Input({
      name: 'loadScene',
      type: 'button',
      value: 'Load',
      style: `
        display: flex;
        position: absolute;
        top: 10px;
        left: 226px;
        width: 50px;
      `,
    }),
    new Input({
      name: 'gridWidth',
      type: 'number',
      placeholder: 'Width (max. 30)',
      style: `
        display: flex;
        position: absolute;
        top: 40px;
        left: 10px;
        width: 120px;
      `,
      defaultValue: `${this._editorGrid.getWidth()}`,
      onChange: (event) => {
        this._editorGrid.setWidth(this.clampGridInput(Number(event.target.value)))
      },
      max: GRID_MAX_SIZE,
      min: GRID_MIN_SIZE,
    }),
    new Input({
      name: 'gridDepth',
      type: 'number',
      placeholder: 'Depth (max. 30)',
      style: `
        display: flex;
        position: absolute;
        top: 40px;
        left: 150px;
        width: 120px;
      `,
      defaultValue: `${this._editorGrid.getDepth()}`,
      onChange: (event) => {
        this._editorGrid.setDepth(this.clampGridInput(Number(event.target.value)))
      },
      max: GRID_MAX_SIZE,
      min: GRID_MIN_SIZE,
    }),
    ]
  }
}
