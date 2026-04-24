import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LocationDialogComponent } from "./location-dialog/location-dialog.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { WebStorageService } from "src/app/service/web-storage.service";

@Component({
  selector: "app-add-restaurant-location",
  templateUrl: "./add-restaurant-location.component.html",
  styleUrls: ["./add-restaurant-location.component.css"],
})
export class AddRestaurantLocationComponent {
  url: any;
  getAddress: any = "";
  objectValue: any;
  getZipCode: any
  submitted: Boolean = false;
  profileImage: any;
  imggChange: any = false;
  uploadProfileImage: any;
  dialogRef: MatDialogRef<LocationDialogComponent> | undefined;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private session: WebStorageService

  ) { }

  restaurantData: any
  ngOnInit() {
    this.restaurantData = JSON.parse(
      this.session.getSessionStorage("curve-restaurants") || ""
    );
    if (this.restaurantData) {
      this.RestaurantAddressForm.patchValue({
        long: this.restaurantData?.location?.coordinates[0],
        lat: this.restaurantData?.location?.coordinates[1],
        address: this.restaurantData?.addressDetails?.address,
        street: this.restaurantData?.addressDetails?.street,
        building: this.restaurantData?.addressDetails?.building,
        postalCode: this.restaurantData?.addressDetails?.postalCode
      })
      this.getAddress = this.restaurantData?.addressDetails?.address
      this.getZipCode = this.restaurantData?.addressDetails?.postalCode
      this.url = this.restaurantData?.addressDetails?.supLogo

      this.profileImage = this.restaurantData?.addressDetails?.supLogo

    }
  }

  locationDialog() {
    this.dialogRef = this.dialog.open(LocationDialogComponent, {
      width: "400px",
      height: "100vh",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "bg-color",
      position: { right: "0px", top: "0px" },
    });

    this.dialogRef.componentInstance.dataEvent.subscribe((data: any) => {
      this.objectValue = data;
      this.getAddress = data.address;
      this.getZipCode = data.zipCode
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const file = event.target.files[0];
      this.uploadProfileImage = event.target.files[0];
      if (!file.type.startsWith('image/')) { // Check if the selected file is not an image
        event.target.value = null; // Reset the file input
        this.toastr.error('Please select a PNG, JPG, JPEG');
        return;
      }
      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        event.target.value = null; 
        this.toastr.error(`Max ${maxSizeInMB} MB is allowed.`);
        return;
      }
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed

        this.url = event.target.result;
        this.uploadImage(this.profileImage);
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

  RestaurantAddressForm: FormGroup = new FormGroup({
    long: new FormControl(""),
    lat: new FormControl(""),
    address: new FormControl("", [Validators.required]),
    street: new FormControl(""),
    building: new FormControl(""),
    postalCode: new FormControl("", [Validators.required]),
    supLogo: new FormControl("", Validators.required),
  });
  isReadOnly: boolean = false;
  postalCode: any
  onValueChange(value: string) {
    this.postalCode = value;
    this.isReadOnly = !!this.postalCode; // Set readonly if there's a value
  }

  addResturantAddress() {
    this.submitted = true;
    if(this.profileImage){
      this.RestaurantAddressForm.patchValue({
        supLogo: this.profileImage,
      })
    }
    if (this.RestaurantAddressForm.invalid) {
      return;
    }
    let data = this.RestaurantAddressForm.value;
    data.lat = this.objectValue?.lat ? this.objectValue?.lat : this.restaurantData?.location?.coordinates[0] ,
    data.long = this.objectValue?.lng ? this.objectValue?.lng : this.restaurantData?.location?.coordinates[1],
      
      data.address = this.getAddress;
    data.postalCode = this.getZipCode ? this.getZipCode : this.restaurantData?.addressDetails?.postalCode;
    data.supLogo = this.restaurantData?.addressDetails?.supLogo ? this.restaurantData?.addressDetails?.supLogo : this.profileImage;
    this.api.put("addSupLocation", data).subscribe({
      next: (res: any) => {
        this.session.setSessionStorage(
          "curve-restaurants",
          JSON.stringify(res.data)
        );
        this.toastr.success("Restaurant location added successfully ");
        this.router.navigateByUrl("/upload-documents");
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  commonFunctionForError(error: any) {
    if (this.submitted && this.RestaurantAddressForm.controls[error].errors) {
      return true;
    }
    return false;
  }
}
