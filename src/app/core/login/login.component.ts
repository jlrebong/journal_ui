import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  showErrorMessage:boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      keep: [false],
    });
  }

  onSubmit() {
    let email    = this.form.get('username')?.value;
    let password = this.form.get('password')?.value;
    let keep     = this.form.get('keep')?.value;
    let self = this;


    this.service.login(email, password, keep).subscribe({
      next(res) { self.router.navigateByUrl('home'); },
      error(err) { self.showErrorMessage = true; },
      complete() {  }
    });
  }

}
