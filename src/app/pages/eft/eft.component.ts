import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-eft',
  templateUrl: './eft.component.html',
  styleUrls: ['./eft.component.scss']
})
export class EftComponent implements OnInit {

  url:string = 'https://stuxnetapi.herokuapp.com';
  success:any;
  tc:any;
  additNo:number;
  eft:any;
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

  getAccountInfo(additNo:number, withdraw:number){
    console.log(additNo, withdraw);
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
      console.log("virman_> ", this.accounts);
    }).catch((error) => {
      console.log(error)
    });
  }

  eftAdd(token, tc, additNo, eft) {
    var config = {
      headers:{'token': "" + token}
    }
    var bodyParameters = {
      tc: parseInt(tc),
      additNo: parseInt(additNo),
      eft: parseFloat(eft),
    }
    axios.post(this.url+'/api/account/withdraw',
      bodyParameters,
      config
    ).then((response) => {
      
      this.success = response.data.recordset[0];
      if(!this.success || parseInt(eft) < 1){
        this.alertService.error("EFT işlemi başarısız!");
      }else{
        this.alertService.success("EFT işlemi başarılı!");
      }
      console.log("eft_> ", this.success);
    }).catch((error) => {
      console.log(error)
    });
  }

}
