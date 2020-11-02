import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";
import { GridHelper, Object3D, LineBasicMaterial, Color, Geometry, Vector3, Line, LinePieces, Intersection, Mesh, BoxGeometry, Material, MeshBasicMaterial } from "three";
import MouseRaycast from "../controls/mouse-raycast";
import { TileEntity, TileType } from "./editor-tile";
import {generate as generateShortId} from 'shortid'

const DEFAULT_COLOR = 'rgba(50, 100, 255, 0.1)'
const HIGHLIGHTED_COLOR = 'rgba(200, 50, 100, 0.5)'

export interface Entity {
  uuid: string
  mesh: Object3D
}

export interface GridEntity {
  floor?: Entity
  object?: Entity
  event?: Entity
}

export default class EditorGrid implements Component {

  private _width: number = 10
  private _depth: number = 10
  private _lineWidth: number = 10
  private _lineDepth: number = 10

  private _grid: GridEntity[] = []

  private _mouseRaycast: MouseRaycast
  private _previousIntersection: Intersection
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
    this.undraw()

    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  getGrid = () => {
    return this._grid
  }

  getWidth = () => {
    return this._width
  }

  getDepth = () => {
    return this._depth
  }

  setWidth = (width: number) => {
    this._width = width
    this._lineWidth = width

    this.generateGrid()
  }

  setDepth = (depth: number) => {
    this._depth = depth
    this._lineDepth = depth

    this.generateGrid()
  }

  draw = () => {
    this._grid.forEach(unit => {
      const scene = this._scene.get()

      const floorMesh = unit.floor && unit.floor.mesh
      if (floorMesh) {
        scene.add(floorMesh)
      }

      const objectMesh = unit.object && unit.object.mesh
      if (objectMesh) {
        scene.add(objectMesh)
      }

      const eventMesh = unit.event && unit.event.mesh
      if (eventMesh) {
        scene.add(eventMesh)
      }
    })
  }

  undraw = () => {
    this._grid.forEach(unit => {
      const scene = this._scene.get()

      const floorMesh = unit.floor && unit.floor.mesh
      if (floorMesh) {
        scene.remove(floorMesh)
      }

      const objectMesh = unit.object && unit.object.mesh
      if (objectMesh) {
        scene.remove(objectMesh)
      }

      const eventMesh = unit.event && unit.event.mesh
      if (eventMesh) {
        scene.remove(eventMesh)
      }
    })

    this._grid = []
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

  generateGrid = () => {
    if (this._grid.length) {
      this.undraw()
    }

    for (let i = -this._width; i < this._width + 1; i++) {
      for (let j = -this._depth; j < this._depth + 1; j++) {
        this._grid.push({
          floor: {
            uuid: generateShortId(),
            mesh: this.generateUnit({ x: i, y: 0, z: j })
          },
        })
      }
    }

    this.draw()
  }

  onRaycast = (intersections: Intersection[] = []) => {
    const currentIntersection = intersections[0]

    if (this._previousIntersection) {
      // @ts-ignore
      this._previousIntersection.object.material.color.set(DEFAULT_COLOR)
    }

    if (currentIntersection) {
      // @ts-ignore
      currentIntersection.object.material.color.set(HIGHLIGHTED_COLOR)
      
      this._previousIntersection = currentIntersection
    }
  }
}
