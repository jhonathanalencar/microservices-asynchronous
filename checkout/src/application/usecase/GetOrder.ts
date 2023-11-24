import { CourseRepository } from "../repository/CourseRepository";
import { OrderRepository } from "../repository/OrderRepository";

export class GetOrder {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly courseRepository: CourseRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const order = await this.orderRepository.get(input.orderId);
    const course = await this.courseRepository.get(order.courseId);
    return {
      orderId: order.orderId,
      name: order.name,
      email: order.email,
      amount: order.amount,
      courseTitle: course.title,
      status: order.getStatus(),
    };
  }
}

type Input = {
  orderId: string;
};

type Output = {
  orderId: string;
  name: string;
  email: string;
  amount: number;
  courseTitle: string;
  status: string;
};
