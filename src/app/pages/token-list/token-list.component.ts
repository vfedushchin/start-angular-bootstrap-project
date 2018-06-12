import { Component, OnInit } from '@angular/core';
import {TokensService} from '../../providers/tokens/tokens.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  constructor(public tokenService: TokensService) { }

  ngOnInit() {
    this.tokenService.getTokensList();
  }

}
