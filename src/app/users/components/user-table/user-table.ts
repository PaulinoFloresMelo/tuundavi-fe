import { User } from '@/auth/interfaces/user.interface';
import { TermImagePipe } from '@/terms/pipes/term-image.pipe';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-table',
  imports: [TermImagePipe, RouterLink],
  templateUrl: './user-table.html',
})
export class UserTable {
  users = input.required<User[]>();
 }
