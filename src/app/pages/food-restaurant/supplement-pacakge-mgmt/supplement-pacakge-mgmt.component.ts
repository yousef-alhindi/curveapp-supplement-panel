import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewDescriptionDialogComponent } from "./view-description-dialog/view-description-dialog.component";
import { ViewPackageProductComponent } from "./view-package-product/view-package-product.component";
import { Router } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";

export interface PeriodicElement1 {
  s_no: number;
  package: string;
  price: string;
  gender: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  { s_no: 1, package: "Lorem", price: "Lorem", gender: "Lorem" },
];

@Component({
  selector: "app-supplement-pacakge-mgmt",
  templateUrl: "./supplement-pacakge-mgmt.component.html",
  styleUrls: ["./supplement-pacakge-mgmt.component.css"],
})
export class SupplementPacakgeMgmtComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  displayedColumns1: string[] = [
    "s_no",
    "package",
    "type",
    "description",
    "price",
    "gender",
    "view_product",
    "action",
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  viewDescription(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    description: any
  ): void {
    this.dialog.open(ViewDescriptionDialogComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: description,
    });
  }

  viewProduct(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    product: any
  ): void {
    this.dialog.open(ViewPackageProductComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: product,
    });
  }
  ngOnInit() {
    this.getSupplementList({});
  }
  onSearch(event: any) {
    this.searchHome = event.target.value;
    this.getSupplementList({});
  }
  searchHome: string = "";
  getSupplementList(event: any) {
    if (!event?.pageChange) {
      this.page = 1;
      this.limit = 15;
    }
    let searchQuery = this.currentTabIndex === 0 ? this.searchHome : "";

    this.api
      .get1(
        `supplementPkgMgmt/supplementPkgList?page=${this.page}&limit=${this.limit}&search=${searchQuery}`
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.dataSource1 = new MatTableDataSource(
            res.data["SupplementPkgList"]
          );
          this.dataSource1.paginator = this.MatPaginator1;
          setTimeout(() => {
            this.MatPaginator1.length = res?.data.count;
            this.totalLength = res?.data.count;
            this.MatPaginator1.pageIndex = this.page - 1;
          });
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }
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

  changeStatus(supplementPkgId: string, isBlocked: boolean): void {
    const payload = {
      supplementPkgId,
      isBlocked: !isBlocked, // Reverse the logic as toggle indicates the opposite state
    };

    this.api.patch1("supplementPkgMgmt/blockSupplementPkg", payload).subscribe({
      next: (response: any) => {
        if (isBlocked == true) {
          this.toastr.success("Package Unblocked SuccessFully");
        } else {
          this.toastr.error("Package Blocked SuccessFully");
        }
        this.getSupplementList({});
      },
      error: (err: any) => {
        console.error("Error updating status:", err.error.message);
        // Optionally, revert the toggle state or show an error message
      },
    });
  }
  goToEdit(id: any) {
    this.router.navigate(['/supplement/supplement-pacakge-mgmt/add-supplement-package-mgmt'], {
      queryParams: { id: id }
    });
  }
  deleteSupp(id:any){
    this.api.delete1(`supplementPkgMgmt/deleteSupplementPkg/${id}`).subscribe({
      next: (response: any) => {
     
          this.toastr.success("Package Delete SuccessFully");
      
        this.getSupplementList({});
      },
      error: (err: any) => {
        console.error("Error Delete status:", err.error.message);
        // Optionally, revert the toggle state or show an error message
      },
    });
  }
}
