
/**
 * A component that subscribes to document / window event listeners
 * */
export default abstract class ReactiveComponent<T = any> {

  abstract start(): void

  abstract destroy?(): void

  abstract get?(): T

}
