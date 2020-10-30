import * as THREE from 'three'
import Component from './component'

// @ts-ignore
const OrbitControls = require('three-orbit-controls')(THREE)

export default class OrbitControl implements Component<THREE.OrbitControls> {

  private _instance: THREE.OrbitControls

  /**
   * The id of the requestAnimationFrame update() hook-up
   */
  private _requestAnimationFrameId: number

  /**
   * 
   * @param _camera - The camera to attach to our control
   * @param _domElement - The renderer dom element
   */
  constructor(
    private _camera: THREE.Camera,
     private _domElement: HTMLCanvasElement,
  ) {
    this._camera = _camera
    this._domElement = _domElement

    this.start()
  }

  start = () => {
    this._instance = new OrbitControls(this._camera, this._domElement)

    this.update()
  }

  update = () => {
    this._instance.update()

    // Hook update() to every animation frame
    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  destroy = () => {
    // Unhook update() from every animation frame
    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  get = () => {
    return this._instance;
  }
}
