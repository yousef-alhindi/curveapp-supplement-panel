import { Component, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { PaymentDialogComponent } from "../common-dialog/payment-dialog/payment-dialog.component";

import { AfterViewInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SuccessfullDialogComponent } from "../common-dialog/successfull-dialog/successfull-dialog.component";
import { ViewDialogComponent } from "../common-dialog/view-dialog/view-dialog.component";

export interface PeriodicElement1 {
  s_no: number;
  name: string;
  type: string;
  date: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [];

export interface PeriodicElement2 {
  s_no: number;
  name: string;
  type: string;
  status: string;
}

const ELEMENT_DATA2: PeriodicElement2[] = [];

@Component({
  selector: "app-offer-mgmt",
  templateUrl: "./offer-mgmt.component.html",
  styleUrls: ["./offer-mgmt.component.css"],
})
export class OfferMgmtComponent implements OnDestroy {
  //  for new category
  pageSize = 10;
  totalLength = 100; // Total length of your data
  currentPage = 0;

  getSerialNumber(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  //  for enrolled category
  pageSize1 = 5;
  totalLength1 = 100; // Total length of your data
  currentPage1 = 0;
  selectedNewBannerValue:Number = 0
  getSerialNumber1(index: number): number {
    return this.currentPage1 * this.pageSize1 + index + 1;
  }
  onPageChange1(event: PageEvent) {
    this.pageSize1 = event.pageSize;
    this.currentPage1 = event.pageIndex;
  }

  displayedColumns1: string[] = [
    "s_no",
    "name",
    "type",
    "description",
    "date",
    "action",
  ];

  displayedColumns2: string[] = [
    "s_no",
    "name",
    "type",
    "description",
    "status",
    "action",
  ];

  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;
  @ViewChild("MatPaginator2") MatPaginator2!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
    this.dataSource2.paginator = this.MatPaginator2;
  }
  newOfferList: any[] = [];
  filterUewOfferList: any[] = [];
  enrolledOfferList: any[] = [];
  filterEnrolledOfferList: any[] = [];
  tabType: any = 0;
  tabId: any = 0;
  tabId2: any = 0;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.tabType = 0;
    this.tabId = 0;
    this.tabId2 = 0;
    localStorage.removeItem("tabType");
    localStorage.removeItem("tabId");
    localStorage.removeItem("tabId2");
  }
  ngOnInit() {
    this.tabType = localStorage.getItem("tabType");
    this.tabId = localStorage.getItem("tabId");
    this.tabId2 = localStorage.getItem("tabId2");
    this.tabType = parseInt(this.tabType);
    this.tabId = parseInt(this.tabId) || 0;
    this.tabId2 = parseInt(this.tabId2) || 0;
    if (this.tabType == 0) {
      this.getenrolledOfferList(this.tabId + 1); //banner=1,category=2
    } else if (this.tabType == 1) {
      if (this.tabId2 && this.tabId2 == 1) {
        this.getnewOfferList(2);
      } else {
        this.getnewOfferList(1);
      }
    } else {
      if (this.tabId && this.tabId == 1) {
        this.getenrolledOfferList(2); //banner=1,category=2
      } else {
        this.getenrolledOfferList(1); //banner=1,category=2
      }
    }
  }

  onMainTabChanged($event: any) {
    this.pageSize = 10;
    this.pageSize1 = 5;
    this.currentPage = 0;
    this.currentPage1 = 0;

    if ($event.index == 0) {
      localStorage.setItem("tabType", "0");
      if (this.tabId && this.tabId == 1) {
        this.getenrolledOfferList(2); //banner=1,category=2
      } else {
        this.getenrolledOfferList(1); //banner=1,category=2
      }
    } else {
      localStorage.setItem("tabType", "1");
      if (this.tabId2 && this.tabId2 == 1) {
        this.getnewOfferList(2);
      } else {
        this.getnewOfferList(1);
      }
    }
  }

  onTabChanged($event: any) {
    localStorage.setItem("tabId", $event.index);
    this.getenrolledOfferList($event.index + 1);
  }

  onTab2Changed($event: any) {
    localStorage.setItem("tabId2", $event.index);
    this.getnewOfferList($event.index + 1);
  }

  getnewOfferList(status: any) {
    this.api.get1("offer/newOfferList?status=" + status).subscribe({
      next: (res: any) => {
        if (status == "1") {
          this.filterUewOfferList = res.data;
          this.newOfferList = res.data;
          this.handleBannerFilter({}, this.selectedNewBannerValue)
        } else {
          let catList: any = res?.data;
          if (catList && catList.length != 0) {
            catList = catList.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            this.dataSource2 = new MatTableDataSource(catList);
            this.dataSource2.paginator = this.MatPaginator2;
            this.totalLength = catList?.length;
          }
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getenrolledOfferList(status: any) {
    this.api.get1("offer/enrolledOfferList?status=" + status).subscribe({
      next: (res: any) => {
        if (status == "1") {
          this.enrolledOfferList = res.data;
          this.filterEnrolledOfferList = res.data;
        } else {
          let catList: any = res?.data;
          if (catList && catList.length != 0) {
            catList = catList.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            this.dataSource1 = new MatTableDataSource(catList);
            this.dataSource1.paginator = this.MatPaginator1;
            this.totalLength1 = catList?.length;
          }
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  enableDisableStaff(event: any, offer: any) {
    let data = {
      isActive: event?.checked,
      joinedOfferId: offer._id,
    };

    this.api.post1("offer/enrolledOffer/changeStatus", data).subscribe(
      (res: any) => {
        if (event?.checked) {
          this.toaster.success("Offer has been unblocked successfully");
        } else {
          this.toaster.error("Offer has been blocked successfully");
        }
        this.getenrolledOfferList("1");
      },
      (error) => {
        // this.toaster.error('')
      }
    );
  }

  buyDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    item: any
  ): void {
    // this.selectedOffer=item;
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { item: item },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  successDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(SuccessfullDialogComponent, {
      width: "350px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { type: 3 },
    });

    setTimeout(() => {
      this.ngOnInit();
      dialogRef.close();
    }, 2000);
  }

  viewDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    msg: string
  ): void {
    this.dialog.open(ViewDialogComponent, {
      width: "600px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { description: msg },
    });
  }

  joinNewCategory(item: any) {
    if (item.status == 2) {
      this.toaster.error("This category has been blocked by Admin");
      return;
    }

    if (item.joinFee != 0) {
      this.buyDialog("500ms", "500ms", { ...item, isSaveCategory: true });
      return;
    }

    this.api
      .post1("offer/saveCategory", { categoryId: item._id, amount: 0 })
      .subscribe({
        next: (res: any) => {
          //  this.successDialog('500ms','500ms')
          // this.toaster.success("Enrolment has been done successfully")
          this.ngOnInit();
        },
        error: (err: any) => {
          console.log(err);
          this.toaster.error(err["error"]["message"]);
        },
      });
  }

  joinNewOffer(item: any) {
    if (item.joinFee != 0) {
      this.buyDialog("500ms", "500ms", item);
    } else {
      let data = {
        offerId: item.offerId,
        bannerId: item._id,
        paymentType: "card",
        isPurchasedBysubscription: true,
      };
      this.api.post1("offer/saveOrder", data).subscribe({
        next: (res: any) => {
          this.successDialog("500ms", "500ms");
        },
        error: (err: any) => {
          console.log(err);
          this.toaster.error(err["error"]["message"]);
        },
      });
    }
  }

  toggleEvent(d: any, id: any) {
    let data = {
      joinedCategoryId: id,
      isActive: d.checked,
    };
    this.api.post1("offer/enrolledCategory/changeStatus", data).subscribe({
      next: (res: any) => {
        this.toaster.success(
          !d.checked
            ? "Enrolled category blocked successfully."
            : "Enrolled category unblocked successfully."
        );
        this.ngOnInit();
      },
      error: (err: any) => {
        this.toaster.error(err["error"]["message"]);
      },
    });
  }

  handleDiscountType(item: any) {
    if (item.discountType == 1) {
      return `Flat ${item?.flatDiscountValue}`;
    }

    if (item.discountType == 2) {
      return `${item?.percentDiscountValue}%`;
    }

    if (item.discountType == 3) {
      return `Buy ${item?.bogoValues?.buy} Get ${item?.bogoValues?.buy}`;
    }

    return "N/A";
  }

  handleBannerFilter(event: any, data?: any) {
    if(!data) data = "0"
    this.selectedNewBannerValue = event?.target?.value || data;
    if (this.selectedNewBannerValue == 0) {
      this.filterUewOfferList = this.newOfferList;
      return;
    }

    this.filterUewOfferList = this.newOfferList.filter(
      (d: any) => d.bannerType == this.selectedNewBannerValue
    );
    console.log("this.selectedNewBannerValue====+>", this.filterUewOfferList, this.selectedNewBannerValue)
  }

  handleEnrolledBannerFilter(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue == "0") {
      this.filterEnrolledOfferList = this.enrolledOfferList;
      return;
    }

    this.filterEnrolledOfferList = this.enrolledOfferList.filter(
      (d: any) => d?.bannerType == selectedValue
    );
  }
}
