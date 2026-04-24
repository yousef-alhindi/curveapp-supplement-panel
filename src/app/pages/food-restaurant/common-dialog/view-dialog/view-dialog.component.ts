import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-view-dialog",
  templateUrl: "./view-dialog.component.html",
  styleUrls: ["./view-dialog.component.css"],
})
export class ViewDialogComponent {
  constructor(
    public api: ApiService,
    private toaster: ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public description: any,
    public dialogRef: MatDialogRef<ViewDialogComponent>
  ) {}
}
