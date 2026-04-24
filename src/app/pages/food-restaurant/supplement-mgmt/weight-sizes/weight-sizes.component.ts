import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

export interface PeriodicElement1 {
  s_no: number;
  weight: string;
  quantity: string;
  price: string;
  price_selling:string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
 {s_no:1,weight:'Lorem',quantity:'Lorem',price:'Lorem',price_selling:'Lorem'},
 {s_no:1,weight:'Lorem',quantity:'Lorem',price:'Lorem',price_selling:'Lorem'},
 {s_no:1,weight:'Lorem',quantity:'Lorem',price:'Lorem',price_selling:'Lorem'},

];
@Component({
  selector: 'app-weight-sizes',
  templateUrl: './weight-sizes.component.html',
  styleUrls: ['./weight-sizes.component.css']
})
export class WeightSizesComponent {
  displayedColumns1: string[] = [
    "s_no",
   "weight",
    "quantity",
    "price",
    "price_selling",
    "action"
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }
  newid:any
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.newid= params['data'];
console.log(this.newid)     
    
    });
  }
  ngOnInit() {
   this.viewSizeApi()
  }
  viewSizeData:any
  viewSizeApi() {
      this.api.get1(`supplementMgmt/viewSupplement/${this.newid} `).subscribe({
      next: (res: any) => {

      this.viewSizeData = res.data['stock'];
         this.dataSource1= new MatTableDataSource(this.viewSizeData);
       this.dataSource1.paginator = this.MatPaginator1;
      },
      error: (err: any) => {
        this.toaster.error(err.error.message);
      }
    });
  }
  blockedWeight(id: any, event: MatSlideToggleChange) {
    const statusvalue = event.checked ? true: false
    let data = {
      supplementId:this.newid,
      stockId:id,
      isActive:statusvalue
  }
     this.api.patch1(`supplementMgmt/BlockSupplementStock`, data).subscribe({
       next: (res: any) => {
          if (event.checked) {
            this.toaster.success('Size Unblocked Successfully');
          } else {
            this.toaster.error('Size Blocked Successfully');
          }
 
       },
       error: (err: any) => {
         this.toaster.error(err.error?.message)
       }
     })
   }



}
