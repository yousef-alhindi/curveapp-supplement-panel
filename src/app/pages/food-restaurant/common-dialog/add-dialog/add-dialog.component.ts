import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import { PaymentDialogComponent } from "../payment-dialog/payment-dialog.component";
import { twoDecimalValidator } from "src/app/service/common.service";

@Component({
  selector: "app-add-dialog",
  templateUrl: "./add-dialog.component.html",
  styleUrls: ["./add-dialog.component.css"],
})
export class AddDialogComponent {
  categoryId: any;
  nutrition!: FormArray;
  bidAmount = new FormControl("", Validators.required);
  categoryForm: FormGroup;
  submitted: Boolean = false;
  spendPerDayAmount: number = 0;
  categoryName: any;
  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDialogComponent>
  ) {
    if (data.catName && data.catId) {
      this.categoryName = data.catName;
    }
    this.categoryForm = new FormGroup({
      categoryName: new FormControl("", Validators.required),
      _id: new FormControl(""),
    });
    this.categoryId = data.categoryId;
    if (data.element != 0) {
      this.bidSpendform.patchValue({ amount: data.element });
    }
  }

  editdata: any;
  ngOnInit() {
    this.patchData();
    this.patchDataMenu();
    this.getdeliverychargeList();
  }
  patchData() {
    if (this.data.element) {
      this.categoryForm.patchValue({
        categoryName: this.data.element.resCategory,
      });
    }
  }

  get h() {
    return this.deliverychargeform.controls;
  }

  get e() {
    return this.bidSpendform.controls;
  }

  get f() {
    return this.categoryForm.controls;
  }

  get g() {
    return this.AdditemForm.controls;
  }

  get d() {
    return this.AddWalletAmount.controls;
  }

  patchDataMenu() {
    if (this.data?.type == 2 && this.data?._id) {
      this.AdditemForm.patchValue({
        name: this.data.name,
        description: this.data.description,
        itemType: this.data.itemType || 1,
        price: this.data.price,
        image: this.data.image,
        nutrition: this.data.nutrition,
        categoryId: this.data.categoryId,
      });
      this.itemImage = this.data.image;
    }
  }

  deliverychargeform: FormGroup = new FormGroup({
    deliveryCharge: new FormControl("", Validators.required),
    minOrderToFree: new FormControl("", Validators.required),
  });

  bidSpendform: FormGroup = new FormGroup({
    amount: new FormControl("", Validators.required),
  });

  placeBidForm: FormGroup = new FormGroup({
    amount: new FormControl("", Validators.required),
  });

  AddWalletAmount: FormGroup = new FormGroup({
    amount: new FormControl("", Validators.required),
  });

  AdditemForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    itemType: new FormControl(1, Validators.required),
    price: new FormControl("", [Validators.required, twoDecimalValidator]),
    image: new FormControl("", Validators.required),
    resCategoryId: new FormControl(),
    nutrition: this.createItem(),
  });
  get formData() {
    {
      return <FormArray>this.AdditemForm.get("nutrition");
    }
  }

  get nutritionFB() {
    return (this.AdditemForm.get("nutrition") as FormGroup).controls;
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      carbs: new FormControl("", Validators.required),
      calories: new FormControl("", Validators.required),
      protein: new FormControl("", Validators.required),
      fat: new FormControl("", Validators.required),
    });
  }
  addItem(): void {
    this.nutrition = this.AdditemForm.get("nutrition") as FormArray;
    this.nutrition.push(this.createItem());
  }

  Addcategory() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    let data = this.categoryForm.value;
    delete this.categoryForm.value._id;

    if (!this.data.element) {
      this.api.post1("category/add", data).subscribe({
        next: (res: any) => {
          this.toaster.success("Category added successfully");
          this.dialogRef.close({ success: true });
        },
        error: (err: any) => {
          this.toaster.error(err.error.message);
        },
      });
    } else {
      let apidata = this.categoryForm.value;
      (apidata.categoryName = this.categoryForm.value.categoryName),
        (apidata._id = this.data.element._id),
        this.api.put1("category/edit", apidata).subscribe({
          next: (res: any) => {
            this.toaster.success("Category updated successfully");
            this.dialogRef.close({ success: true });
          },
          error: (err: any) => {
            this.toaster.error(err.error.message);
          },
        });
    }
  }

  url: any;
  // onSelectFile(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const selectedFile = event.target.files[0];

  //     if (this.isValidFileType(selectedFile.type)) {
  //       this.uploadImage(selectedFile);
  //     } else {
  //       this.toaster.error('Please select a PNG, JPG, JPEG, or PDF file');
  //       return; // Exit the function if the file type is invalid
  //     }
  //   }
  // }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      console.log(
        "=====================",
        this.isValidFileType(selectedFile.type),
        selectedFile.type
      );
      if (this.isValidFileType(selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
            this.uploadImage(selectedFile);
            this.uploadImage(selectedFile);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // this.uploadImage(selectedFile);
        this.toaster.error("Please select a PNG, JPG, JPEG");
        return;
      }
    }
  }

  private isValidFileType(fileType: string): boolean {
    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    return validTypes.includes(fileType);
  }

  itemImage: any;
  uploadImage(img: any) {
    console.log(img);

    let data = new FormData();
    data.append("upload_restaurant_file", img);
    this.api.post("uploadFile", data).subscribe((res: any) => {
      this.itemImage = res.data;
    });
  }

  onKeyPress(event: KeyboardEvent) {
    this.api.preventWrongPriceInput(event);
  }
  onPriceKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    // Allow only numbers and a single decimal point
    const char = String.fromCharCode(event.charCode);
  
    // Prevent any input other than digits or decimal
    if (!/[\d.]/.test(char)) {
      event.preventDefault();
      return;
    }
  
    // If there's already a decimal point, prevent entering another one
    if (char === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }
  
    // Prevent more than two digits after the decimal
    const [integer, decimal] = value.split('.');
    if (decimal && decimal.length >= 2 && input.selectionStart! > value.indexOf('.')) {
      event.preventDefault();
    }
  }
  

  AddDeliveryCharge() {
    this.submitted = true;

    if (this.deliverychargeform.invalid) {
      return;
    }

    let data = this.deliverychargeform.value;
    this.api.post1("deliveryCharge/addEdit", data).subscribe({
      next: (res: any) => {
        this.toaster.success("Delivery Charges updated successfully ");
        this.dialogRef.close({ success: true });
      },
      error: (err: any) => {
        this.toaster.error(err.error.message);
      },
    });
  }

  placespentPerDay() {
    console.log("submitted");
    this.submitted = true;
    if (this.bidSpendform.invalid) {
      return;
    }
    let data = { amount: parseInt(this.bidSpendform.value.amount) };

    this.api.post1("sponsor/spentPerDay", data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dialogRef.close({ success: true, type: this.data.type });
      },
      error: (err: any) => {
        console.log(err);
        this.toaster.error(err["error"]["message"]);
      },
    });
  }

  placeBidNOw() {
    console.log("submitted");
    this.submitted = true;
    if (this.bidAmount.invalid) {
      return;
    }
    this.api.post1("sponsor/bid", { amount: this.bidAmount.value }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dialogRef.close({ success: true, type: this.data.type });
      },
      error: (err: any) => {
        console.log(err);
        this.toaster.error(err["error"]["message"]);
      },
    });
  }

  chargekist: any;
  getdeliverychargeList() {
    // this.api.get1("deliveryCharge/list").subscribe({
    //   next: (res: any) => {
    //     this.chargekist = res.data;
    //     this.deliverychargeform.patchValue({
    //       deliveryCharge: this.chargekist.deliveryCharge,
    //       minOrderToFree: this.chargekist.minOrderToFree
    //     })
    //     console.log()
    //   },
    //   error: (err: any) => {
    //     console.log(err.error.message);
    //   },
    // });
  }

  AddwalletAmount() {
    this.submitted = true;
    if (this.AddWalletAmount.invalid) {
      return;
    }
    let data = this.AddWalletAmount.value;
    let dialogRefP = this.dialog.open(PaymentDialogComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      data: this.AddWalletAmount.value,
    });
    dialogRefP.afterClosed().subscribe((result: any) => {
      if (result && result.walletSuccess) {
        this.payNOw(data);
      }
    });
    console.log(this.AddWalletAmount.value);
  }

  payNOw(data: any) {
    this.api.post1("wallet/addBalance", data).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        const stopDialogRef = this.dialog.open(AddDialogComponent, {
          width: "400px",
          height: "auto",
          maxHeight: "100vh",
          maxWidth: "90vw",
          panelClass: "layout-dialog",
          enterAnimationDuration: "500ms",
          exitAnimationDuration: "500ms",
          data: { type: 10, element: "" },
        });

        setTimeout(() => {
          stopDialogRef.close();
        }, 3000);
      },
      error: (err: any) => {
        this.toaster.error(err.error.message);
      },
    });
  }

  Additem() {
    this.submitted = true;
    console.log("====", this.AdditemForm);
    if (this.AdditemForm.invalid) {
      return;
    }
    let data = this.AdditemForm.value;
    data.image = this.itemImage;
    data.resCategoryId = this.categoryId;

    if (!this.data._id) {
      this.api.post1("menu/add", data).subscribe({
        next: (res: any) => {
          this.toaster.success("Item added successfully ");
          this.dialogRef.close({ success: true });
        },
        error: (err: any) => {
          this.toaster.error(err.error.message);
        },
      });
    } else {
      data._id = this.data._id;
      this.api.put1("menu/edit", data).subscribe({
        next: (res: any) => {
          this.toaster.success("Item Updated successfully ");
          this.dialogRef.close({ success: true });
        },
        error: (err: any) => {
          this.toaster.error(err.error.message);
        },
      });
    }
  }

  addCat() {
    if (this.data.catName && this.data.catId) {
      let data2 = {
        _id: this.data.catId,
        categoryName: this.categoryName,
      };
      this.api.put1("packageCategory/edit", data2).subscribe({
        next: (res: any) => {
          this.dialogRef.close(true);
          this.toastr.success("Category updated successfully");
          return;
        },
        error: (err: any) => {
          console.log(err.error["message"]);
          return;
        },
      });
    } else {
      let data1 = {
        categoryName: this.categoryName,
      };
      this.api.post1("packageCategory/add", data1).subscribe({
        next: (res: any) => {
          this.dialogRef.close(true);
          this.toastr.success("Category created successfully");
        },
        error: (err: any) => {
          console.log(err.error["message"]);
        },
      });
    }
  }
}

