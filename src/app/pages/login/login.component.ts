import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../providers/auth/auth.service";
import {AccessUserData} from '../../models/auth/accessUserResponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginError: string;
  private loginErrorTimer: any;
  public requestInProgress: boolean;
  private passwordReseted: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      isRemember: ['']
    });
  }


  ngOnInit() {
    this.loginForm.reset();
  }

  doLogin() {
    this.loginError = null;
    clearTimeout(this.loginErrorTimer);
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email;
    const pwd = this.loginForm.value.password;

    /*Todo: need to delete it - data for default login*/
    //const email="79787268673";
    //const pwd="124124124";
    const isRemember = this.loginForm.value.isRemember;



    this.requestInProgress = true;
    this.authService.signIn(email, pwd, '', isRemember)
      .then(
        (result: AccessUserData)=> {
          console.log('Login Success', result);
          this.onSuccessfulLogin();
        },
        error => {
          this.loginError = error;
          this.loginErrorTimer = setTimeout(() => this.loginError = null, 10000);
        }
      )
      .then(() => this.requestInProgress = false);
  }

  onSuccessfulLogin() {
    this.router.navigate(['token-create']);
  }

}
