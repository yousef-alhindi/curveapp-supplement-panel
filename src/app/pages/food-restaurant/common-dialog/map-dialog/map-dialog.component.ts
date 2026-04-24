import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, NgZone, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {
  @Output() dataEvent = new EventEmitter<any>();
  @ViewChild('search', { static: false }) searchElementRef!: ElementRef;
  public lat: any;
  public lng: any;
  location: any;
  latitude: any 
  longitude: any
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
  //   this.mapsAPILoader.load().then(() => {
  //     // Initialize the geocoder
  //     this.geoCoder = new google.maps.Geocoder();
  //     const autocomplete = new google.maps.places.Autocomplete(
  //       this.searchElementRef.nativeElement
  //     );
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         // get the place result
  //         const place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //         // verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }

  //         // set latitude, longitude and zoom
  //         this.latitude = place.geometry.location?.lat();
  //         this.longitude = place.geometry.location?.lng();
  //         this.getAddresss(this.latitude, this.longitude);

  //         this.zoom = 12;
  //       });
  //     });
  //     // Get current location and set it
  //     this.getLocation().then((data: any) => {
  //       this.lat = data.lat;
  //       this.lng = data.lng;
  //       this.setCurrentLocation();
  //     });
  //   });
  this.mapsAPILoader.load().then(() => {
    this.geoCoder = new google.maps.Geocoder();
  });
  }
  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
  
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place && place.geometry && place.geometry.location) {
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.getAddress(this.latitude, this.longitude);
  
            // Emit the location data to the parent
            this.sendDataToParent();
          } else {
            console.warn("No geometry found for place, or place is undefined.");
          }
        });
      });
    }).catch((error) => {
      console.error("Error loading Google Maps API", error);
    });
  }
  

  getAddress(latitude: number, longitude: number) {
    const latlng = { lat: latitude, lng: longitude };

    this.geoCoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        this.address = results[0].formatted_address;
      } else {
        console.error("Geocoder failed due to: " + status);
      }
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
    this.getAddress(this.latitude, this.longitude);
  
    // Emit the location data to the parent
    this.sendDataToParent();
  }
  
  zipCode: string = "";
  sendDataToParent() {
    this.dataEvent.emit({
      location: {
        type: 'Point',
        coordinates: [this.longitude, this.latitude]
      },
      address: this.address,
      zipCode: this.zipCode,
    });
  }
  
}
