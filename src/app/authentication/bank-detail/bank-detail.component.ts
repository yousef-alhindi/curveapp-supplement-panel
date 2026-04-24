import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { WebStorageService } from "src/app/service/web-storage.service";

@Component({
  selector: "app-bank-detail",
  templateUrl: "./bank-detail.component.html",
  styleUrls: ["./bank-detail.component.css"],
})
export class BankDetailComponent implements OnInit {
  submitted: Boolean = false;
  bankDetails: any
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private session: WebStorageService
  ) {}

  ngOnInit(): void {
    this.bankDetails = JSON.parse(
      this.session.getSessionStorage("curve-restaurants") || ""
    );
      if(this.bankDetails?.bankDetails){
        this.BankDetailsForm.patchValue({
          bankAccountNo: this.bankDetails?.bankDetails?.bankAccountNo,
          accHolderName: this.bankDetails?.bankDetails?.accHolderName,
          bankCode: this.bankDetails?.bankDetails?.bankCode,
          bankName: this.bankDetails?.bankDetails?.bankName
        })
      }
  
  }

  BankDetailsForm: FormGroup = new FormGroup({
    bankAccountNo: new FormControl("", [Validators.required]),
    accHolderName: new FormControl("", [Validators.required]),
    bankCode: new FormControl("", [Validators.required]),
    bankName: new FormControl("", [Validators.required]),
  });

  addBankdetails() {
    this.submitted=true;
    if(this.BankDetailsForm.invalid){
      return
    }
    let data = this.BankDetailsForm.value;
    this.api.put("addBankDetails", data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("Bank details added successfully!");
        this.router.navigateByUrl("/pending");
      },
      error: (err: any) => {
        console.log(err.error);
        
      },
    });
  }

  
  commonFunctionForError(error: any) {
    if (this.submitted && this.BankDetailsForm.controls[error].errors) {
      return true;
    }
    return false;
  }
}
