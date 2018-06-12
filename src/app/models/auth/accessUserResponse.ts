import {Result} from '../result';

export class AccessUserDataResponse extends Result{
    data?: AccessUserData;
}

export class AccessUserData {
  token: {
    token: string;
  };
  two_fa_required: boolean;
}
