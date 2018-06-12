import {Injectable} from '@angular/core';
import {DataAccessService} from '../data-access/data-access.service';
import {Login} from '../../models/auth/accessUserRequest';
import {DataShareService} from '../data-share/data-share.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AccessUserData, AccessUserDataResponse} from '../../models/auth/accessUserResponse';

@Injectable()
export class AuthService {

  constructor(private dataAccess: DataAccessService,
              private dataShare: DataShareService,
              private router: Router) {
  }

  public signIn(email: string, password: string, code: string, isRemember: boolean): Promise<AccessUserData> {

    const login = new Login();
    login.phone = email;
    login.password = password;
    //login.code = code;

    return new Promise((resolve, reject) => {
      this.dataAccess.postApiRequest(environment.rest_endpoint.login, login)
        .subscribe((resp: AccessUserDataResponse) => {
          this.dataShare.setAccessToken(resp.data.token.token, isRemember);
          return resolve(resp.data);
        }, error => {
          return reject(error.error ? error.error.message : '');
        });
    });
  }

  public signOut(redirect?: boolean) {
    this.dataShare.setAccessToken(null);
    if (redirect) {
      this.router.navigate(['login']);
    }
  }

  public isAuthenticated(): boolean {
    const token = this.dataShare.getAccessToken();
    return !DataShareService.isNullOrEmpty(token);
  }

}
