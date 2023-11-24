import { OrderRepository } from "../repository/OrderRepository";

export class ConfirmOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<void> {
    console.log("confirmOrder", input);
    const order = await this.orderRepository.get(input.orderId);
    if (input.status === "success") {
      order.confirm();
      await this.orderRepository.update(order);
    }
  }
}

export type Input = {
  orderId: string;
  status: string;
};
