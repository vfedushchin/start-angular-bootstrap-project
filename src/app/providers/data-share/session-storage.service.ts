import {LocalStorageService} from 'angular-2-local-storage';
import {Injectable} from '@angular/core';

@Injectable()
export class SessionStorageService extends LocalStorageService {
  constructor () {
    super({ storageType: 'sessionStorage' });
  }
}
