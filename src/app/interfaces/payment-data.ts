export interface PaymentData {
  id: number;
  name: string;
  username?: string;
  title: string;
  value: number;
  date: Date;
  image?: string;
  isPayed: boolean;
}
