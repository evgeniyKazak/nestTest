import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersService } from 'src/users/users.service';
import { UserLoggedInEvent } from './../events/user-login.event';

@Injectable()
export class UserLoginListener {
  constructor(private userService: UsersService){}

  @OnEvent('users.loggedin', { async: true })
  handleOrderCreatedEvent(event: UserLoggedInEvent) {
    this.userService.updateLoginData(event.id, event.eventDate)
  }
}