import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { AddDialogComponent } from "../common-dialog/add-dialog/add-dialog.component";
import { DeleteDialogComponent } from "../common-dialog/delete-dialog/delete-dialog.component";
import { DescriptionViewDialogComponent } from "./description-view-dialog/description-view-dialog.component";
import { ImageViewDialogComponent } from "./image-view-dialog/image-view-dialog.component";
import { DeliveryChargesComponent } from "./delivery-charges/delivery-charges.component";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { elementAt } from "rxjs";

export interface PeriodicElement1 {
  s_no: number;
  supplement_type: string;
  name: string;
  brand_name: string;
  created:string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
 {s_no:1,supplement_type:'Lorem',name:'Lorem',brand_name:'Lorem',created:'Lorem'}
];
@Component({
  selector: 'app-supplement-mgmt',
  templateUrl: './supplement-mgmt.component.html',
  styleUrls: ['./supplement-mgmt.component.css']
})
export class SupplementMgmtComponent {

  displayedColumns1: string[] = [
    "s_no",
    "supplement_type",
    "name",
    "brand_name",
    "size",
    "description",
    "images",
    "created",
    "action",
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
   this.getSupplementList({})
  }
  applyFilter(event: any) {
    this.searchHome = event.target.value;
    this.getSupplementList({});
  }
  searchHome: string = "";
  currentTabIndex: number = 0;
  totalLength: any;
  onPageChange(event: any): void {
    // this.getpckgData({})
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getSupplementList({
      pageChange: true,
    });
  }
  page: number = 1;
  limit: number = 5;
  getSupplementList(event:any) {
    if (!event?.pageChange) {
      this.page = 1;
      this.limit = 15;
    }
    let searchQuery = this.currentTabIndex === 0 ? this.searchHome : "";
    this.api.get1(`supplementMgmt/getSupplementList?page=${this.page}&limit=${this.limit}&search=${searchQuery}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource1 = new MatTableDataSource(res.data["supplements"]);
        this.dataSource1.paginator = this.MatPaginator1;
        setTimeout(() => {
          this.MatPaginator1.length = res?.data.totalSupplemmentsCount;
          this.totalLength = res?.data.totalSupplemmentsCount;
          this.MatPaginator1.pageIndex = this.page - 1;
        });
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }
  blockedSupplement(id: any, event: MatSlideToggleChange) {
    const statusvalue = event.checked ? true: false
    let data = {
      supplementId:id,
      isBlocked:statusvalue
  }
     this.api.patch1(`supplementMgmt/blockSupplement`, data).subscribe({
       next: (res: any) => {
          if (event.checked) {
            this.toaster.success('Supplement Unblocked Successfully');
          } else {
            this.toaster.error('Supplement Blocked Successfully');
          }
 
       },
       error: (err: any) => {
         this.toaster.error(err.error?.message)
       }
     })
   }
   editSupplement(_id: any) {
    this.router.navigateByUrl('/supplement/supplement-mgmt/add-edit-supplement', { state: { data: _id } })
  
    }
    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource1.filter = filterValue.trim().toLowerCase();
  
    //   if (this.dataSource1.paginator) {
    //     this.dataSource1.paginator.firstPage();
    //   }
    // }

  chargesDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(DeliveryChargesComponent, {
      width: "700px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
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
      exitAnimationDuration,
    });
   
  }

  viewImg(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element:any
  ): void {
    this.dialog.open(ImageViewDialogComponent, {

      data: { element},
      width: "800px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,element:any): void {
   const dialogRef= this.dialog.open(DeleteDialogComponent, {
      data: {
        api: `supplementMgmt//deleteSupplementList/${element._id}`,
        
        },
      width: "400px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration
      
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.getSupplementList({});
    })

  }
  viewSize(id:any){
    this.router.navigate(['/supplement/supplement-mgmt/weight-sizes'], {
    queryParams: { data: id},
  });
  console.log(id)
}

}
