import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-customize-item-details",
  templateUrl: "./customize-item-details.component.html",
  styleUrls: ["./customize-item-details.component.css"],
})
export class CustomizeItemDetailsComponent implements OnInit {
  AddcostomiseForm: FormGroup;
  submitted: Boolean = false;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<CustomizeItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.AddcostomiseForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      price: new FormControl("", Validators.required),
      menuId: new FormControl(this.data.menuId),
    });
  }

  ngOnInit() {
    this.patchData();
  }

  get f() {
    return this.AddcostomiseForm.controls;
  }

  patchData() {
    if (this.data?.cusomizeItemData) {
      this.AddcostomiseForm.patchValue({
        name: this.data?.cusomizeItemData?.name,
        price: this.data?.cusomizeItemData?.price
      });
    }
  }

  Addcategory() {
    this.submitted = true;
    if (this.AddcostomiseForm.invalid) {
      return;
    }
    let data = this.AddcostomiseForm.value;

    if (this.data?.cusomizeItemData) {
      data._id = this.data?.cusomizeItemData?._id;
      this.api.put1("customise/edit", data).subscribe({
        next: (res: any) => {
          this.toaster.success('Customize Item updated successfully');
          this.dialogRef.close();
        },
        error: (err: any) => {
          this.toaster.error(err.error.message);
        },
      });
    } else {
      this.api.post1("customise/add", data).subscribe({
        next: (res: any) => {
          this.toaster.success('Customize Item added successfully');
          this.dialogRef.close();
        },
        error: (err: any) => {
          this.toaster.error(err.error.message);
        },
      });
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
    const pattern = /^[a-zA-Z0-9\s]*$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
