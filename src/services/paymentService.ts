import axios from 'axios';

export interface ChapaInitParams {
  amount: number;
  email: string;
  first_name: string;
  last_name: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
}

export interface TelebirrInitParams {
  amount: number;
  tx_ref: string;
  return_url: string;
}

export const paymentService = {
  async initializeChapa(params: ChapaInitParams) {
    const response = await axios.post('/api/payments/chapa/initialize', params);
    return response.data;
  },

  async initializeTelebirr(params: TelebirrInitParams) {
    const response = await axios.post('/api/payments/telebirr/initialize', params);
    return response.data;
  }
};
