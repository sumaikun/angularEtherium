export class BillItem
{
  quantity:number = 0;
  description:string = "";
  date:string = "";
  size:string = "";
  weigth:string = "";
  total:number = 0;
  service:number = 0;
  constructor(){}
  reset(){
    this.quantity = 0;
    this.description = "";
    this.size = "";
    this.weigth = "";
    this.total = 0;
    this.service = 0;
  }
}
