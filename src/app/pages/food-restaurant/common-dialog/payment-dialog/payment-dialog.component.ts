import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { SuccessfullDialogComponent } from "../successfull-dialog/successfull-dialog.component";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";
import { BinaryOperator } from "@angular/compiler";

@Component({
  selector: "app-payment-dialog",
  templateUrl: "./payment-dialog.component.html",
  styleUrls: ["./payment-dialog.component.css"],
})
export class PaymentDialogComponent {
  isWalletAmount: number = 0;
  selectedPaymentType: number = 1;
  isWalletSelected: boolean = false;
  constructor(
    public api: ApiService,
    private toaster: ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentDialogComponent>
  ) {
   // this.getWalletDetails();
    if (!!data.amount) {
      this.isWalletAmount = data.amount;
    }
  }

  walletAmount: any;
  getWalletDetails() {
    this.api.get1("wallet/balance").subscribe({
      next: (res: any) => {
        this.walletAmount = res.data?.balance || "0";
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  successDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    if (this.isWalletAmount != 0) {
      this.dialogRef.close({ walletSuccess: true });
    } else if (this.data?.item?.isSaveCategory) {
      this.api
        .post1("offer/saveCategory", {
          categoryId: this.data?.item._id,
          amount: this.data?.item.joinFee,
          paymentType: "card",
          isWalletSelected: this.isWalletSelected,
        })
        .subscribe({
          next: (res: any) => {
            this.dialogRef.close();
            const dd = this.dialog.open(SuccessfullDialogComponent, {
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
              dd.close();
            }, 2000);
          },
          error: (err: any) => {
            console.log(err);
            this.toaster.error(err["error"]["message"]);
          },
        });
    } else {
      let data = {
        offerId: this.data.item.offerId,
        bannerId: this.data.item._id,
        paymentType: "card",
        isWalletSelected: this.isWalletSelected,
        isPurchasedBysubscription: true,
        amount: this.data.item.joinFee,
        startDate: this.data.item.startDate,
        endDate: this.data.item.endDate,
        discountUpto: this.data.item.discountUpto,
      };

      this.api.post1("offer/saveOrder", data).subscribe({
        next: (res: any) => {
          this.dialogRef.close();
          const dd = this.dialog.open(SuccessfullDialogComponent, {
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
            dd.close();
          }, 2000);
        },
        error: (err: any) => {
          this.toaster.error(err["error"]["message"]);
        },
      });
    }
  }

  onPaymentTypeChange(type: number) {
    this.selectedPaymentType = type;
  }

  onSelectCheckBox(check: boolean) {
    this.isWalletSelected = check;
  }
}
