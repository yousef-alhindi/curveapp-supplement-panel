import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";

export interface PeriodicElement1 {
  s_no: number;
  paid:string;
  date_from:string;
  amount: string;
  date_to: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    s_no: 1,
    paid: "Lorem Ipsum",
    date_from: "Lorem Ipsum",
    amount: "Lorem",
    date_to: "Lorem",


  },





 
];
@Component({
  selector: 'app-view-payout-history',
  templateUrl: './view-payout-history.component.html',
  styleUrls: ['./view-payout-history.component.css']
})
export class ViewPayoutHistoryComponent {
  displayedColumns1: string[] = [
    "s_no",
    "paid",
    "date_from",
    "date_to",
    "amount",


  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }

  constructor(private api:ApiService,private toastr:ToastrService){}
  restroType: number = 1;
  page: number = 1;
  limit: number = 5;
  totalLength:any
  search: string = "";
  currentTabIndex: number = 0;
  searchHome: string = "";
  searchService: string = "";
  selectedfilter: string = ""
  restaurantData: any;

  ngOnInit(){
    this.getRestroData({})
  }

  dateForm: any = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });
  fromDate: any = "";
  toDate: any = "";
  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getRestroData({
      pageChange: true,
    });
  }
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
    let searchQuery =
      this.currentTabIndex === 0 ? this.searchHome : this.searchService;
    const filter =
      this.currentTabIndex === 0 ? this.selectedfilter : this.selectedfilter;
    this.api
      .get1(
        `payment/getPayoutHistory?from=${this.fromDate}&to=${this.toDate}`
      )
      .subscribe({
        next: (res: any) => {
          this.restaurantData = res.data['paidByAdmin']
          this.dataSource1 = res.data['paidByAdmin']
          setTimeout(() => {
            this.MatPaginator1.length = res.data?.totalTimesPaidByAdmin;
            this.totalLength = res.data.totalTimesPaidByAdmin;
  
            this.MatPaginator1.pageIndex = this.page - 1;
          });
          console.log(res);
        },
        error: (res: any) => {
          console.log(res.message);
          // this.toastr.error("Error fetching details");
        },
      });
  }
}
