import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {


  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
   
  ) {}



  logout(){
  
      sessionStorage.removeItem('curve-restaurants') 
      this.router.navigateByUrl('/login')

    }



}
