import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.css"],
})
export class DeleteDialogComponent {
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close("no");
  }

  onYesClick(): void {
    if (this.data != null) {
      this.delete();
    }
    this.dialogRef.close({ success: true });
  }
  // delete() {
  //   if (this.data.type == 2) {
  //     const data2 = {
  //       _id: this.data.element,
  //       isDeleted: true,
  //     };
  //     this.api
  //       .put1(`packageCategory/delete`,data2)
  //       .subscribe({
  //         next: (res: any) => {
  //           this.dialogRef.close(true);
  //           this.toastr.success("Category Deleted!");
  //         },
  //         error: (err: any) => {
  //           console.log(err.message);
  //         },
  //       });
  //   } else {
  //     this.api
  //       .delete1(`restaurantPackage/deletePackage?packageId=${this.data}`)
  //       .subscribe({
  //         next: (res: any) => {
  //           this.dialogRef.close(true);
  //           this.toastr.success("Package Deleted!");
  //         },
  //         error: (err: any) => {
  //           console.log(err.message);
  //         },
  //       });
  //   }
  // }



  delete() {
    this.api.delete1(`${this.data.api}`).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.dialogRef.close();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message);
      },
    });
  }
}
