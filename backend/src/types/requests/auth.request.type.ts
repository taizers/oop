import { Request } from 'express';

export interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface RequestWithCookiesToken extends Request {
  cookies: {
    refresh_token: string;
  };
}
