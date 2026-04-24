import { Component, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { PaymentDialogComponent } from "../common-dialog/payment-dialog/payment-dialog.component";

import { AfterViewInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SuccessfullDialogComponent } from "../common-dialog/successfull-dialog/successfull-dialog.component";
import { ViewDialogComponent } from "../common-dialog/view-dialog/view-dialog.component";
import { AddDialogComponent } from "../common-dialog/add-dialog/add-dialog.component";

export interface PeriodicElement1 {
  s_no: number;
  name: string;
  date: string;
  amt: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [];

export interface PeriodicElement2 {
  s_no: number;
  amt: string;
  date: string;
}

const ELEMENT_DATA2: PeriodicElement2[] = [];

@Component({
  selector: "app-join-as-sponsor",
  templateUrl: "./join-as-sponsor.component.html",
  styleUrls: ["./join-as-sponsor.component.css"],
})
export class JoinAsSponsorComponent implements OnDestroy {
  sponsorTabType: any = 0;
  currentRestaurantName = "";
  disablePlaceBidButton = true
  displayedColumns1: string[] = ["s_no", "name", "logo", "date", "amt"];

  displayedColumns2: string[] = ["s_no", "amt", "date"];

  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;
  @ViewChild("MatPaginator2") MatPaginator2!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
    this.dataSource2.paginator = this.MatPaginator2;
  }

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem("curve-restaurants")) {
      let res: any = sessionStorage.getItem("curve-restaurants");
      res = JSON.parse(res);
      this.currentRestaurantName = res.resName;
    }

    this.getspentPerDay();
    this.getBiddingHistory();
    this.sponsorTabType = localStorage.getItem("sponsorTabType") || "0";
    this.sponsorTabType = parseInt(this.sponsorTabType);
    if (this.sponsorTabType == 0) {
      this.getBiddingList();
    } else if (this.sponsorTabType == 1) {
      this.getBiddingHistory();
    } else {
      this.getBiddingList();
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem("sponsorTabType");
  }

  buyDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(PaymentDialogComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  successDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(SuccessfullDialogComponent, {
      width: "350px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  viewDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ViewDialogComponent, {
      width: "45%",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onMainTabChanged($event: any) {
    localStorage.setItem("sponsorTabType", $event.index);
    if ($event.index == 0) {
      this.getBiddingList();
    } else {
      this.getBiddingHistory();
    }
  }

  getBiddingList() {
    this.api.get1("sponsor/list").subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource1 = new MatTableDataSource(res.data["list"]);
        this.dataSource1.paginator = this.MatPaginator1;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getBiddingHistory() {
    this.api.get1("sponsor/history").subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource2 = new MatTableDataSource(res["data"]["list"]);
        this.dataSource2.paginator = this.MatPaginator2;
        if (!!res["data"]["list"].length) {
          this.disablePlaceBidButton = false;
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  stopBid() {
    let data = {
      isBlocked: true,
    };
    this.api.post1("sponsor/stopBid", data).subscribe({
      next: (res: any) => {
        console.log(res);
        // this.toaster.success(res['message'])
        // this.ngOnInit()
        this.getspentPerDay();
        this.getBiddingList();
        const stopDialogRef = this.dialog.open(AddDialogComponent, {
          width: "400px",
          height: "auto",
          maxHeight: "100vh",
          maxWidth: "90vw",
          panelClass: "layout-dialog",
          enterAnimationDuration: "500ms",
          exitAnimationDuration: "500ms",
          data: { type: 9, element: "" },
        });
        setTimeout(() => {
          stopDialogRef.close();
        }, 3000);
      },
      error: (err: any) => {
        this.toaster.error(err["error"]["message"]);
      },
    });
  }

  spendPerDayAmount: any = 0;
  isBlockedStopBtn: boolean = false;
  getspentPerDay() {
    this.api.get1("sponsor/spentPerDay").subscribe({
      next: (res: any) => {
        this.spendPerDayAmount = res["data"]?.spendPerDayAmount;
        if (!res?.data) {
          this.isBlockedStopBtn = true;
        } else this.isBlockedStopBtn = res["data"]?.isBlocked;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  bidDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    type: any,
    element: any
  ): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: "750px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { type, element },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.success) {
        if (result.type == "5") {
          // this.toaster.success("Bid has been Placed Successfully")
          const successDialogRef = this.dialog.open(AddDialogComponent, {
            width: "400px",
            height: "auto",
            maxHeight: "100vh",
            maxWidth: "90vw",
            panelClass: "layout-dialog",
            enterAnimationDuration,
            exitAnimationDuration,
            data: { type: 7, element },
          });
          setTimeout(() => {
            successDialogRef.close();
          }, 3000);
        } else if (result.type == "6") {
          // this.toaster.success("Per Day Spend Limit has been updated successfully")
          const successDialogRef = this.dialog.open(AddDialogComponent, {
            width: "400px",
            height: "auto",
            maxHeight: "100vh",
            maxWidth: "90vw",
            panelClass: "layout-dialog",
            enterAnimationDuration,
            exitAnimationDuration,
            data: { type: 8, element },
          });
          setTimeout(() => {
            successDialogRef.close();
          }, 3000);
        } else {
          this.toaster.success("Updated successfully");
        }

        setTimeout(() => {
          this.ngOnInit();
        }, 200);
      }
    });
  }
}
