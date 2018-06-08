import {Result} from '../result';

export class AccessUserDataResponse extends Result{
    data?: AccessUserData;
}

export class AccessUserData {
  token: string;
  two_fa_required: boolean;
}
