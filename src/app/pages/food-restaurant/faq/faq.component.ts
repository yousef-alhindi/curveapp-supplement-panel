import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
   
  ) {}

  ngOnInit() {
    this. getFaqList()
  }


  FaqList: any;
  getFaqList() {
    this.api.get1(`cms/faqList?service=3`).subscribe({
      next: (res: any) => {
        this.FaqList = res.data;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }


}
