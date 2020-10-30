import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";
import { PerspectiveCamera, BoxGeometry, Mesh, MeshNormalMaterial, Color } from "three";
import OrbitControl from "../controls/orbit-control";
import EditorToolbar from "./editor-toolbar";

export default class Editor implements Component {

  private _scene: Scene
  private _camera: PerspectiveCamera
  private _controls: OrbitControl
  private _requestAnimationFrameId: number
  private _brick: Mesh

  private _editorToolbar: EditorToolbar

  constructor() {
    this.start()
  }

  start = () => {
    this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this._scene = new Scene('prototype', this._camera)
    this._controls = new OrbitControl(this._camera, this._scene.getRenderer().domElement)

    this._camera.position.set(0, 200, 200)
    this._camera.lookAt(0, 0, 0)

    this._brick = new Mesh(new BoxGeometry(20, 20, 20))
    this._brick.material = new MeshNormalMaterial()
    this._scene.get().add(this._brick)
    this._scene.getRenderer().setClearColor(new Color("rgba(0, 0, 0,"))

    this._editorToolbar = new EditorToolbar(this._scene)

    this.update()
  }

  update = () => {
    this._brick.rotateY(0.05)

    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  destroy = () => {
    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  handleSceneNameChange = (event: ChangeEvent) => {
    
  }
}
