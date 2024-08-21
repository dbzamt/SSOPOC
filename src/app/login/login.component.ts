import { Component, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { loginClient } from 'login-sdk/lib/esm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router
   
  ) {}
  username: String = "" ;
  title = 'customer-sdk';
 alreadyLoggedIn = false;
  ngOnInit() {
    loginClient.init().then(res => {
       this.isLoggedIn();
    })
  }
  isLoggedIn() {
    loginClient.isLoggedIn().then(res=>{
      console.log("logged in",res);
      if(res.tokens){
          this.alreadyLoggedIn = true;
      }
    });
  }

  sendOtp(){
    loginClient.signInFromBrowser().then(res=>{
      console.log('res',res)
      if(!res.data.isSignedIn){
        loginClient.createNewPassword("Welcome@12345");
      }else{
        this.alreadyLoggedIn = true;
      }
    })
  }

}
