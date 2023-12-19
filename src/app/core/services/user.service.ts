import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import * as moment from "moment";
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  login(email:string, password:string, keep:boolean) {
    let data = {
      "username": email,
      "password": password,
      "keep": keep == true? 1 : 0
    }
    return this.post(data, '/login')
    .pipe(map((res:any) => this.setSession(res)));
  }

  register(email:string, password:string) {
    let data = {
      "username": email,
      "password": password
    }
    return this.post(data, '/register');
  }

  changeName(firstname:string, lastname:string) {
    let user_id = localStorage.getItem('userid');
    let data = {
      "user_id": user_id,
      "firstname": firstname,
      "lastname": lastname
    }
    return this.post(data, '/profile');
  }

  changePassword(password:string) {
    let username = localStorage.getItem('username');
    let data = {
      "username": username,
      "password": password,
      "keep": 1
    }
    return this.post(data, '/changepassword');
  }

  getUser() {
    let username = localStorage.getItem('username');
    return this.get('/user/' + username);
  }

  getUsers() {
    return this.get('/users');
  }

  getProfileByUserId(user_id:any) {
    return this.get('/profile/' + user_id);
  }

  getProfile() {
    let user_id = localStorage.getItem('userid');
    return this.get('/profile/' + user_id);
  }

  logout() {
    localStorage.removeItem("access_token");
  }

  setSessionProfileData(profile:any) {
    localStorage.setItem('profile.id', profile.id);
    localStorage.setItem('firstname', profile.firstname);
    localStorage.setItem('lastname', profile.lastname);
    localStorage.setItem('profile_pic', profile.profile_pic);
  }

  getSessionProfileData() {
    let profile = {
      id: localStorage.getItem('profile.id'),
      firstname: localStorage.getItem('firstname'),
      lastname: localStorage.getItem('lastname'),
      profile_pic: localStorage.getItem('profile_pic'),
    }

    return profile;
  }

  isLoggedIn() {
    let token = localStorage.getItem('access_token');

    if (!token) return false;

    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }


  private setSession(jwt_token: any) {
    if (jwt_token.hasOwnProperty("access_token")) {
      localStorage.setItem('userid', jwt_token.userid);
      localStorage.setItem('username', jwt_token.username);
      localStorage.setItem('access_token', jwt_token.access_token);
      localStorage.setItem('refresh_token', jwt_token.refresh_token);
      return true;
    }
    return false;
  }

  

}
