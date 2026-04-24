import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog,MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { WebStorageService } from "src/app/service/web-storage.service";
import { PreviewDialogComponent } from "../common-dialog/preview-dialog/preview-dialog.component";
import * as moment from "moment";
import { LocationDialogComponent } from "src/app/authentication/add-restaurant-location/location-dialog/location-dialog.component";
import { MapDialogComponent } from "../common-dialog/map-dialog/map-dialog.component";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  dialogRef: MatDialogRef<MapDialogComponent> | undefined;
  resturantDetails: any;
  submitted: Boolean = false;
  dayArray: any = [];
  minutes: any;
  selectedTimeFormatClosing: any;
  workingDays: any = [
    { showName: "Mon", value: "Monday", checked: false },
    { showName: "Tue", value: "Tuesday", checked: false },
    { showName: "Wed", value: "Wednesday", checked: false },
    { showName: "Thur", value: "Thursday", checked: false },
    { showName: "Fri", value: "Friday", checked: false },
    { showName: "Sat", value: "Saturday", checked: false },
    { showName: "Sun", value: "Sunday", checked: false },
  ];

  constructor(
    private session: WebStorageService,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  timestampopenings: any;
  selectedTimes: any;

  ngOnInit(): void {
    this.resturantDetails = JSON.parse(
      this.session.getSessionStorage("curve-restaurants") || ""
    );

    this.updatedProfile();
    this.dayArray = this.resturantDetails.documents.workingDays;
    for (let i = 0; i < this.dayArray.length; i++) {
      let findIndex = this.workingDays.findIndex((item: any) => {
        return item.value == this.dayArray[i];
      });

      if (findIndex != -1) {
        this.workingDays[findIndex].checked = true;
      }
    }
  this.supLogo =   this.resturantDetails?.addressDetails?.supLogo
  console.log('ngOnInit',this.supLogo)
  }

  color: any;

  url: any;
  url1: any;

  multiple1: any = [];
  uploadProfileImage: any;
  profile_image: any;
  profileImage: any;
  imggChange: any = false;
  profileImage1: any;
  imggChange1: any = false;
  uploadProfileImage1: any;
  multipleFiles1(event: any) {
    this.multiple1 = [];

    var multipleFiles = event.target.files;
    this.uploadProfileImage = event.target.files[0];
    if (multipleFiles) {
      for (var file of multipleFiles) {
        var multipleReader = new FileReader();
        multipleReader.onload = (e: any) => {
          this.profile_image = e.target.result;
        };
        multipleReader.readAsDataURL(file);
      }
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.uploadProfileImage = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.uploadImage(this.profileImage);
        this.url = event.target.result;
      };
    }
  }
  supLogo: any = '';

  onSelectFile3(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadProfileImage = event.target.files[0];
  
      // Preview the image
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadProfileImage);
      reader.onload = (e: any) => {
        this.supLogo = e.target.result;  // Set preview URL
      };
  
      // Upload the image
      this.uploadImage3();
    }
  }

  onSelectFile1(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.uploadProfileImage1 = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.uploadImage1(this.profileImage1);
        this.url1 = event.target.result;
      };
    }
  }

  uploadImage(img: any) {
    this.imggChange = true;
    let data = new FormData();
    data.append("upload_supplement_file", this.uploadProfileImage);
    this.api.post("uploadFile", data).subscribe((data: any) => {
      this.profileImage = data.data;
    });
  }

  uploadImage1(img: any) {
    this.imggChange1 = true;
    let data = new FormData();
    data.append("upload_supplement_file", this.uploadProfileImage1);
    this.api.post("uploadFile", data).subscribe((data: any) => {
      this.profileImage1 = data.data;
    });
  }

  selectedDay: any[] = [];
  getWokingDay(event: any) {
    this.selectedDay = event.value;
  }

  selectedTime: any;
  timestampclosing: any;
  timestampopening: any;
  handleTimeSet(event: any) {
    this.selectedTime = event;
    let selectedDate = new Date(this.selectedTime);
    let currentDate = new Date();
    let timeComponents = this.selectedTime.split(" ");
    let timeParts = timeComponents[0].split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    if (timeComponents[1] === "PM" && hours < 12) {
      hours += 12;
    }
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    this.timestampopening = currentDate.getTime();
  }
  handleTimeSet1(event: any) {
    this.selectedTime = event;
    let selectedDate = new Date(this.selectedTime);
    let currentDate = new Date();
    let timeComponents = this.selectedTime.split(" ");
    let timeParts = timeComponents[0].split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    if (timeComponents[1] === "PM" && hours < 12) {
      hours += 12;
    }
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    this.timestampclosing = currentDate.getTime();
  }
  updateLocation(eventData: any) {
    this.editProfileForm.patchValue({
      location: eventData.location
    });
  }
  public lat: any;
  public lng: any;
  location: any={};
  latitude: any;
  longitude: any;
address:any
  getAddress: any = "";
  objectValue: any;
  getZipCode: any

  locationDialog() {
    this.dialogRef = this.dialog.open(MapDialogComponent, {
      width: "400px",
      height: "100vh",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "bg-color",
      position: { right: "0px", top: "0px" },
    });

    this.dialogRef.componentInstance.dataEvent.subscribe((data: any) => {
      this.location = data.location
      this.address = data.address
      this.latitude = data.location.coordinates[0];
      this.longitude = data.location.coordinates[1]
      console.log('lat','long',this.latitude,this.longitude,this.address)
      this.editProfileForm.patchValue({
        address: this.address, 
      });
    });
  }
  uploadImage3() {
    const data = new FormData();
    data.append("upload_supplement_file", this.uploadProfileImage);
  
    this.api.post("uploadFile", data).subscribe((response: any) => {
      if (response && response.data) {
        this.supLogo = response.data;  // Update with server URL
        this.editProfileForm.patchValue({
          supLogo: this.supLogo,  // Update the form control
        });
      }
    });
  }
  editProfileForm: FormGroup = new FormGroup({
    profileImage: new FormControl(this.supLogo, [Validators.required]),
    supLogo: new FormControl(this.supLogo, [Validators.required]),
    ownerName: new FormControl("", [Validators.required]),
    mobileNumber: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    license: new FormControl("", [Validators.required]),
    idProof: new FormControl("", [Validators.required]),
    bankAccountNo: new FormControl("", [Validators.required]),
    accHolderName: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    bankCode: new FormControl("", [Validators.required]),
    bankName: new FormControl("", [Validators.required]),
    address:new FormControl('',),
    location: new FormControl(this.location, ),
  });
  selectedTimeclose: any;
  updatedProfile() {
    console.log('image',this.supLogo)
    let d = moment(
      parseInt(this.resturantDetails?.documents?.openingTime)
    ).utc();
    this.selectedTime = moment(
      parseInt(this.resturantDetails?.documents?.openingTime)
    ).format("h:mm A");
    this.selectedTimeclose = moment(
      parseInt(this.resturantDetails?.documents?.closingTime)
    ).format("h:mm A");

    this.editProfileForm.patchValue({
      supLogo: this.resturantDetails.addressDetails.supLogo,
      ownerName: this.resturantDetails.ownerName,
      mobileNumber: this.resturantDetails.mobileNumber,
      name: this.resturantDetails.name,
      email: this.resturantDetails.email,
     
      bankAccountNo: this.resturantDetails.bankDetails.bankAccountNo,
      accHolderName: this.resturantDetails.bankDetails.accHolderName,
      bankCode: this.resturantDetails.bankDetails.bankCode,
      bankName: this.resturantDetails.bankDetails.bankName,
       address:this.resturantDetails?.addressDetails?.address
    });
    this.url=this.resturantDetails.documents.license
    this.url1=this.resturantDetails.documents.idProof
  }
  updatedData: any;
  updateProfileDetails() {
    this.submitted = true;

    let data = this.editProfileForm.value;
    data.supLogo = this.supLogo
    data.license = this.profileImage;
    data.idProof = this.profileImage1;
    data.location = this.location
    data.workingDays =
      this.selectedDay.length != 0
        ? this.selectedDay
        : this.selectedDay;
    const openingDate =
      this.timestampopening !== undefined
        ? new Date(parseInt(this.timestampopening))
        : new Date(parseInt(this.resturantDetails.documents.openingTime));
    const closingDate =
      this.timestampclosing !== undefined
        ? new Date(parseInt(this.timestampclosing))
        : new Date(parseInt(this.resturantDetails.documents.closingTime));
    if (openingDate.getTime() > closingDate.getTime()) {
      this.toastr.error("Closing time should be later than opening time");
      return;
    }

    data.openingTime = this.timestampopening
      ? this.timestampopening
      : this.resturantDetails.documents.openingTime;
    data.closingTime = this.timestampclosing
      ? this.timestampclosing
      : this.resturantDetails.documents.closingTime;

    this.api.post("updateProfile", data).subscribe({
      next: (res: any) => {
        this.updatedData = res.data;
        this.session.setSessionStorage(
          "curve-restaurants",
          JSON.stringify(res.data)
        );
        this.toastr.success("profile updated successfully!");
        this.router.navigate(['/supplement/dashboard'])
      },
    });
  }

  commonFunctionForError(error: any) {
    if (this.submitted && this.editProfileForm.controls[error].errors) {
      return true;
    }
    return false;
  }

  previewDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(PreviewDialogComponent, {
      width: "550px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


 


}
