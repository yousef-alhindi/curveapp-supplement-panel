import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-add-edit-supplement",
  templateUrl: "./add-edit-supplement.component.html",
  styleUrls: ["./add-edit-supplement.component.css"],
})
export class AddEditSupplementComponent {
  imageUrl: string = "";
  imageUrl1: string = "";
  imageUrl2: string = "";
  imageUrl3: string = "";
  imageUrl4: string = "";
  patchValueData: any;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      let data = window.history.state.data;
      this.patchValueData = data;
      console.log(this.patchValueData);
      if (
        this.patchValueData == null ||
        this.patchValueData == "" ||
        this.patchValueData == undefined
      ) {
        this.addSupplementForm.reset();
        this.hideField = false;
      } else {
        this.edit();
      }
    });
  }
  hideField: boolean = false;
  edit() {
    this.hideField = true;
  
    // Patch the simple fields
    this.addSupplementForm.patchValue({
      type: this.patchValueData.type,
      name: this.patchValueData.name,
      brandName: this.patchValueData.brandName,
      description: this.patchValueData.description,
    });
  
    // Patch the stock array
    const stockArray = this.patchValueData.stock;
    const fieldsArray = this.fieldsArray; // Shortcut to FormArray
  
    // Clear existing controls
    fieldsArray.clear();
  
    // Add new controls based on stock data
    stockArray.forEach((stock: any) => {
      fieldsArray.push(
        this.fb.group({
          size: [stock.size, Validators.required],
          quantity: [stock.quantity, Validators.required],
          mrp: [stock.mrp, Validators.required],
          sellingPrice: [stock.sellingPrice, Validators.required],
        })
      );
    });
  
    // Patch the images
    this.imageurls4 = this.patchValueData.images;
  }
  

  profileImage: any;
  imggChange: any = false;
  profileImage1: any;
  isImageChange: any = false;
  uploadProfileImage: any;
  uploadProfileImage1: any;
  timestampclosing: any;
  timestampopening: any;
  submitted: Boolean = false;
  fileIsPdfOrNot = false;
  fileIsPdfOrNotForLicense = false;
  url: any;
  url2: any;
  url3: any;
  url4: any;
  showUploadSection1 = true;
  uploadButtonHidden = false;

  url1 = "assets/img/image.png/";
  multiple1: any = [];
  isImageChange1 = false;
  selectedDay: any[] = [];
  uploadFile(event: any, type: string) {
    this.isImageChange = true;
    this.multiple1 = [];
    const multipleFiles = event.target.files;
    const uploadedImages = event.target.files.length;
    let totalImagesupload;
    let totalImageMenu;
    if (type === "upload") {
      totalImagesupload = this.imageurls4.length + uploadedImages;
    }
    if (totalImagesupload > 5) {
      this.toaster.warning("You can upload a maximum of 5 files");
      event.target.value = "";
      return;
    }
    if (totalImagesupload === 10) {
      this.uploadButtonHidden = true;
    } else {
      this.uploadButtonHidden = false;
    }
    const uploadPromises = [];
    for (let i = 0; i < multipleFiles.length; i++) {
      const file = multipleFiles[i];
      const promise = new Promise((resolve, reject) => {
        const multipleReader = new FileReader();
        multipleReader.onload = (e: any) => {
          const imageUrl = e.target.result;
          this.multiple1.push(imageUrl);
          resolve(file);
        };
        multipleReader.readAsDataURL(file);
      });

      uploadPromises.push(promise);
    }
    Promise.all(uploadPromises).then((files) => {
      for (const file of files) {
        this.uploadImage(file, type);
      }
    });
  }
  removeImage4(index: number) {
    this.imageurls4.splice(index, 1);
    if (this.imageurls4.length < 10) {
      this.uploadButtonHidden = false;
    }
  }

  // uploadImage(img: any) {
  //   this.imggChange = true;
  //   let data = new FormData();
  //   data.append("upload_supplement_file", this.uploadProfileImage);
  //   this.api.post("uploadFile", data).subscribe((data: any) => {
  //     this.profileImage = data.data;
  //   });
  // }

  profileImage2: any;
  gstFrontImage: any;
  gstBackImage: any;

  licenseFrontImage: any;
  licenseBackImage: any;
  status1: any;
  coverImage: any;
  uploadImage(uploadProfileImage: any, type: string) {
    let data = new FormData();
    data.append("upload_supplement_file", uploadProfileImage);
    this.api.post("uploadFile", data).subscribe((data: any) => {
      if (type === "upload") {
        this.imageurls4.push(data.data);
      }
    });
  }
  imageurls4: string[] = [];
  removeImage(): void {
    this.imageUrl = "";
  }

  onFileSelected1(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl1 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage1(): void {
    this.imageUrl1 = "";
  }

  onFileSelected2(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl2 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage2(): void {
    this.imageUrl2 = "";
  }

  onFileSelected3(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl3 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage3(): void {
    this.imageUrl3 = "";
  }

  onFileSelected4(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl4 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addSupplementForm = new FormGroup({
    supplementId: new FormControl(""),
    type: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    brandName: new FormControl("", Validators.required),
    fieldsArray: this.fb.array([this.createField()]),
    // quantity: new FormControl('', Validators.required),
    // size: new FormControl('',Validators.required),
    // sellingPrice: new FormControl('',Validators.required),
    // mrp: new FormControl('',Validators.required),
    description: new FormControl("", Validators.required),
    images: new FormControl<string[]>([]), // Define the type explicitly as string[]
  });
  get f() {
    return this.addSupplementForm.controls;
  }
  get fieldsArray(): FormArray {
    return this.addSupplementForm.get("fieldsArray") as FormArray;
  }
  addField(): void {
    this.fieldsArray.push(this.createField());
  }

  removeField(index: number): void {
    this.fieldsArray.removeAt(index);
  }
  createField(): FormGroup {
    return this.fb.group({
      size: ["", Validators.required],
      quantity: ["", Validators.required],
      mrp: ["", Validators.required],
      sellingPrice: ["", Validators.required],
    });
  }
  addSupplement() {
    this.submitted = true;

    if (this.addSupplementForm.invalid) {
      return;
    }
    let data = {
      ...this.addSupplementForm.value,
      images: this.imageurls4,
      stock: this.fieldsArray.value, // Add stock directly
    };
    if (!this.patchValueData) {
      this.api.post1("supplementMgmt/addSupplement", data).subscribe({
        next: (res: any) => {
          this.toaster.success("Supplement Added Successfully");
          this.router.navigate(["/supplement/supplement-mgmt"]);
        },

        error: (err: any) => {},
      });
    } else {
      data.supplementId = this.patchValueData._id;
      this.api.patch1("supplementMgmt/editSupplement", data).subscribe({
        next: (res: any) => {
          this.toaster.success("Supplement Added Successfully");
          this.router.navigate(["/supplement/supplement-mgmt"]);
        },

        error: (err: any) => {},
      });
    }
  }
}
