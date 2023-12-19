import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  profile!:any;
  username = localStorage.getItem('username');

  // @ts-ignore
  form: FormGroup;

  // @ts-ignore
  userForm: FormGroup;

  selectedPage:number=0;

  passwordSaved:boolean=false;
  profileSaved:boolean=false;


  constructor(
    private service: UserService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      firstname: [''],
      lastname: [''],
    });

    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required],
    });

    this.profile = this.service.getProfile().subscribe(data=>{
      this.profile = data;

      console.log(this.profile);

      // If there is an error then it means profile is not yet created
      this.form.setValue({
        firstname: data.firstname,
        lastname: data.lastname,
      });
    })
  }

  onClickChangeName(): any {
    let firstname = this.form.get('firstname')?.value
    let lastname = this.form.get('lastname')?.value
    
    let self = this;
    this.service.changeName(firstname, lastname).subscribe({
      next(data) { 
        self.form.setValue({
          firstname: data.firstname,
          lastname: data.lastname,
        });

        self.profileSaved=true;
      },
      error(err) { console.log(err);  },
      complete() {  }
    });
  }

  onSetPage(page:number) {
    this.selectedPage=page;
    console.log(this.selectedPage)
  }

  onChangePassword() {
    let password = this.userForm.get('password')?.value
    let confirm = this.userForm.get('confirm')?.value

    if(password != confirm) {
      this.userForm.controls['confirm'].setErrors({confirm:'Passwod does not match'})
    } else {
      let self=this;
      this.service.changePassword(password).subscribe({
        next(res) { self.passwordSaved=true; },
        error(err) { console.log(err) },
        complete() { }
      });
    }
  }

}
