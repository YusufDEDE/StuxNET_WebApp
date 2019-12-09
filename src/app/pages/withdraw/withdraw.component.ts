import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  url:string = 'https://stuxnetapi.herokuapp.com';
  success:any;
  tc:any;
  additNo:number;
  withDraw:any;
  accounts:any [] = [];

  withDrawForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService,
    private authenticationService: AppService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {

    this.withDrawForm = this.formBuilder.group({
      additionalNo:[''],
      withDraw: ['', Validators.required]
     });

    const currentUser = this.authenticationService.currentUserValue;
    this.tc = localStorage.getItem("tc");
    //this.depositAdd(currentUser.token, this.tc, 1017, 100);
    this.getAccount(currentUser.token, this.tc);
  }

  get f() { return this.withDrawForm.controls; } 

  getAccountInfo(additNo:number, withdraw:number){
    console.log(additNo, withdraw);
  }

  onSubmit() {
    if(this.f.withDraw.value == 0 || this.f.additionalNo.value == 0 || this.f.withDraw.value <1){
      this.alertService.error("Lütfen bilgileri boşluk bırakmadan doğru giriniz!");
    }else{
      const currentUser = this.authenticationService.currentUserValue;
      this.tc = localStorage.getItem("tc");
      this.withDrawAdd(currentUser.token, this.tc, this.f.additionalNo.value, this.f.withDraw.value);
      this.f.additionalNo.setValue('');
      this.f.withDraw.setValue('');
    }
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

  withDrawAdd(token, tc, additNo, withdraw) {
    var config = {
      headers:{'token': "" + token}
    }
    var bodyParameters = {
      tc: parseInt(tc),
      additNo: parseInt(additNo),
      withdrawal: parseFloat(withdraw),
    }
    axios.post(this.url+'/api/account/withdraw',
      bodyParameters,
      config
    ).then((response) => {
      console.log(response.data);
      this.success = response.data.recordset[0];
      if(!this.success || parseInt(withdraw) < 1){
        this.alertService.error("Para çekme işlemi başarısız!");
      }else{
        this.alertService.success("Para çekme işlemi başarılı!");
      }
      console.log("withdraw_> ", this.success);
    }).catch((error) => {
      console.log(error)
    });
  }

}
