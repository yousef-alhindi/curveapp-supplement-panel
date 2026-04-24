import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
   
  ) {}

  ngOnInit() {
    this. getPrivacyList()
  }


  PrivacyList: any;
  getPrivacyList() {
    this.api.get1(`cms?type=3&service=3`).subscribe({
      next: (res: any) => {
        if(res.data){
          this.PrivacyList = res.data.description;
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

}
