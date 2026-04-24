import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { CustomizeItemDetailsComponent } from "../customize-item-details/customize-item-details.component";
import { DeleteDialogComponent } from "../../common-dialog/delete-dialog/delete-dialog.component";

export interface PeriodicElement1 {
  s_no: number;
  item: string;
  price: string;
}



const ELEMENT_DATA1: PeriodicElement1[] = [
];

@Component({
  selector: "app-item-name",
  templateUrl: "./item-name.component.html",
  styleUrls: ["./item-name.component.css"],
})
export class ItemNameComponent {
  displayedColumns1: string[] = ["s_no", "item", "price", "action"];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getcostmiseList();
  }

  mymenulist: any;
  getcostmiseList() {
    this.api
      .get1(
        `customise/list?menuId=${this.activatedRoute.snapshot.params["id"]}`
      )
      .subscribe({
        next: (res: any) => {
          this.mymenulist = res.data.data;
          this.dataSource1 = new MatTableDataSource(this.mymenulist);
          this.dataSource1.paginator = this.MatPaginator1;
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }

  deletecategory(data: any) {
    this.api
      .put1("customise/delete", { _id: data._id, isDeleted: true })
      .subscribe({
        next: (res: any) => {
          this.mymenulist = res.data;
          this.getcostmiseList();
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
      return data.name.toLowerCase().includes(filter);
    };
  }

  enableDisableadvertisement(id: any, status: MatSlideToggleChange) {
    const eventstatus = status.checked ? true : false;
    let data = {
      _id: id,
      status: eventstatus,
    };
    this.api.put1(`customise/changeStatus`, data).subscribe({
      next: (res: any) => {
        if (status.checked) {
          this.toaster.error("Customize Item enable successfully ");
        } else {
          this.toaster.success(" Customize Item disable successfully");
        }
        this.getcostmiseList();
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }
  searchKey:any
  addDialog(enterAnimationDuration: string, exitAnimationDuration: string):void {
    const dialogRef = this.dialog.open(CustomizeItemDetailsComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { menuId: this.activatedRoute.snapshot.params["id"] },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getcostmiseList();
      this.searchKey=""
    });
  }

  editCustamizeItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any
  ) {
    const dialogRef = this.dialog.open(CustomizeItemDetailsComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { cusomizeItemData: element },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getcostmiseList();
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
