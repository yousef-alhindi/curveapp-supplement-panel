import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { WebStorageService } from "src/app/service/web-storage.service";
// import { DateTime } from "luxon";

@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html",
  styleUrls: ["./upload-documents.component.css"],
})
export class UploadDocumentsComponent implements OnInit {
  profileImage: any;
  imggChange: any = false;
  profileImage1: any;
  imggChange1: any = false;
  uploadProfileImage: any;
  uploadProfileImage1: any;
  timestampclosing: any;
  timestampopening: any;
  submitted: Boolean = false;
  fileIsPdfOrNot = false;
  fileIsPdfOrNotForLicense = false;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private session: WebStorageService

  ) { }
  idProofUrl: string | ArrayBuffer | null = null;
  openingTime: any
  restaurantData: any
  ngOnInit() {
    const storedData = sessionStorage.getItem('curve-restaurants');
    if (storedData) {
      this.restaurantData = JSON.parse(storedData);
      if (this.restaurantData.documents) {
        this.url = this.restaurantData.documents.license;
        this.url1 = this.restaurantData.documents.idProof;
        this.profileImage = this.restaurantData.documents.license;
        this.profileImage1 = this.restaurantData.documents.idProof;
        if(this.restaurantData?.documents?.license && this.endsWithPdf(this.restaurantData.documents?.license)){
          this.fileIsPdfOrNotForLicense = true;
        }
        if(this.restaurantData?.documents?.idProof && this.endsWithPdf(this.restaurantData.documents?.idProof)){
          this.fileIsPdfOrNot = true;
        }

        // if (this.restaurantData.documents.workingDays.length == 7){
        //   this.selectedDay =  this.restaurantData.documents.workingDays;
        //   this.isSelectedAll()
        // }
      }
     
      // if (this.restaurantData.documents?.openingTime) {
      //   const openTime = new Date(Number(this.restaurantData.documents?.openingTime));
      //   const openTime1 = openTime.toLocaleTimeString('en-US', {
      //     hour: 'numeric',
      //     minute: 'numeric',
      //     hour12: true
      //   });
      //   this.addResturantDocumentsForm.patchValue({
      //     openingTime: openTime1
      //   });
      // }

      // if (this.restaurantData.documents?.closingTime) {
      //   const closeTime = new Date(Number(this.restaurantData.documents?.closingTime));
      //   const closeTime1 = closeTime.toLocaleTimeString('en-US', {
      //     hour: 'numeric',
      //     minute: 'numeric',
      //     hour12: true
      //   });
      //   this.addResturantDocumentsForm.patchValue({
      //     closingTime: closeTime1
      //   });
      // }
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  url: any;
  url1: any;
  selectedDay: any[] = [];
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxFileSizeMB = 2; // Example: 5MB limit
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
      const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

      // Check if the file type is allowed
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Only PNG, JPG, JPEG and PDF files are allowed');
        return;
      }

      if (file.size > maxFileSizeBytes) {
        this.toastr.error(` Max ${maxFileSizeMB}MB is allowed`);
        return;
      }

      var reader = new FileReader();
      this.uploadProfileImage = file;

      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        try {
          this.uploadImage(this.profileImage);
          this.url = event.target.result;
        } catch (error) {
          alert('There was an error uploading your file. Please try again.');
        }
      };

      if (file.type === 'application/pdf') {
        this.fileIsPdfOrNotForLicense = true;
      } else {
        this.fileIsPdfOrNotForLicense = false;
      }
    }
  }

  // onSelectFile(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     this.uploadProfileImage = event.target.files[0];

  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.uploadImage(this.profileImage);
  //       this.url = event.target.result;
  //     };
  //     if(event?.target?.files[0]?.type == 'application/pdf'){
  //       this.fileIsPdfOrNotForLicense = true;
  //     }else{
  //       this.fileIsPdfOrNotForLicense = false;
  //     }

  //   }
  // }

  onSelectFile2(event: any) {
    const maxSizeInBytes = 2 * 1024 * 1024; // 10 MB limit
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Only PNG, JPG, JPEG and PDF files are allowed');
        return; // Stop further processing
      }

      // Check file size
      if (file.size > maxSizeInBytes) {
        this.fileIsPdfOrNot = file.type === 'application/pdf';
        this.toastr.error('Max 2MB is allowed ');
        return; // Stop further processing
      }

      var reader = new FileReader();
      this.uploadProfileImage1 = file;
      reader.readAsDataURL(file); // read file as data url

      reader.onload = (event: any) => {
        if (file.type === 'application/pdf') {
          this.fileIsPdfOrNot = true;
        } else {
          this.fileIsPdfOrNot = false;
        }
        this.uploadImage1(this.profileImage1);
        this.url1 = event.target.result;
      };

      // Handle errors during file reading
      reader.onerror = () => {
        alert('An error occurred while reading the file. Please try again.');
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
  workingDays: any = [
    { showName: "Mon", value: "Monday", checked: false },
    { showName: "Tue", value: "Tuesday", checked: false },
    { showName: "Wed", value: "Wednesday", checked: false },
    { showName: "Thur", value: "Thursday", checked: false },
    { showName: "Fri", value: "Friday", checked: false },
    { showName: "Sat", value: "Saturday", checked: false },
    { showName: "Sun", value: "Sunday", checked: false },
  ];

  getWokingDay(event: any) {
    this.selectedDay = event.value;
     this.workingDays.forEach((day:any) => {
      day.checked = this.selectedDay.includes(day.value);
      if(!day.checked){
        day.color = ''
        this.selectAllChecked = false
      }
      
    });
  }
  selectedTime: any;
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
    // this.timestampclosing = currentDate.getTime();
    this.timestampopening = currentDate.getTime();
    return currentDate.getTime()
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
    return currentDate.getTime()

  }

  addResturantDocumentsForm: FormGroup = new FormGroup({
    license: new FormControl("", [Validators.required]),
    idProof: new FormControl("", [Validators.required]),
  
  });

  adddocumentResturants() {

    this.submitted = true;
  
    if (this.restaurantData?.documents?.license && this.restaurantData.documents.idProof ) {
     // this.selectedDay = this.restaurantData.documents.workingDays
      this.addResturantDocumentsForm.patchValue({
        license: this.restaurantData.documents.license,
        idProof : this.restaurantData.documents.idProof,
//workingDays : this.restaurantData.documents.workingDays
      });
      
    }
    else{
      this.addResturantDocumentsForm.patchValue({
        license: this.profileImage,
        idProof : this.profileImage1,
       // workingDays : this.selectedDay
      });
    }
    // if (this.addResturantDocumentsForm.invalid) {
    //   return;
    // }

    // if (this.selectedDay.length <= 0) {
    //   this.toastr.warning("Please select working days!");
    //   return;
    // }
    const openingDate = new Date(this.timestampopening);
    const closingDate = new Date(this.timestampclosing);

    // if (openingDate.getTime() > closingDate.getTime()) {
    //   this.toastr.error("Closing Time should be greater than Opening Time");
    //   return;
    // }
    let data = this.addResturantDocumentsForm.value;
    data.license = this.addResturantDocumentsForm?.value?.license ? this.addResturantDocumentsForm?.value?.license : this.profileImage;
    data.idProof = this.addResturantDocumentsForm?.value?.idProof ? this.addResturantDocumentsForm?.value?.idProof : this.profileImage1;
    // data.workingDays = this.addResturantDocumentsForm?.value?.workingDays ? this.addResturantDocumentsForm?.value?.workingDays : this.selectedDay;
    // data.openingTime =  this.addResturantDocumentsForm?.value?.openingTime ? this.handleTimeSet(this.addResturantDocumentsForm?.value?.openingTime) : this.timestampopening;
    // data.closingTime = this.addResturantDocumentsForm?.value?.closingTime ? this.handleTimeSet1(this.addResturantDocumentsForm?.value?.closingTime) : this.timestampclosing;
    this.api.put("addSupDocuments", data).subscribe({
      next: (res: any) => {
        this.session.setSessionStorage(
          "curve-restaurants",
          JSON.stringify(res.data)
        );
        if(res.data.isDocumentsUploaded == true){
          this.toastr.success(res.message)
          // this.toastr.success("Profile is Under Review");
          // this.router.navigateByUrl("/login");
        // }else{

          // this.toastr.success("Restaurants document details added successfully!");
          this.router.navigateByUrl("/bank-detail");
        }
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }



  commonFunctionForError(error: any) {
    const control = this.addResturantDocumentsForm.controls[error];
    if (
      (this.submitted || control.touched || control.dirty) &&
      control.errors
    ) {
      return true;
    }
    return false;
  }

  selectAllChecked: boolean = false;
  getChecked: boolean = true;
  
  selectAll() {
      this.selectAllChecked = !this.selectAllChecked;
      this.workingDays.forEach((item: any) => {
          item.checked = this.selectAllChecked;
          item.color = this.selectAllChecked ? "#33bd8c" : "";
  
          if (this.selectAllChecked) {
              if (!this.selectedDay.includes(item.value)) {
                  this.selectedDay.push(item.value);
              }
          } else {
              this.selectedDay = [];
          }
      });
  
      this.getChecked = this.selectedDay.length !== 7;
  }
  
  isSelectedAll() {
      return this.selectedDay.length === 7;
  }
  
  endsWithPdf(url: string): boolean {
    return url.endsWith('.pdf');
  }
}
