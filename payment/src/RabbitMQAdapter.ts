import amqp from "amqplib";

import { Queue } from "./Queue";

export class RabbitMQAdapter implements Queue {
  connection?: amqp.Connection;

  async connect(): Promise<void> {
    this.connection = await amqp.connect("amqp://admin:admin@localhost:5672");
  }

  async consume(queueName: string, callback: Function): Promise<void> {
    const channel = await this.connection?.createChannel();
    await channel?.assertQueue(queueName, { durable: true });
    channel?.consume(queueName, async (msg) => {
      const input = JSON.parse(msg?.content.toString() || "");
      await callback(input);
      if (msg) channel.ack(msg);
    });
  }

  async publish(queueName: string, data: Object): Promise<void> {
    const channel = await this.connection?.createChannel();
    await channel?.assertQueue(queueName, { durable: true });
    channel?.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  }
}
