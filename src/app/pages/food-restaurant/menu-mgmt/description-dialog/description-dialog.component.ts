import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-description-dialog",
  templateUrl: "./description-dialog.component.html",
  styleUrls: ["./description-dialog.component.css"],
})
export class DescriptionDialogComponent {
  constructor(
    private api: ApiService,
    private toaster: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DescriptionDialogComponent>
  ) {}
}
