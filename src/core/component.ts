export default abstract class Component<T = any> {

  abstract start(): void

  abstract update?(): void

  abstract destroy?(): void

  abstract get?(): T

}
