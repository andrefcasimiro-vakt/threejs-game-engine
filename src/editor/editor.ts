import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";
import { PerspectiveCamera, BoxGeometry, Mesh, MeshNormalMaterial, Color } from "three";
import OrbitControl from "../controls/orbit-control";
import EditorToolbar from "./editor-toolbar";
import EditorGrid from "./editor-grid";

export default class Editor implements Component {

  private _scene: Scene
  private _camera: PerspectiveCamera
  private _controls: OrbitControl
  private _requestAnimationFrameId: number

  private _editorToolbar: EditorToolbar

  private _editorGrid: EditorGrid

  constructor() {
    this.start()
  }

  start = () => {
    this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this._scene = new Scene('prototype', this._camera)
    this._controls = new OrbitControl(this._camera, this._scene.getRenderer().domElement)

    this._camera.position.set(0, 200, 200)
    this._camera.lookAt(0, 0, 0)

    this._scene.getRenderer().setClearColor(new Color("rgba(0, 0, 0,"))

    // Instantiate editor toolsets
    this._editorGrid = new EditorGrid(this._scene)
    this._editorToolbar = new EditorToolbar(this._scene, this._editorGrid)

    this.update()
  }

  update = () => {
    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  destroy = () => {
    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }
}
