import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss']
})
export class MoneyTransferComponent implements OnInit {

  tc: any;
  moneyTransfer: any[] = [];

  constructor(
    public appService: AppService,
    private authenticationService: AppService) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.tc = localStorage.getItem("tc");
    this.getMoneyTransfer(currentUser.token, this.tc);
  }

  getMoneyTransfer(token, tcs) {
    var config = {
      headers: {'token': "" + token}
    };
    
    var bodyParameters = {
      tc: parseInt(tcs),
    }
    
    axios.post( 
      'https://stuxnetapi.herokuapp.com/api/account/listofmoneytransfers ',
      bodyParameters,
      config
    ).then((response) => {
      this.moneyTransfer = response.data.recordset;
      console.log("test _>", response, 'win', this.moneyTransfer); // bitince uçur burayı
    }).catch((error) => {
      console.log(error)
    });
    console.log(this.moneyTransfer);
  }


}
