import {
  Component,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
} from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-location-dialog",
  templateUrl: "./location-dialog.component.html",
  styleUrls: ["./location-dialog.component.css"],
})
export class LocationDialogComponent {
  @Output() dataEvent = new EventEmitter<any>();
  @ViewChild("search") public searchElementRef: any;
  public lat: any;
  public lng: any;
  location: any;
  latitude: any;
  longitude: any;
  zoom: any;
  private geoCoder!: google.maps.Geocoder;
  postal: any;
  address: any;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load the Maps API
    this.mapsAPILoader.load().then(() => {
      // Initialize the geocoder
      this.geoCoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location?.lat();
          this.longitude = place.geometry.location?.lng();
          this.getAddresss(this.latitude, this.longitude);

          this.zoom = 12;
        });
      });
      // Get current location and set it
      this.getLocation().then((data: any) => {
        this.lat = data.lat;
        this.lng = data.lng;
        this.setCurrentLocation();
      });
    });
  }

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

  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddresss(this.latitude, this.longitude);
      });
    }
  }

  getAddresss(latitude: any, longitude: any) {
    const latlng = { lat: latitude, lng: longitude };

    this.geoCoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === "OK") {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;

          let zipCode: string | undefined;

          for (const component of results[0].address_components) {
            if (component.types.includes("postal_code")) {
              zipCode = component.long_name;
              break;
            }
          }

          this.zipCode = zipCode ? zipCode : "";
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddresss(this.latitude, this.longitude);
  }
  zipCode: string = "";
  sendDataToParent() {
    this.dataEvent.emit({
      address: this.address,
      lat: this.latitude,
      lng: this.longitude,
      zipCode: this.zipCode,
    });
  }
}
