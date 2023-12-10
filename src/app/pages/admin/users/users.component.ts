import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!:any;

  constructor(
    private service: UserService,
  ) {
    this.service.getUsers().subscribe(data=>{
      this.users = data;

      console.log(data);

      for(let i=0; i<data.length;i++) {
        this.service.getProfileByUserId(data[i].id).subscribe(profile=>{
          this.users[i].profile = profile;
        });
      }
    })
  }
}
