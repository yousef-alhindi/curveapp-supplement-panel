import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { WebStorageService } from 'src/app/service/web-storage.service';

@Component({
  selector: 'app-profile-created-rejected',
  templateUrl: './profile-created-rejected.component.html',
  styleUrls: ['./profile-created-rejected.component.css']
})
export class ProfileCreatedRejectedComponent implements OnInit {
  restaurantDetails:any

  constructor(private api:ApiService,
    private session:WebStorageService,
    private router:Router,
    private toastr:ToastrService
  ){

  }
  ngOnInit(): void {
    this.restaurantDetails = JSON.parse(
      this.session.getSessionStorage("curve-restaurants") || ""
    );
  }

  
  
  
  getRejected(){
    
    if(this.restaurantDetails.restaurantStatus==0){
      this.toastr.warning("profile is in pending from admin side")
      this.router.navigateByUrl("/pending")
     
    }
    else if(this.restaurantDetails.restaurantStatus==2){
      this.router.navigateByUrl("/food/dashboard")
      return
    }
    this.router.navigateByUrl("/food/dashboard")
    return false
  }
  
}
