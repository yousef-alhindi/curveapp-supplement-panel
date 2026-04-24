import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent {
  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
   
  ) {}

  ngOnInit() {
    this. gettermandconditionList()
  }


  termconditonData: any;
  gettermandconditionList() {
    this.api.get1(`cms?type=2&service=3`).subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.termconditonData = res.data.description;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

}
