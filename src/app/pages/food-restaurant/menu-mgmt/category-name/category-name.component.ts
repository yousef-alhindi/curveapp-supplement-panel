import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { elementAt } from "rxjs";
import { ApiService } from "src/app/service/api.service";
import { AddDialogComponent } from "../../common-dialog/add-dialog/add-dialog.component";
import { DescriptionDialogComponent } from "../description-dialog/description-dialog.component";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { DeleteDialogComponent } from "../../common-dialog/delete-dialog/delete-dialog.component";
import { ImageDialogComponent } from "src/app/image-dialog/image-dialog.component";

export interface PeriodicElement1 {
  s_no: number;
  item: string;
  price: string;
  img: string;
  customize: string;
  type: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    s_no: 1,
    item: "Lorem Ipsum",
    price: "12/02/2024 I 10 AM",
    img: "30 Items",
    customize: "30 Items",
    type: "Lorem",
  },
];

@Component({
  selector: "app-category-name",
  templateUrl: "./category-name.component.html",
  styleUrls: ["./category-name.component.css"],
})
export class CategoryNameComponent {
  displayedColumns1: string[] = [
    "s_no",
    "item",
    "price",
    "img",
    "description",
    "customize",
    "type",
    "action",
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;
  categoryId: any;
  searchKey: any;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.categoryId) {
    }
    this.getmenuList();
  }

  selectedItemType: number = -1;

  filterData() {
    const selectedGender = (
      document.getElementById("genderSelect") as HTMLSelectElement
    ).value.toLowerCase();
    if (selectedGender === "1") {
      this.dataSource1.data = this.mymenulist.filter(
        (user: any) => user.itemType === 1
      );
    } else if (selectedGender === "2") {
      this.dataSource1.data = this.mymenulist.filter(
        (user: any) => user.itemType === 2
      );
    } else {
      this.dataSource1.data = this.mymenulist;
    }
  }

  itemType = 3;
  mymenulist: any;
  getmenuList() {
    this.api
      .get1(
        `menu/list?resCategoryId=${this.categoryId}&itemType=${this.itemType}`
      )
      .subscribe({
        next: (res: any) => {
          this.mymenulist = res.data["list"];
          this.dataSource1 = new MatTableDataSource(this.mymenulist);
          this.dataSource1.paginator = this.MatPaginator1;
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource1.filter = filterValue;

    this.dataSource1.filterPredicate = (data: any, filter: string) => {
      // Assuming 'someProperty' is the field you want to filter on
      return data.name.toLowerCase().includes(filter);
    };
  }

  deletecategory(data: any) {
    this.api.put1("menu/delete", { _id: data._id, isDeleted: true }).subscribe({
      next: (res: any) => {
        this.mymenulist = res.data;
        this.getmenuList();
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  addDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    type: any,
    element: any
  ): void {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: "850px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { type, categoryId: this.categoryId, itemType: element.itemType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getmenuList();
      this.searchKey = "";
    });
  }

  openEditDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    type: any,
    element: any
  ) {
    element.type = type;
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: "850px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getmenuList();
    });
  }

  enableDisableadvertisement(id: any, status: MatSlideToggleChange) {
    const eventstatus = status.checked ? true : false;
    let data = {
      _id: id,
      status: eventstatus,
    };
    this.api.put1(`menu/changeStatus`, data).subscribe({
      next: (res: any) => {
        if (status.checked) {
          this.toaster.error("Menu item enable successfully");
        } else {
          this.toaster.success("Menu  item disable successfully");
        }
        this.getmenuList();
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  descriptionDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any
  ): void {
    this.dialog.open(DescriptionDialogComponent, {
      width: "650px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { element },
    });
  }

  deleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any
  ): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "400px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === "yes") {
        this.deletecategory(element);
      }
    });
  }

  redirectToCustomizeItem(item: any) {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([
        `/supplement/menu-mgmt/item-name/${item.name}/${item._id}`,
      ]);
    });
  }

  openImageDialog(element: any): void {
    this.dialog.open(ImageDialogComponent, {
      width: "400px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      data: { element },
    });
    console.log(element);
  }
}
