import Component from "../core/component";
import Input from '../ui/input'
import { ChangeEvent } from "../typescript/typings";
import Scene from "../core/scene";

export default class EditorToolbar implements Component {

  private _sceneNameInput: Input
  private _requestAnimationFrameId: number

  constructor(
    private _editorScene: Scene
  ) {
    this._editorScene = _editorScene

    this._sceneNameInput = new Input({
      name: 'sceneName',
      placeholder: 'Insert a scene name...',
      style: `
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
      `,
      onChange: this.handleSceneNameChange
    })
      

    this.start()
  }

  start = () => {}

  destroy = () => {
    // Cleanup
    this._sceneNameInput.destroy()

    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  handleSceneNameChange = (event: ChangeEvent) => {
    
  }
}
