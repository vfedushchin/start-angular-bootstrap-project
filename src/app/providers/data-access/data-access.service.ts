import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {DataShareService} from '../data-share/data-share.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Router} from '@angular/router';

@Injectable()
export class DataAccessService {

  constructor(public http: HttpClient,
              private router: Router,
              public dataShare: DataShareService) { }

  public getApiRequest(endpoint: string): Observable<any> {

    return this.http.get(endpoint, this.getRequestOptions())
      .map((res) => this.extractData(res))
      .catch(this.handleError);
  }

  public postApiRequest(endpoint: string, request: any): Observable<any> {

    return this.http.post(endpoint, request, this.getRequestOptions())
      .map((res) => this.extractData(res))
      .catch(this.handleError);
  }

  public uploadFile(fileToUpload: File, endpoint: string, type: string): Observable<any> {
    const params = {type: type};
    const formData: FormData = new FormData();
    formData.append('mediaData', fileToUpload, fileToUpload.name);
    formData.append('params', JSON.stringify(params));
    formData.append( 'type', type);
    return this.http.post(endpoint, formData, this.getRequestOptions('media'))
      .map(this.extractData)
      .catch(this.handleError);
  }

  public putApiRequest(endpoint: string, request: any): Observable<any> {

    return this.http.put(endpoint, request, this.getRequestOptions())
      .map((res) => this.extractData(res))
      .catch(this.handleError);
  }

  public deleteApiRequest(endpoint: string): Observable<any> {

    return this.http.delete(endpoint, this.getRequestOptions())
      .map((res) => this.extractData(res))
      .catch(this.handleError);
  }

  private getRequestOptions(type?: string) {

    const options: any = {};
    let httpHeader: HttpHeaders = new HttpHeaders();
    if (type != 'media') {
      httpHeader = httpHeader.append('Content-Type', 'application/json');
    }
    const accessToken = this.dataShare.getAccessToken();
    if (!DataShareService.isNullOrEmpty(accessToken)) {
      //httpHeader = httpHeader.append('Authorization', accessToken.toString());
      httpHeader = httpHeader.append('jwt', accessToken.toString());
    }

    const dateIs = new Date().toString();
    httpHeader = httpHeader.append('x-browser-time', dateIs);
    options.headers = httpHeader;
    options.observe = 'response';
    return options;

  }

  private extractData(res) {
    const body = res.body;

    this.checkTokenError(body.error);

    if (!body.success && res.status == 200) {
        throw Observable.throw(new Error(body.error ? body.error : 'Server error, please try again'));
    }
    return body || {};
  }

  private checkTokenError(message: string) {
    if (!message || !message.length) return;

    if (message.toLowerCase() == 'invalid jwt token'
      || message.toLowerCase() == 'invalid token'
      || message.toLowerCase() == 'user not found'
      || message.toLowerCase().startsWith('need 2fa')) {

      this.dataShare.setAccessToken(null);
      this.router.navigate(['login']);
    }
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errMsg = error.error.message;
    } else if (error.error instanceof Error) {
      // Server error must be checked manually
      throw Observable.throw(error.error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        error,
        `Backend returned code ${error.status}, ` +
        `body was: ${ error.error.error}`);
      throw Observable.throw('Connection error');
    }
    return error.error;
  }

}
