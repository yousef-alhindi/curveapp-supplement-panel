import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { WebStorageService } from "src/app/service/web-storage.service";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.css"],
})
export class OtpComponent implements OnInit {
  counter: number = 0;
  secondValue: boolean = false;
  otpButtonDisabled: boolean = true;
  restaurantCategoryId: any = "";

  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private session: WebStorageService
  ) {}

  ngOnInit() {
    this.restaurantCategoryId = JSON.parse(
      this.session.getSessionStorage("curve-restaurants") || ""
    );
    this.timer();
  }
  otp: any;

  onOtpChange(event: any) {
    this.otp = event;
  }

  verifyOtp() {
    if (!this.otp) {
      this.toaster.error("Please enter OTP");
      return;
    }
    this.api.post("otp", 
      { otp: this.otp }
    ).subscribe({
      next: (res: any) => {
        
        this.session.setSessionStorage(
          "curve-restaurants",
          JSON.stringify(res.data)
        );
        
       if (res.data.supplementStatus ==2 && res.data.rejected_reason.rejectedBy == 'Document Rejected'){
          this.toaster.error(res.message);
          this.router.navigateByUrl("/upload-documents");
          return
        }
        if (
          res.data.supplementStatus == 2 &&
          res.data.rejected_reason.rejectedBy == "Fully Rejected"
        ) {
          this.toaster.error("Your profile is Fully Rejected");
          this.router.navigateByUrl("/login");
          return;
        } 
        if (res.data.profileCompletion == 0 ) {
          this.router.navigateByUrl("/create-business-profile");
        }else if(res.data.supplementStatus==0){
          this.toaster.info("Profile is Under Review");
          this.router.navigateByUrl("/pending");
          return
        }
       else {
        this.toaster.success("OTP verified successfully");
          this.router.navigateByUrl("/supplement/dashboard");
          ;
        }
         
      },
      error: (err: any) => {
        this.toaster.warning(err.error.message);
        if(err.error.message == 'Your profile is Fully Rejected'){
          this.router.navigateByUrl("/login");
        }
      },
    });
  }
  // else  if (res.data.supplementStatus == 0) {
  //   this.toaster.warning("Pending");
  //   this.router.navigateByUrl("/pending");
  //   return;
  // }

  resendOtp() {
    this.api.get("otp").subscribe({
      next: (value: any) => {
        console.log(value);
        this.timer();
      },
      error(err) {},
    });
  }

  showTimer: Boolean = false;
  timer() {
    this.counter = 59;
    let startTimer = setInterval(() => {
      this.counter = this.counter - 1;
      if (this.counter == 0) {
        window.clearInterval(startTimer);
        this.showTimer = false;
      }
    }, 1000);
  }

  getCounterData(counter: number) {
    let returnCounter = `${counter}`;
    if (returnCounter.length == 1) {
      return `0${this.counter}`;
    }
    return this.counter;
  }
}
