import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";
import { GridHelper, Object3D, LineBasicMaterial, Color, Geometry, Vector3, Line, LinePieces, Intersection, Mesh, BoxGeometry, Material, MeshBasicMaterial } from "three";
import MouseRaycast from "../controls/mouse-raycast";

const DEFAULT_COLOR = 'rgba(50, 100, 255, 0.1)'

export default class EditorGrid implements Component {

  private _width: number = 10
  private _depth: number = 10
  private _lineWidth: number = 10
  private _lineDepth: number = 10
  private _grid: Object3D[] = []
  private _mouseRaycast: MouseRaycast
  private _previousIntersections: Intersection[]
  private _requestAnimationFrameId: number

  constructor(
    private _scene: Scene,
    private _gridColor: string | number | Color = new Color("rgba(0, 0, 0)")
  ) {
    this._scene = _scene

    this.start()
  }

  start = () => {
    this._mouseRaycast = new MouseRaycast(this._scene, this.onRaycast)

    this.generateGrid()
  }

  destroy = () => {
    // Cleanup
    this.cleanup()

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

  generateUnit = ({ x, y, z}: { x: number, y: number, z: number }) => {
    const unit = new Mesh(new BoxGeometry(1, 1, 1))
    // @ts-ignore
    unit.material.color.set(DEFAULT_COLOR)
    // @ts-ignore
    // unit.material.wireframe = true
    unit.position.x = x
    unit.position.y = y
    unit.position.z = z

    return unit
  }

  cleanup = () => {
    console.log('cleanup')
    this._grid.forEach(object => {
      this._scene.get().remove(object)
    })

    this._grid = []
  }

  generateGrid = () => {
    if (this._grid.length) {
      this.cleanup()
    }

    for (let i = -this._width; i < this._width + 1; i++) {
      for (let j = -this._depth; j < this._depth + 1; j++) {
        this._grid.push(this.generateUnit({ x: i, y: 0, z: j }))
      }
    }

    this._grid.forEach(object => {
      this._scene.get().add(object)
    })
  }

  onRaycast = (intersections: Intersection[]) => {
    if (this._previousIntersections && this._previousIntersections.length) {
      this._previousIntersections.forEach((intersection: any) => {
        intersection.object.material.color.set(DEFAULT_COLOR)
      })
    }

    if (intersections && intersections.length) {
      intersections.forEach((intersection: any) => {
        intersection.object.material.color.set('red')
      })
    }
      
    this._previousIntersections = intersections
  }
}
