import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SuccessfullDialogComponent } from "../../common-dialog/successfull-dialog/successfull-dialog.component";

@Component({
  selector: "app-add-ticket",
  templateUrl: "./add-ticket.component.html",
  styleUrls: ["./add-ticket.component.css"],
})
export class AddTicketComponent {
  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private toaster: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<AddTicketComponent>
  ) {
    this.supportForm = new FormGroup({
      service: new FormControl(2),
      query: new FormControl("", [Validators.required]),
      image: new FormControl(""),
    });

    this.supportForm.get("query")?.valueChanges.subscribe((value) => {
      const modifiedValue = value.replace(/\s\s+/g, " ");
      if (value !== modifiedValue) {
        this.supportForm
          .get("query")
          ?.setValue(modifiedValue, { emitEvent: false });
      }
    });
  }
  ngOnInit() {}

  get f() {
    return this.supportForm.controls;
  }

  supportForm: FormGroup;

  submitted: Boolean = false;
  Addissue() {
    this.submitted = true;
    if (this.supportForm.invalid) {
      return;
    }
    const modifiedValue = this.supportForm.value.query.replace(/\s\s+/g, " ");
    if (modifiedValue == " ") {
      this.toaster.error("Invalid input");
      return;
    }
    let data = this.supportForm.value;
    this.api.post1("support", data).subscribe({
      next: (res: any) => {
        // this.toaster.success("Ticket created successfully ");
        this.successDialog("500ms", "500ms");

        this.dialogRef.close({ success: true });
        setTimeout(() => {
          this.dialog.closeAll();
        }, 3000);
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
    this.dialog.open(SuccessfullDialogComponent, {
      width: "350px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        type: 2,
      },
    });
  }
}
