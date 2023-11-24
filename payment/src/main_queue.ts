import { RabbitMQAdapter } from "./RabbitMQAdapter";
import { Input, ProcessPayment } from "./application/usecase/ProcessPayment";

async function main() {
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const processPayment = new ProcessPayment(queue);
  queue.consume("orderPlaced", async (input: Input) => {
    await processPayment.execute(input);
  });
}

main();
