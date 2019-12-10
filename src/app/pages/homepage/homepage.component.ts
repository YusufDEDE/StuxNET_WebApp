import { Component, OnInit } from '@angular/core';
import { Rate } from './rate';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  path:string="https://web-paragaranti-pubsub.foreks.com/web-services/securities/exchanges/BIST/groups/E"
  
  rates:Rate[];

  ngOnInit() {
    this.httpClient.get<Rate[]>(this.path).subscribe(response =>{
      this.rates=response;
    })
  }

}
