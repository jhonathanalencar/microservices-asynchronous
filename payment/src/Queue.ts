export interface Queue {
  connect(): Promise<void>;
  consume(queueName: string, callback: Function): Promise<void>;
  publish(queueName: string, data: Object): Promise<void>;
}
