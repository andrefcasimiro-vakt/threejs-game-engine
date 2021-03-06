import { WebGLRenderer, Camera, Scene as ThreeJSScene, PerspectiveCamera } from 'three'
import Component from './component';

export default class Scene implements Component<ThreeJSScene> {

  private _instance: ThreeJSScene
  private _renderer: WebGLRenderer
  private _requestAnimationFrameId: number

  constructor(
    private _sceneName: string,
     private _camera: PerspectiveCamera,
  ) {
    this._sceneName = _sceneName
    this._camera = _camera

    this.start()
  }

  start = () => {
    this._instance = new ThreeJSScene()

    this._renderer = new WebGLRenderer()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this._renderer.domElement)

    window.addEventListener('resize', this.onResize, false)

    this.update()
  }

  update = () => {
    this._camera.aspect = window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
    this._renderer.render(this.get(), this._camera)

    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  onResize = () => {
    this._renderer.setSize(window.innerWidth, window.innerHeight)
  }

  destroy = () => {
    window.removeEventListener('resize', this.onResize, false)

    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  get = () => {
    return this._instance
  }

  getRenderer = () => {
    return this._renderer
  }

  getCamera = () => {
    return this._camera
  }

  getName = () => {
    return this._sceneName
  }

  setName = (sceneName: string) => {
    this._sceneName = sceneName
  }
}
