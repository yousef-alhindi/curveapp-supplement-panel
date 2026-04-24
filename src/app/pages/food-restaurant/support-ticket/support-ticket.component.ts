import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CreateSupportTicketComponent } from "./create-support-ticket/create-support-ticket.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { DescriptionViewDialogComponent } from "../supplement-mgmt/description-view-dialog/description-view-dialog.component";


export interface PeriodicElement1 {
  s_no: number;
  ticket_id: string;
  subject: string;
  submision_date:string;
  status:string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
 {s_no:1,ticket_id:'Lorem',subject:'Lorem',submision_date:'Lorem',status:'Lorem'}
];

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent {
  displayedColumns1: string[] = [
    "s_no",
    "ticket_id",
   
    "description",
    "submision_date",
    "status",
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }
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
    this.api.get1(`support/list?service=3`).subscribe({
      next: (res: any) => {
        this.queryList = res?.data?.list;
        this.queryList = this.queryList.filter((f:any)=> f.userId==this.currentUserId)
        this.dataSource1 = new MatTableDataSource(this.queryList);
        this.dataSource1.paginator = this.MatPaginator1;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  addTicket(){
    this.router.navigate(['support-ticket/create-support-ticket'])
  }
   descriptionView(
      enterAnimationDuration: string,
      exitAnimationDuration: string,
      element:any
    ): void {
  
      this.dialog.open(DescriptionViewDialogComponent, {
      
        data: { element},
        width: "600px",
        height: "auto",
        maxHeight: "100vh",
        maxWidth: "90vw",
        panelClass: "layout-dialog",
        enterAnimationDuration,
        exitAnimationDuration
      });
     
    }
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   const dialogRef: MatDialogRef<CreateSupportTicketComponent> = this.dialog.open(
  //     CreateSupportTicketComponent,
  //     {
  //       width: "650px",
  //       height: "auto",
  //       maxHeight: "100vh",
  //       maxWidth: "90vw",
  //       disableClose:true,
  //       hasBackdrop:true,
  //       panelClass: "layout-dialog",
  //       enterAnimationDuration,
  //       exitAnimationDuration,
  //     }
  //   );
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     if(result && result.success){
  //       this.getsupportList();
  //     }
  //   });
  // }
}
