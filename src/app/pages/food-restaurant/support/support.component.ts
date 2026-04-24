import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddTicketComponent } from "./add-ticket/add-ticket.component";

@Component({
  selector: "app-support",
  templateUrl: "./support.component.html",
  styleUrls: ["./support.component.css"],
})
export class SupportComponent {
  currentUserId=""
  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if(sessionStorage.getItem('curve-restaurants')){
      let user:any=sessionStorage.getItem('curve-restaurants')
      user=JSON.parse(user)
      this.currentUserId=user?._id
    }
    this.getsupportList();
  }

  queryList: any=[];
  getsupportList() {
    this.api.get1(`support/list?service=2`).subscribe({
      next: (res: any) => {
        this.queryList = res?.data?.list;
        this.queryList = this.queryList.filter((f:any)=> f.userId==this.currentUserId)
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  addTicket(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef: MatDialogRef<AddTicketComponent> = this.dialog.open(
      AddTicketComponent,
      {
        width: "650px",
        height: "auto",
        maxHeight: "100vh",
        maxWidth: "90vw",
        disableClose:true,
        hasBackdrop:true,
        panelClass: "layout-dialog",
        enterAnimationDuration,
        exitAnimationDuration,
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result && result.success){
        this.getsupportList();
      }
    });
  }
}
