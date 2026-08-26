import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://crm.anhtester.com',
  loginPath: '/admin/authentication',
  credentials: {
    email: process.env.LOGIN_EMAIL ?? 'admin@example.com',
    password: process.env.LOGIN_PASSWORD ?? '123456',
  },
};
