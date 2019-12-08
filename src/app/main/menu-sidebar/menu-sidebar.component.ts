import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();

  win;
  constructor(
    public appService: AppService,
    private http : HttpClient,
    private authenticationService: AppService
    ) {}

    
  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    this.win = localStorage.getItem("currentUser");
    this.updateProfileInformation(currentUser.token);
  }
  
  createArticle(token){
    let httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        httpHeaders.append('Authorization','Bearer '+token);
       
    let options = {
        headers: httpHeaders
    };     
    console.log(options)   
    return this.http.post<any>('https://stuxnetapi.herokuapp.com/api/updateuserlist', options)
      .subscribe(res => console.log(res));
  }
  
  updateProfileInformation(token) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", 'Bearer ' + token);
    
    const tcs = localStorage.getItem('tc');
    var obj = { tc: parseInt(tcs) };
    
    
    var body = JSON.stringify(obj);
    console.log(headers);
    return this.http.post('https://stuxnetapi.herokuapp.com/api/updateuserlist', body, { headers: headers })
      .subscribe(res => console.log(res));
  }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
