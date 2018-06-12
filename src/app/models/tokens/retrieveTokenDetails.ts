export class RetrieveTokenDetails {
  id: string;
  ownerId: string;
  name: string;
  icon: string;
  description: string;
  contractHash: string;
  contractAddress: string;
  symbol: string;
  decimals: number;
  total: number;
  price: string;
  blockchain: string;

  constructor() {
    this.id = '';
    this.ownerId = '';
    this.name = '';
    this.icon = '';
    this.description = '';
    this.contractHash = '';
    this.contractAddress = '';
    this.symbol = '';
    this.price = '';
    this.blockchain = '';
    this.total = 0;
    this.decimals = 0;
  }
}
