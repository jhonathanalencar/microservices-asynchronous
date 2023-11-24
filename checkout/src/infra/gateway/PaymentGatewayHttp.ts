import axios from "axios";

import {
  Input,
  Output,
  PaymentGateway,
} from "../../application/gateway/PaymentGateway";

export class PaymentGatewayHttp implements PaymentGateway {
  async processPayment(input: Input): Promise<Output> {
    const response = await axios.post(
      "http://localhost:3001/process_payment",
      input
    );
    return response.data;
  }
}
