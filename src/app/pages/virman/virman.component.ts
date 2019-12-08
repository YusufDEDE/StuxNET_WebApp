import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-virman',
  templateUrl: './virman.component.html',
  styleUrls: ['./virman.component.scss']
})
export class VirmanComponent implements OnInit {

  url:string = 'https://stuxnetapi.herokuapp.com';
  success:any;
  tc:any;
  additNo:number;
  virman:any;
  accounts:any [] = [];
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService,
    private authenticationService: AppService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      tc: ['', Validators.required],
      pw: ['', Validators.required]
     });

    const currentUser = this.authenticationService.currentUserValue;
    this.tc = localStorage.getItem("tc");
    //this.depositAdd(currentUser.token, this.tc, 1017, 100);
    this.getAccount(currentUser.token, this.tc);
  }

  get f() { return this.loginForm.controls; } 

  getAccountInfo(additNo:number, deposit:number){
    console.log(additNo, deposit);
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

  virmanAdd(token, tc, additNo, virman) {
    var config = {
      headers:{'token': "" + token}
    }
    var bodyParameters = {
      tc: parseInt(tc),
      additNo: parseInt(additNo),
      virman: parseFloat(virman),
    }
    axios.post(this.url+'/api/account/deposit',
      bodyParameters,
      config
    ).then((response) => {
      
      this.success = response.data.recordset[0];
      if(!this.success || parseInt(virman) < 1){
        this.alertService.error("Virman işlemi başarısız!");
      }else{
        this.alertService.success("Virman işlemi başarılı!");
      }
      console.log("virman_> ", this.success);
    }).catch((error) => {
      console.log(error)
    });
  }


}
