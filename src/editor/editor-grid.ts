import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";
import { GridHelper, Object3D, LineBasicMaterial, Color, Geometry, Vector3, Line, LinePieces } from "three";

export default class EditorGrid implements Component {

  private _width: number = 10
  private _depth: number = 10
  private _lineWidth: number = 10
  private _lineDepth: number = 10

  private _requestAnimationFrameId: number

  private _grid: Object3D

  constructor(
    private _scene: Scene,
    private _gridColor: string | number | Color = new Color("rgba(0, 0, 0)")
  ) {
    this._scene = _scene

    this.start()
  }

  start = () => {
    this.generateGrid()
  }

  destroy = () => {
    // Cleanup
    this._scene.get().remove(this._grid)

    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  getGrid = () => {
    return this._grid
  }

  getWidth = () => {
    return this._width
  }
  setWidth = (width: number) => {
    this._width = width
    this._lineWidth = width

    this.generateGrid()
  }

  getDepth = () => {
    return this._depth
  }
  setDepth = (depth: number) => {
    this._depth = depth
    this._lineDepth = depth

    this.generateGrid()
  }

  generateGrid = () => {
    if (this._grid) {
      console.info(`Removed previous grid`)
      this._scene.get().remove(this._grid)
    }

    const material = new LineBasicMaterial({
      color: this._gridColor,
    })

    const gridObject = new Object3D(),
    gridGeo = new Geometry(),
    stepw = 2 * this._width / this._lineWidth,
    stepd = 2 * this._depth / this._lineDepth

    // width 
    for (let i = -this._width; i < this._width; i += stepw) {
      gridGeo.vertices.push(new Vector3(i, 0, -this._depth))
      gridGeo.vertices.push(new Vector3(i, 0, this._depth))
    }

    // depth 
    for (let i = -this._depth; i < this._depth; i += stepd) {
      gridGeo.vertices.push(new Vector3(-this._width, 0, i))
      gridGeo.vertices.push(new Vector3(this._width, 0, i))
    }

    const line = new Line(gridGeo, material, LinePieces)
    gridObject.add(line)

    this._grid = gridObject
    this._scene.get().add(this._grid)
  } 
}
