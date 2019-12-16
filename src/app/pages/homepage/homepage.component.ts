import { Component, OnInit } from '@angular/core';
import { Rate } from './rate';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  url:string = 'https://stuxnetapi.herokuapp.com';
  credit:any;
  age:any;
  home:any;
  creditCount:any;
  phoneState:any;

  decisionRes:any[] = [];

  predictForm: FormGroup;

  constructor(
    private httpClient:HttpClient,
    private formBuilder: FormBuilder,
    private alertService: ToastrService,
    ) { }

  path:string="https://web-paragaranti-pubsub.foreks.com/web-services/securities/exchanges/BIST/groups/E"
  
  rates:Rate[];

  ngOnInit() {

    this.predictForm = this.formBuilder.group({
      credit: ['', Validators.required],
      age: ['', Validators.required],
      home: ['', Validators.required],
      creditCount: ['', Validators.required],
      phoneState: ['', Validators.required],
     });

    this.httpClient.get<Rate[]>(this.path).subscribe(response =>{
      this.rates=response;
    })
  }
  
  get f() { return this.predictForm.controls; } 

  onSubmit() {
    console.log("predict form", 
      this.f.credit.value, 
      this.f.age.value, 
      this.f.home.value,
      this.f.creditCount.value,
      this.f.phoneState.value
      );

  }

}
