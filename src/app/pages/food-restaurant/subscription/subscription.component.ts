import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { PaymentDialogComponent } from '../common-dialog/payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {

  constructor( 
    public dialog : MatDialog,private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
   ){

  }

  ngOnInit() {
    this.getSubcriptinList()
    this.getMYSubcriptinList()
  }

  plans: any;
  getSubcriptinList() {
    this.api.get1('subscription/newList').subscribe({
      next: (res: any) => {
        this.plans = res.data.orderDetail;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  Myplans: any;
  getMYSubcriptinList() {
    this.api.get1('subscription/buyList').subscribe({
      next: (res: any) => {
        this.Myplans = res.data.orderDetail;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }







  buyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(PaymentDialogComponent,{
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration
    })
  }


}
