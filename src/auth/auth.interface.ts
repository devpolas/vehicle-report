export interface CreateAccount {
  name: string;
  email: string;
  password?: string;
  providerId: string;
  accountId: string;
}
