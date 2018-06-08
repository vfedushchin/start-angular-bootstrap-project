import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {SessionStorageService} from './session-storage.service';

@Injectable()
export class DataShareService {

  private remember: boolean = true;

  constructor(private localStorage: LocalStorageService,
              private sessionStorage: SessionStorageService) {
  }

  setAccessToken(token: string, remember?: boolean) {
    this.remember = remember;

    if (token) {
      if (remember) {
        this.localStorage.set('accesstoken', token);
      } else {
        this.sessionStorage.set('accesstoken', token);
      }
    } else {
      this.localStorage.remove('accesstoken');
      this.sessionStorage.remove('accesstoken');
    }
  }

  getAccessToken(): string {
    if (!DataShareService.isNullOrEmpty(this.sessionStorage.get('accesstoken'))) {
      return this.sessionStorage.get<string>('accesstoken');
    }

    if (!DataShareService.isNullOrEmpty(this.localStorage.get('accesstoken'))) {
      return this.localStorage.get<string>('accesstoken');
    } else {
      return null;
    }
  }

  static isNullOrEmpty(_val): boolean {
    return _val == undefined || _val == null || _val == '';
  }

  downloadFile(sUrl) {
    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
      alert('Your device do not support files downloading. Please try again in desktop browser.');
      return false;
    }

    const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    //If in Chrome or Safari - download via virtual link click
    if (isChrome || isSafari) {
      //Creating new link node.
      const link = document.createElement('a');
      link.href = sUrl;
      link.target = '_blank';

      if (link.download !== undefined) {
        //Set HTML5 download attribute. This will prevent file from opening if supported.
        const fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
        link.download = fileName;
      }

      //Dispatching click event.
      if (document.createEvent) {
        const e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
    }

    // Force file download (whether supported by server).
    const query = '?download';

    window.open(sUrl + query, '_self');
  }
}
