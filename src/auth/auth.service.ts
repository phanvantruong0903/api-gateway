import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

interface UserServiceClient {
  LoginUser(data: { email: string; password: string }): Observable<any>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async login(email: string, password: string) {
    return await lastValueFrom(this.userService.LoginUser({ email, password }));
  }
}
