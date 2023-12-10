import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  profile!:any;
  username = localStorage.getItem('username');

  constructor(
    private service: UserService,
  ) {
    this.profile = this.service.getProfile().subscribe(data=>{
      this.profile = data;
    })
  }

}
