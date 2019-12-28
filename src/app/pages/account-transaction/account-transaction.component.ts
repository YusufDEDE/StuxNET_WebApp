import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrls: ['./account-transaction.component.scss']
})
export class AccountTransactionComponent implements OnInit {

  tc: any;
  accTransaction: any[] = [];

  constructor(
    public appService: AppService,
    private authenticationService: AppService) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.tc = localStorage.getItem("tc");
    this.getAccTransaction(currentUser.token, this.tc);
  }

  getAccTransaction(token, tcs) {
    var config = {
      headers: {'token': "" + token}
    };
    
    var bodyParameters = {
      tc: parseInt(tcs),
    }
    
    axios.post( 
      'https://stuxnetapi.herokuapp.com/api/account/accTransactions',
      bodyParameters,
      config
    ).then((response) => {
      this.accTransaction = response.data.recordset;
      console.log("test _>", response, 'win', this.accTransaction); // bitince uçur burayı
    }).catch((error) => {
      console.log(error)
    });
    console.log(this.accTransaction);
  }

}
