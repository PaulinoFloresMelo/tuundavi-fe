import { Component } from '@angular/core';
import { UserTable } from "src/app/users/components/user-table/user-table";

@Component({
  selector: 'app-users-admin-page',
  imports: [UserTable],
  templateUrl: './users-admin-page.html',
})
export class UsersAdminPage { 
  
}
