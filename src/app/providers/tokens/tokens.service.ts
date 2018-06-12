import {Injectable} from '@angular/core';
import {DataAccessService} from '../data-access/data-access.service';
import {environment} from '../../../environments/environment';
import {RetrieveTokenList} from '../../models/tokens/retrieveTokenList';


@Injectable()
export class TokensService {
  public requestInProgress: boolean;
  public tokensList :RetrieveTokenList[] = [];

  constructor(private dataAccess: DataAccessService) {
  }

  getTokensList() {
    this.requestInProgress = true;
    this.dataAccess.getApiRequest(environment.rest_endpoint.retrieveTokensList)
      .finally(() => this.requestInProgress = false)
      .subscribe((res) => {
          if (res.success) {
            console.log("Token list request");
            console.log(res);
            this.tokensList = res.data;
          }
        }
      );
  }
}
