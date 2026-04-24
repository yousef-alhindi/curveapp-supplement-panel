import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/service/api.service";
import * as moment from 'moment';
import { WebStorageService } from "src/app/service/web-storage.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  public lat: any;
  public lng: any;
  location: any;
  latitude: any;
  longitude: any;
  selectedfilter: string = "";
  currentTabIndex: number = 0;
  workingDays: any;
  locationData:any
  constructor(private api: ApiService, private toastr:ToastrService,    private session: WebStorageService,
  ) {}

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            if (position) {
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;
              let returnValue = {
                lat: this.lat,
                lng: this.lng,
              };
              resolve(returnValue);
            }
          },
          (error: any) => reject(error)
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        reject("Geolocation is not supported by this browser.");
      }
    });
  }
  resturantDetails:any
  ngOnInit() {
    this.resturantDetails = JSON.parse(
      this.session.getSessionStorage("curve-restaurants") || ""
    );
    this.getBusStat({});
    this.getBusStat2();
  
  }
  minEndDate: Date | null = null;
  onFromDateChange(event: any): void {
    this.minEndDate = event.value; // Sets minimum selectable end date
  }

  onDateFilter() {
    const fromDateValue = new Date(this.dateForm.value.fromDate).getTime();
    const toDateValue = new Date(this.dateForm.value.toDate).getTime();
  
    if (toDateValue < fromDateValue) {
      console.error('To date cannot be less than From date.');
      this.toastr.error('To date cannot be earlier than From date.');
      return;  
    }

      // Set start date to 12:00 AM
  const fromDateTime = new Date(fromDateValue).setHours(0, 0, 0, 0);

  // Set end date to 11:59 PM
  const toDateTime = new Date(toDateValue).setHours(23, 59, 59, 999);

    this.toDate = toDateTime
    this.fromDate = fromDateTime
  
    this.getBusStat({});
  }
  

  serviceFilter(selectedValue: any) {
    this.selectedfilter = selectedValue;
    this.getBusStat({});
  }
  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
  dateForm: any = new FormGroup({
    fromDate: new FormControl(""),
    toDate: new FormControl(""),
  });
  fromDate: any = "";
  toDate: any = "";
  dashboardData: any;
  getBusStat(event: any) {
  let selectedFromDate = this.dateForm.value.fromDate;
  let selectedToDate = this.dateForm.value.toDate;

  // this.fromDate = moment(selectedFromDate).startOf('day').valueOf();
  // this.toDate = moment(selectedToDate).endOf('day').valueOf();
    const filter =
      this.currentTabIndex === 0 ? this.selectedfilter : this.selectedfilter;

    this.api
      .get1(
        `/dashboard/businuessStat?timeZone=${filter}&from=${this.fromDate}&to=${this.toDate}`
      )
      .subscribe({
        next: (res: any) => {
          this.dashboardData = res.data;
        },
        error: (err: any) => {
          // console.log("Error fetching data");
        },
      });
  }
  dashboardData2: any;
  weekdaysRange: any;
  cusineName:any
  getLocation1(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error: GeolocationPositionError) => reject(error)
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        reject("Geolocation is not supported by this browser.");
      }
    });
  }
  getBusStat2() {
    this.api.get1(`dashboard/dashBoardData`).subscribe({
      next: (res: any) => {
        this.dashboardData2 = res.data;
     
        this.initializeLocation(res);
        this.workingDays = res.data.restaurant.documents["workingDays"];
        this.cusineName = res.data.restaurant['resCategory']
        this.locationData = res.data.restaurant.location['coordinates']
        this.lat = this.locationData[0]
        this.lng = this.locationData[1]
    //        this.getLocation().then((data: any) => {
    //    this.lat = data.lat;
    //    this.lng = data.lng;
    // });
        if (this.workingDays.length == 7) {
          
          this.weekdaysRange = `Mon to Sun`;
        } else if(this.workingDays.length < 7){
          this.weekdaysRange = this.workingDays.map((day: string) => day.slice(0, 3)).join(', ');
        }
      },
      error: (err: any) => {
        // console.log("Error fetching data");
      },
    });
  }
  lattt:any
  longgg:any
  async initializeLocation(res: any) {
    if (this.resturantDetails.location['coordinates']) {
      this.locationData = this.resturantDetails.location['coordinates'];
      this.lat = this.locationData[1]; // Latitude should be at index 1
      this.lng = this.locationData[0]; // Longitude should be at index 0
      // console.log('lat',this.lat)
      // console.log('long',this.lng)
    this.lattt=this.lat
    this.longgg=this.lng
    } else {
      // If no location data in API, get current location
      try {
        const currentLocation = await this.getLocation1();
        this.lat = currentLocation.lat;
        this.lng = currentLocation.lng;
      } catch (error) {
        console.error("Failed to retrieve location:", error);
      }
    }
  }
  selectedfilter1: boolean = true;
  selectedfilter2: boolean = true;
  selectedfilter3: boolean = true;
  serviceFilter1(selectedValue: any) {
    this.selectedfilter1 = selectedValue;
    this.getDeliveryStatus({});
  }
  serviceFilter2(selectedValue: any) {
    this.selectedfilter2 = selectedValue;
    this.getDeliveryStatus({});
  }
  serviceFilter3(selectedValue: any) {
    this.selectedfilter3 = selectedValue;
    this.getDeliveryStatus({});
  }

  reset(){
    this.fromDate = ''
    this.toDate = ''
    this.selectedfilter = ''
    this.dateForm.reset();
    this.getDeliveryStatus({});
    this.getBusStat({});
    this.getBusStat2();
  }
  getDeliveryStatus(event: any) {
    const filter1 = this.selectedfilter1; // Delivery
  const filter2 = this.selectedfilter2; // Take Away
  const filter3 = this.selectedfilter3;

    this.api
      .get1(
        `dashboard/deliveryOptionsUpdate?isDelivery=${filter1}&isPickUp=${filter2}&active=${filter3}`
      )
      .subscribe({
        next: (res: any) => {
          // this.toastr.success('Data update successfully')
          // this.deliveryData = res.data;
        },
        error: (err: any) => {
          console.log("Error fetching data");
        },
      });
  }
}
