import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import axios from 'axios';

@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.scss']
})
export class AccountlistComponent implements OnInit {

  url:string = 'https://stuxnetapi.herokuapp.com';
  accounts:any [] = [];
  tc:any;
  
  constructor(
    public appService: AppService,
    private authenticationService: AppService
  ) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.tc = localStorage.getItem("tc");
    console.log("tc", this.tc);
    this.getAccount(currentUser.token, this.tc);
  }

  getAccount(token, tc) {
    var config = {
      headers:{'token': "" + token}
    }
    var bodyParameters = {
      tc: parseInt(tc),
    }

    axios.post(this.url+'/api/account',
      bodyParameters,
      config
    ).then((response) => {
      this.accounts = response.data;
      console.log("account_> ", this.accounts);
    }).catch((error) => {
      console.log(error)
    });
  }

}
