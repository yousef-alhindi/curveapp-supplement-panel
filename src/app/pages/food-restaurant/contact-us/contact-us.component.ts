import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
   
  ) {}

  ngOnInit() {
    this. getContactList()
  }


  ContactList: any;
  getContactList() {
    this.api.get1(`cms?type=4&service=3`).subscribe({
      next: (res: any) => {
        this.ContactList = res.data;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

}
