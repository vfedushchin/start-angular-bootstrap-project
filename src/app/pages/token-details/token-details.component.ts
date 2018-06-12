import {Component, OnInit} from '@angular/core';
import {TokensService} from '../../providers/tokens/tokens.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.scss']
})
export class TokenDetailsComponent implements OnInit {
  selectedTokenId: string;

  constructor(private activatedRoute: ActivatedRoute,
              public tokenService: TokensService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedTokenId = params['id'];

      console.log("selectedTokenId= ");
      console.log(this.selectedTokenId);

    });
  }

  ngOnInit() {
    this.tokenService.getTokenDetails(this.selectedTokenId);
  }

}
