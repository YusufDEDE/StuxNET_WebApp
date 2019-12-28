import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/utils/services/app.service';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  url:string = 'https://stuxnetapi.herokuapp.com';
  success:any;

  tc:any;
  pw:string;
  rePw:string;
  firstName:string;
  lastName:string;
  birthDate:string;
  address:string;
  phone:string;
  mail:string;

  registerForm: FormGroup;
  register:any;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    public appService: AppService,
    private authenticationService: AppService,
    private alertService: ToastrService,
    private router:Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      tc:['',Validators.required],
      pw:['',Validators.required],
      rePw:['',Validators.required],
      firstName:['',Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      mail:['', Validators.required]
     });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("ASDASD  " + this.f.tc.value + this.f.firstName.value + this.f.pw.value + this.f.lastName.value + this.f.rePw.value + this.f.address.value + this.f.phone.value + this.f.mail.value );
    if(this.f.firstName.value == "" || this.f.lastName.value == "" || this.f.address.value == "" || this.f.phone.value == "" || this.f.mail.value == "" || this.f.pw.value != this.f.rePw.value){
      this.alertService.error("Lütfen bilgileri boşluk bırakmadan doğru giriniz!");
    }else{      
      //this.tc = localStorage.getItem("tc");  
      this.registerAdd( 
        this.f.tc.value, 
        this.f.pw.value, 
        this.f.firstName.value,             // TEk kontrol yapıcam
        this.f.lastName.value,
        this.f.birthDate.value,
        this.f.address.value,
        this.f.phone.value,
        this.f.mail.value);
      this.f.tc.setValue('');
      this.f.pw.setValue('');
      this.f.rePw.setValue('');
      this.f.firstName.setValue('');
      this.f.lastName.setValue('');
      this.f.birthDate.setValue('');
      this.f.address.setValue('');
      this.f.phone.setValue('');
      this.f.mail.setValue('');
      this.f.phone.setValue('');
    }
  }

  registerAdd( tc, pw, firstName, lastName,birthDate,address,phone,mail) {
    console.log(tc, pw, firstName,lastName,birthDate,address,phone,mail)

    var bodyParameters = {
      tc: parseInt(tc),
      pw: pw,
      firstName: firstName,
     lastName: lastName,
     birthDate:birthDate,
     address: address,
     phone : phone,
     mail:mail
    }
    axios.post(this.url+'/register',
      bodyParameters 

    ).then((response) => {
      console.log("res data"+response)
      this.success = response.data;
      console.log(response.data);
      if(!this.success || response.data.status == 500){
        this.alertService.error("Kayıt başarısız!");
      }else{
        this.alertService.success("Kayıt başarılı!");
        this.router.navigate['/login'];
      }
      console.log("register_> ", this.success);
    }).catch((error) => {
      console.log(error)
    });
  }

}
