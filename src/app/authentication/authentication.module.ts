import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginComponent } from "./login/login.component";
import { OtpComponent } from "./otp/otp.component";
import { MaterialModule } from "../material/material.module";
import { NgOtpInputModule } from "ng-otp-input";
import { Ng2TelInputModule } from "ng2-tel-input";
import { NgxMatIntlTelInputComponent } from "ngx-mat-intl-tel-input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateBusinessProfileComponent } from "./create-business-profile/create-business-profile.component";
import { AddRestaurantLocationComponent } from "./add-restaurant-location/add-restaurant-location.component";
import { LocationDialogComponent } from "./add-restaurant-location/location-dialog/location-dialog.component";
import { AgmCoreModule } from "@agm/core";
import { UploadDocumentsComponent } from "./upload-documents/upload-documents.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { BankDetailComponent } from "./bank-detail/bank-detail.component";
import { ProfileCreatedRejectedComponent } from "./profile-created-rejected/profile-created-rejected.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "../service/auth-interceptor.service";
import { PendingSeneriaoComponent } from "./pending-seneriao/pending-seneriao.component";
@NgModule({
  declarations: [
    LoginComponent,
    OtpComponent,
    CreateBusinessProfileComponent,
    AddRestaurantLocationComponent,
    LocationDialogComponent,
    UploadDocumentsComponent,
    BankDetailComponent,
    ProfileCreatedRejectedComponent,
    PendingSeneriaoComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule,
    Ng2TelInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
    NgOtpInputModule,
    NgxMaterialTimepickerModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBkPugcJ44sXBxNLtpjhtcKMkMgwTLXe_g",
      libraries: ["places", "geometry"],
    }),
  ],
})
export class AuthenticationModule {}
