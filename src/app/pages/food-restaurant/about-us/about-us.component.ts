import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
   
  ) {}

  ngOnInit() {
    this. getaboutusList()
  }


  aboutusData: any;
  getaboutusList() {
    this.api.get1(`cms?type=1&service=3`).subscribe({
      next: (res: any) => {
        this.aboutusData = res.data.description;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

}
