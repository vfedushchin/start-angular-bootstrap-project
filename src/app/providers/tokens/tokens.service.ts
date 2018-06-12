import {Injectable} from '@angular/core';
import {DataAccessService} from '../data-access/data-access.service';
import {environment} from '../../../environments/environment';
import {RetrieveTokenList} from '../../models/tokens/retrieveTokenList';
import {RetrieveTokenDetails} from '../../models/tokens/retrieveTokenDetails';


@Injectable()
export class TokensService {
  public requestInProgress: boolean;
  public tokensList: RetrieveTokenList[] = [];
  public tokensDetails: RetrieveTokenDetails = new RetrieveTokenDetails();

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


  getTokenDetails(id: string) {
    this.requestInProgress = true;
    /*TODO when response structure will be similar to other - change to getApiRequest*/
    this.dataAccess.getApiRequest2(environment.rest_endpoint.retrieveTokensDetails + "/" + id)
      .finally(() => this.requestInProgress = false)
      .subscribe((res) => {
          this.tokensDetails = res.body;
          console.log("Token details");
          console.log(this.tokensDetails);
          /*if (res.success) {
            console.log("Token details");
            console.log(res);
            this.tokensDetails = res.data;
          }*/
        }
      );
  }


}
