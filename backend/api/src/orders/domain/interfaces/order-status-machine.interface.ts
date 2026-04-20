// TODO: Interface transiciones válidas de estado
export interface IOrderStatusMachine {
  canTransitionTo(from: string, to: string): boolean;
}
