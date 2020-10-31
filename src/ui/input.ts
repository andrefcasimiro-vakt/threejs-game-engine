import Component from "../core/component"
import { ChangeEvent } from "../typescript/typings"

interface Props {
  name?: string
  type?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  style?: string
  onChange?: (event: ChangeEvent) => void,
  onClick?: (event: ChangeEvent) => void,
  max?: number
  min?: number
  required?: boolean
  pattern?: string
  title?: string
}

export default class Input implements Component {

  private _instance: HTMLInputElement

  private _name: string
  private _type: string
  private _placeholder: string
  private _value: string
  private _defaultValue: string
  private _style: string
  private _onChange: (event: ChangeEvent) => void
  private _onClick: (event: ChangeEvent) => void
  private _max: number
  private _min: number
  private _required: boolean
  private _pattern: string
  private _title: string

  constructor({
    name,
    type = 'text',
    placeholder,
    defaultValue,
    value,
    onClick,
    style,
    onChange,
    max,
    min,
    required,
    pattern,
    title,
  }: Props) {
    this._name = name
    this._type = type
    this._placeholder = placeholder
    this._value = value
    this._defaultValue = defaultValue
    this._style = style
    this._max = max
    this._min = min
    this._onChange = onChange
    this._required = required
    this._pattern = pattern
    this._title = title

    this.start()
  }

  start () {
    this._instance = document.createElement('input')
    this._instance.setAttribute('name', this._name)
    this._instance.setAttribute('placeholder', this._placeholder)
    this._instance.setAttribute('type', this._type)
    this._instance.setAttribute('style', this._style)

    if (this._value) {
      this._instance.setAttribute('value', this._value)
    }
    
    if (this._defaultValue) {
      this._instance.setAttribute('value', this._defaultValue)
    }

    if (this._max) {
      this._instance.setAttribute('max', `${this._max}`)
    }
    
    if (this._min) {
      this._instance.setAttribute('min', `${this._min}`)
    }
    
    if (this._required) {
      this._instance.setAttribute('required', `${this._required}`)
    }

    if (this._pattern) {
      this._instance.setAttribute('pattern', `${this._pattern}`)
    }

    if (this._title) {
      this._instance.setAttribute('title', `${this._title}`)
    }

    if (this._onChange) {
      this._instance.addEventListener('input', this._onChange)
    }

    if (this._onClick) {
      this._instance.addEventListener('click', this._onClick)
    }

    document.body.appendChild(this._instance)
  }

  destroy () {
    if (this._onChange) {
      this._instance.removeEventListener('input', this._onChange)
    }

    if (this._onClick) {
      this._instance.removeEventListener('click', this._onClick)
    }

    document.removeChild(this._instance)
  }
}
