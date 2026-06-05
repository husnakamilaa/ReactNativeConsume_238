import { LoginResponse, RegisterResponse } from "../entities/Auth";

export interface IAuthRepository {
  login(email: string, password: string): Promise<LoginResponse>;
  
}