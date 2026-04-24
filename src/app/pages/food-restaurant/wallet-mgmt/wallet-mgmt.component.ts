import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AddDialogComponent } from "../common-dialog/add-dialog/add-dialog.component";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

export interface PeriodicElement1 {
  s_no: number;
  id: string;
  date_time: string;
  amount: string;
  status: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [];
@Component({
  selector: "app-wallet-mgmt",
  templateUrl: "./wallet-mgmt.component.html",
  styleUrls: ["./wallet-mgmt.component.css"],
})
export class WalletMgmtComponent {
  displayedColumns1: string[] = ["s_no", "id", "date_time", "amount", "status"];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
     this.getAmountList();
     this.getTransactionList();
  }

  AmountList: any;
  getAmountList() {
    this.api.get1("wallet/balance").subscribe({
      next: (res: any) => {
        this.AmountList = res.data;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  TransactionData: any;
  getTransactionList() {
    this.api.get1("wallet/transaction/list").subscribe({
      next: (res: any) => {
        this.TransactionData = res.data.data;
        this.dataSource1 = new MatTableDataSource(this.TransactionData);
        this.dataSource1.paginator = this.MatPaginator1;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  addDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    type: any,
    element: any
  ): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { type, element },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getTransactionList();
      this.getAmountList();
    });

    console.log(element);
  }
}
