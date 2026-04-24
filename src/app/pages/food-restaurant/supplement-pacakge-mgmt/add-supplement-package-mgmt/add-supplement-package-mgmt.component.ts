import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { ApiService } from "src/app/service/api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-supplement-package-mgmt",
  templateUrl: "./add-supplement-package-mgmt.component.html",
  styleUrls: ["./add-supplement-package-mgmt.component.css"],
})
export class AddSupplementPackageMgmtComponent {
  addSuppForm: FormGroup;
  editData:boolean=false
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router, private route:ActivatedRoute
  ) {
    this.addSuppForm = this.fb.group({
      supplementPkgId:[''],
      image:['',Validators.required],
      name: ["", Validators.required],
      price: ["", Validators.required],
      type: ["", Validators.required],
      gender: ["", Validators.required], //['unisex', 'men' ,'women'],
      description: ["", Validators.required],
      products: [[], Validators.required],
    });
  }
  get f() {
    return this.addSuppForm.controls;
  }
  dropdownList: any = [];
  dropdownSettings: any = {};
  public id: any | null = null;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']; // 'id' is the query parameter
      console.log('ID from Query Params:', this.id);
    });
    if(this.id){
      this.editData =true
      this.getSuppById(this.id)
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      enableCheckAll	:false,
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
    // this.getSupplementList();
  }
  onItemSelect(item: any) {
    const selectedSupplement = this.supplement.find(
      (supp: any) => supp.item_id === item.item_id
    );

    if (selectedSupplement) {
      const stock = selectedSupplement.stock;
      this.product("500ms", "500ms", item.item_id, item.item_text, stock);
    }
  }
  patchData:any
  initialProducts: any[] = [];
  getSuppById(id: string): void { 
    this.api.get1(`supplementPkgMgmt/viewSupplementPkg/${id}`).subscribe(
          (res: any) => {
            const data = res.data;
            console.log('Fetched Data:', data);
    
            // Store initial products data
            this.initialProducts = data.products.map((product: any) => ({
              _id: product._id,
              stockId: product.stockId, // Assuming the product's name is the text to be shown
            }));
    
            // Patch the form with the fetched data
            this.addSuppForm.patchValue({
              name: data.name,
              price: data.price,
              gender: data.gender,
              description: data.description,
              type:data.type,
              image:data.image
            });
    
            // Patch products (initial value)
            this.addSuppForm.patchValue({
              products: this.initialProducts, // Patch the 'products' field with initial data
            });
    
            this.patchData = data; // Store patchData to refer later
          },
          (error) => {
            console.error('Error fetching supplement:', error);
          }
        );
      }
      onTypeChange(event: any) {
        const type = event.value;  // Get the selected value
        this.getSupplementList(type);  // Call the API with the selected type
      }
  supplement: any;
  getSupplementList(type:any) {
    this.api.get1(`supplementPkgMgmt/getSupplementList?type=${type}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.supplement = res.data["supplements"].map((supplement: any) => ({
          item_id: supplement._id,
          item_text: supplement.name,
          stock: supplement.stock,
        }));
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }
  onItemDeselect(item: any): void {
    // Get the current value of the products form control
    const selectedProducts = this.addSuppForm.get('products')?.value;
  
    // Filter out the deselected item
    const updatedProducts = selectedProducts.filter(
      (product: any) => product.item_id !== item.item_id
    );
  
    // Update the form control with the new array
    this.addSuppForm.get('products')?.setValue(updatedProducts);
  
    console.log('Updated Products after Deselect:', updatedProducts);
  }
  products: { _id: string; stockId: string }[] = [];
  product(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: any,
    text: any,
    stock: any
  ): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: "500px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id, text, stock }, // Pass stock data to the dialog
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res._id) {
        console.log("Selected Stock:", res);

        // Add the id and selected stockId to the products array
        this.products.push({ _id: id, stockId: res._id });

        console.log("Updated Products:", this.products);
      } else {
        console.log(
          "Dialog closed without selection or no valid stock selected"
        );
      }
    });
  }
  submitted: boolean = false;
  submit() {
    this.submitted = true;
    if (this.addSuppForm.invalid) {
      return;
    }
    let data = this.addSuppForm.value;
    data.products = this.products;
    data.image = this.profileImage
    this.api.post1("supplementPkgMgmt/addSupplementPkg", data).subscribe({
      next: (res: any) => {
        this.toastr.success("Supplement Package Added");
        this.router.navigate(["supplement/supplement-pacakge-mgmt"]);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  submit2() {
    this.submitted = true;
    if (this.addSuppForm.invalid) {
      return;
    }
    const formValue = this.addSuppForm.value;
    // formValue.image = this.profileImage
    const updatedProducts = this.products.length > 0 ? this.products : this.initialProducts;

    const data = {
      ...formValue,
      products: updatedProducts, // Either the newly selected products or the original ones
      supplementPkgId : this.id,
      image:this.profileImage
    };
    
    this.api.patch1("supplementPkgMgmt/editSupplementPkg", data).subscribe({
      next: (res: any) => {
        this.toastr.success("Supplement Package Updated Successfully");
        this.router.navigate(["supplement/supplement-pacakge-mgmt"]);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  url: any;
  selectedDay: any[] = [];
  uploadProfileImage: any;
  profileImage:any;
  imggChange: any = false;
  fileIsPdfOrNotForLicense = false;
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
  uploadImage(img: any) {
    this.imggChange = true;
    let data = new FormData();
    data.append("upload_supplement_file", this.uploadProfileImage);
    this.api.post("uploadFile", data).subscribe((data: any) => {
      this.profileImage = data.data;
    });
  }
}
