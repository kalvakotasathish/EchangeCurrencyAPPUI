import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject, Injectable } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exchangeCurrencyApp';
  constructor(private http: HttpClient) { }
  //users: Todo[];
   restItemsUrl = "http://localhost:8080/exchangeService/currentRate";
 headers:any;
    result:any;
    currentExchangeCurrency = false;
    historyExchangeCurrency=false;
    historyExchangeCurrencyResult=[];
     o : any[];
    dA = [];
    dates = ['Currency'];
    rows = [];

  ngOnInit() {
    
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("admin" + ':' + "password") });

    this.http.get(this.restItemsUrl,{headers}).subscribe( (data: any) => {
      if(data!=null){
        this.result=data.rates;
      this.currentExchangeCurrency=true;

       
 }});
    this.historyCurrency();

    }

    historyCurrency(){

      let historyCurrencyUrl = "http://localhost:8080/exchangeService/historyRates";

      this.http.get(historyCurrencyUrl).subscribe( (data: any) => {
        if(data!=null){

          this.o  = data.map( el => JSON.parse(el))
          this.o.forEach( l => {
          let {rates} = l;
          this.dates.push(l.date)
          for(let j in rates) {
            if(this.dA[j]) {
              this.dA[j].push(rates[j]);
              }
          else {
            this.dA[j] = [j, rates[j]];
          }
      }
    
});

    for(let i in this.dA) {
      this.rows.push(this.dA[i]);
      }
          this.historyExchangeCurrency=true;
          this.currentExchangeCurrency=true;
        }});
  

    }
  }