import Component from "../core/component"
import { ChangeEvent } from "../typescript/typings"

interface Props {
  name?: string
  type?: string
  placeholder?: string
  defaultValue?: string
  style?: string
  onChange?: (event: ChangeEvent) => void,
}

export default class Input implements Component {

  private _instance: HTMLInputElement

  private _name: string
  private _type: string
  private _placeholder: string
  private _defaultValue: string
  private _style: string
  private _onChange: (event: ChangeEvent) => void

  constructor({ name, type = 'text', placeholder, defaultValue, style, onChange }: Props) {
    this._name = name
    this._type = type
    this._placeholder = placeholder
    this._defaultValue = defaultValue
    this._style = style
    this._onChange = onChange

    this.start()
  }

  start () {
    this._instance = document.createElement('input')
    this._instance.setAttribute('name', this._name)
    this._instance.setAttribute('placeholder', this._placeholder)
    this._instance.setAttribute('type', this._type)
    this._instance.setAttribute('style', this._style)
    
    if (this._defaultValue) {
      this._instance.setAttribute('value', this._defaultValue)
    }

    this._instance.addEventListener('input', this._onChange)

    document.body.appendChild(this._instance)
  }

  destroy () {
    this._instance.removeEventListener('input', this._onChange)

    document.removeChild(this._instance)
  }
}
