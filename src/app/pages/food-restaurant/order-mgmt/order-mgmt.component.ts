import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DetailDialogComponent } from "../common-dialog/detail-dialog/detail-dialog.component";
import { RatingDialogComponent } from "../common-dialog/rating-dialog/rating-dialog.component";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl } from "@angular/forms";

export interface PeriodicElement1 {
  id: string;
  customer: string;
  order_at: string;
  // order_type: string;
  location: string;
  total: string;
  discount: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    // order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    // order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
];

export interface PeriodicElement2 {
  id: string;
  customer: string;
  order_at: string;
  order_type: string;
  location: string;
  total: string;
  discount: string;
}

const ELEMENT_DATA2: PeriodicElement2[] = [
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
];

export interface PeriodicElement3 {
  id: string;
  customer: string;
  order_at: string;
  order_type: string;
  location: string;
  total: string;
  discount: string;
}

const ELEMENT_DATA3: PeriodicElement3[] = [
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
  },
];

export interface PeriodicElement4 {
  id: string;
  customer: string;
  order_at: string;
  order_type: string;
  location: string;
  total: string;
  discount: string;
  status: string;
}

const ELEMENT_DATA4: PeriodicElement4[] = [
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
    status: "Lorem",
  },
  {
    id: "lorem",
    customer: "Lorem",
    order_at: "Lorem",
    order_type: "lorem",
    location: "Lorem",
    total: "Lorem",
    discount: "Lorem",
    status: "Lorem",
  },
];

@Component({
  selector: "app-order-mgmt",
  templateUrl: "./order-mgmt.component.html",
  styleUrls: ["./order-mgmt.component.css"],
})
export class OrderMgmtComponent {
  displayedColumns1: string[] = [
    "id",
    "customer",
    "order_at",
    // "order_type",
    "order_details",
    "location",
    "total",
    "discount",
    "action",
  ];

  displayedColumns2: string[] = [
    "id",
    "customer",
    "order_at",
    // "order_type",
    "order_details",
    "location",
    "total",
    "discount",
    "action",
  ];

  displayedColumns3: string[] = [
    "id",
    "customer",
    "order_at",
    // "order_type",
    "order_details",
    "location",
    "total",
    "discount",
    "action",
  ];

  displayedColumns4: string[] = [
    "id",
    "customer",
    "order_at",
    // "order_type",
    "order_details",
    "location",
    "total",
    "discount",
    "ratings",
    "status",
  ];

  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);
  dataSource4 = new MatTableDataSource<PeriodicElement4>(ELEMENT_DATA4);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;
  @ViewChild("MatPaginator2") MatPaginator2!: MatPaginator;
  @ViewChild("MatPaginator4") MatPaginator4!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
    this.dataSource2.paginator = this.MatPaginator2;
    this.dataSource4.paginator = this.MatPaginator4;
  }
  restroId: any;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private toastr: ToastrService
  ) {
    const localData = sessionStorage.getItem("curve-restaurants") || "";
    const restroData = JSON.parse(localData);
    this.restroId = restroData._id;
  }

  detailDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any, type?:number
  ): void {
    this.dialog.open(DetailDialogComponent, {
      width: "850px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data:{ element:element,type:type}
    });
  }

  ratingViewDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    elementId:any
  ): void {
    this.dialog.open(RatingDialogComponent, {
      width: "850px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration,
      data: {_id:elementId}
    });
  }
  ngOnChanges(){
    this.getRestroData({});

  }
  ngOnInit() {
    this.getRestroData({});
  }
  totalLength1: any;
  totalLength2: any;
  // totalLength3: any;
  totalLength4: any;
  onStatusChange(event: any, id: string) {
    const selectedValue = event.target.value;

    if (selectedValue == "2") {
      this.changeStatus(id, 2);
    } else if (selectedValue == "4") {
      this.changeStatus(id, 4);
    } else if (selectedValue == "5") {
      this.changeStatus(id, 5);
    } else if (selectedValue == "3") {
      this.changeStatus(id, 3);
    }
  }
  changeStatus(id: any, status: number) {
    const data = {
      status: status,
    };
    this.api.patch1("order/updateStatus/" + id, data).subscribe({
      next: (res: any) => {
        if(status ==4){
          this.toastr.success("Order Delivered SuccessFully");
        } else if(status ==3){
          this.toastr.success("Order is On The Way");
        }
        this.getRestroData({});
      },
      error: (res: any) => {
        this.toastr.error("Error changing status");
        this.getRestroData({});
      },
    });
  }
acceptReject(id: any, status: number){
  const data = {
    status: status,
  };
  this.api.patch1("order/updateStatus/" + id, data).subscribe({
    next: (res: any) => {
      this.getRestroData({});
      if(status ==2){
        this.toastr.success("Order Accept SuccessFully");
        this.getRestroData({});
      }else if(status ==5){
        this.toastr.error("Order Reject SuccessFully");
        this.getRestroData({});
      }
    },
    error: (res: any) => {
      this.toastr.error("Error changing status");
      this.getRestroData({});
    },
  });
}
  restroType: number = 1;
  page: number = 1;
  limit: number = 5;
  search: string = "";
  currentTabIndex: number = 0;
  searchHome: string = "";
  searchService: string = "";
  selectedfilter: string = "";
  tab: string = "new";
  reset(){
    this.fromDate = ''
    this.toDate = ''
    this.searchHome = ''
    this.selectedfilter = ''
    this.searchQuery = '';
    this.dateForm.reset();
    // this.getRestroData({});
  
  }
  onPageChange1(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }
  onPageChange2(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }
  onPageChange3(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }
  onPageChange4(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }
  searchQuery: string = '';  
  onTabChange(event: any) {
    this.reset()
    this.currentTabIndex = event.index;
    this.tab = event.tab.textLabel;
    if(this.tab === 'New Order'){
      this.tab = 'new'
    } else if(this.tab === 'On-Going Order'){
       this.tab = 'ongoing'
    } else if(this.tab === 'Past Order'){
      this.tab = 'past'
   }

    this.getRestroData(event);
  }
  onSearch1(event: any) {
    this.searchHome = event.target.value;
    this.getRestroData({});
  }
  onSearch2(event: any) {
    this.searchHome = event.target.value;
    this.getRestroData({});
  }
  onSearch3(event: any) {
    this.searchHome = event.target.value;
    this.getRestroData({});
  }
  onSearch4(event: any) {
    this.searchHome = event.target.value;
    this.getRestroData({});
  }
  serviceFilter(selectedValue: any) {
    this.selectedfilter = selectedValue;
    this.getRestroData({});
  }
  dateForm: any = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });
  fromDate: any = "";
  toDate: any = "";
  restaurantData: any;
  onDateFilter() {
    const fromDateValue = new Date(this.dateForm.value.fromDate).getTime();
    const toDateValue = new Date(this.dateForm.value.toDate).getTime();
  
    if (toDateValue < fromDateValue) {
      console.error('To date cannot be less than From date.');
      this.toastr.error('To date cannot be earlier than From date.');
      return;  
    }
    this.toDate = String(Math.floor(toDateValue + 24 * 60 * 60 * 800));
    this.fromDate = String(Math.floor(fromDateValue + 24 * 60 * 60 * 800));
  
    this.getRestroData({});
  }
  getRestroData(event: any) {
    if (!event?.pageChange) {
      this.page = 1;
      this.limit = 5;
    }
    if (event?.index == 0) {
      this.restroType = 1;
    }
    if (event?.index == 1) {
      this.restroType = 2;
    }
    let searchQuery = this.searchHome;
    const filter =
      this.currentTabIndex === 0 ? this.selectedfilter : this.selectedfilter;
    this.api
      .get1(
        `order/list?deliveryOption=${filter}&startDate=${this.fromDate}&endDate=${this.toDate}&search=${searchQuery}&limit=${this.limit}&page=${this.page}&orderType=${this.tab}`
      )
      .subscribe({
        next: (res: any) => {
          this.restaurantData = res.data
      
          setTimeout(() => {
            if(this.tab== 'new'){
              this.dataSource1 = res.data["orders"];
            }else if(this.tab == 'ongoing'){
              this.dataSource2 = res.data["orders"];
            }
            else if(this.tab == 'past'){
              this.dataSource4 = res.data["orders"];
            }
            this.MatPaginator1.length = res.data["orders"];
            this.MatPaginator2.length = res.data["orders"];
            this.MatPaginator4.length = res.data["orders"];
            this.totalLength1 = res.data.totalOrdersCount
            this.totalLength2 = res.data.totalOrdersCount
            this.totalLength4 = res.data.totalOrdersCount
            this.MatPaginator1.pageIndex = this.page - 1;
            this.MatPaginator2.pageIndex = this.page - 1;
            this.MatPaginator4.pageIndex = this.page - 1;
          });
          console.log(res);
        },
        error: (res: any) => {
          console.log(res.message);
          this.toastr.error("Error fetching details");
        },
      });
  }
  getStatus(statusCode: number): string {
    let status: string;

    switch (statusCode) {
      case 4:
        status = "Delivered";
        break;
      case 5:
        status = "Rejected";
        break;

      default:
        status = "N/A";
    }

    return status;
  }
}
