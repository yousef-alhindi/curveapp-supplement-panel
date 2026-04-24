import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { AddDialogComponent } from "../common-dialog/add-dialog/add-dialog.component";
import { DeleteDialogComponent } from "../common-dialog/delete-dialog/delete-dialog.component";

export interface PeriodicElement1 {
  s_no: number;
  category: string;
  created: string;
  items: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
 
];

@Component({
  selector: "app-menu-mgmt",
  templateUrl: "./menu-mgmt.component.html",
  styleUrls: ["./menu-mgmt.component.css"],
})
export class MenuMgmtComponent {
  [x: string]: any;

  displayedColumns1: string[] = [
    "s_no",
    "category",
    "created",
    "items",
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
    this.getcategoryList();
    this.getdeliverychargeList();
  }

  mymenulist: any;
  getcategoryList() {
    this.api.get1("category/list").subscribe({
      next: (res: any) => {
        this.mymenulist = res.data["getCategory"];
        this.dataSource1 = new MatTableDataSource(this.mymenulist);
        this.dataSource1.paginator = this.MatPaginator1;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }



 chargekist: any;
 getdeliverychargeList() {
   this.api.get1("deliveryCharge/list").subscribe({
     next: (res: any) => {
       this.chargekist = res.data;
      
     },
     error: (err: any) => {
       console.log(err.error.message);
     },
   });
 }

  deletecategory(data: any) {
    this.api
      .put1("category/delete", { _id: data._id, isDeleted: true })
      .subscribe({
        next: (res: any) => {
          this.mymenulist = res.data;
          this.getcategoryList()
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource1.filter = filterValue;
    
    this.dataSource1.filterPredicate = (data: any, filter: string) => {
      // Assuming 'someProperty' is the field you want to filter on
      return data.resCategory.toLowerCase().includes(filter);
    };
  }
  
  searchKey:any
  addDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    type: any,
    element:any

  ): void {
    const dialogRef=this.dialog.open(AddDialogComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { type ,element},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    this.getcategoryList();
      this.searchKey=""
    this.getdeliverychargeList()
    });

  }

  

  gotoSubcategory(item: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/supplement/menu-mgmt/category-name/${item.resCategory}/${item._id}`]);
    });
  }

  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, element:any): void {
    const dialogRef= this.dialog.open(DeleteDialogComponent, {
      width: "400px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration
      
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'yes') {
        this.deletecategory(element);
      }
      });
  }

}
