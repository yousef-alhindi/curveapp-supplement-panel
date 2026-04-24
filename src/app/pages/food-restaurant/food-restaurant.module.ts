import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRestaurantRoutingModule } from './food-restaurant-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ColorPickerModule } from 'ngx-color-picker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PreviewDialogComponent } from './common-dialog/preview-dialog/preview-dialog.component';
import { MenuMgmtComponent } from './menu-mgmt/menu-mgmt.component';
import { CategoryNameComponent } from './menu-mgmt/category-name/category-name.component';
import { ItemNameComponent } from './menu-mgmt/item-name/item-name.component';
import { AddDialogComponent } from './common-dialog/add-dialog/add-dialog.component';
import { SupportComponent } from './support/support.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PaymentDialogComponent } from './common-dialog/payment-dialog/payment-dialog.component';
import { SuccessfullDialogComponent } from './common-dialog/successfull-dialog/successfull-dialog.component';
import { OfferMgmtComponent } from './offer-mgmt/offer-mgmt.component';
import { AddTicketComponent } from './support/add-ticket/add-ticket.component';
import { DescriptionDialogComponent } from './menu-mgmt/description-dialog/description-dialog.component';
import { CustomizeItemDetailsComponent } from './menu-mgmt/customize-item-details/customize-item-details.component';
import { LogoutDialogComponent } from './common-dialog/logout-dialog/logout-dialog.component';
import { WalletMgmtComponent } from './wallet-mgmt/wallet-mgmt.component';
import { PaymentMgmtComponent } from './payment-mgmt/payment-mgmt.component';
import { ViewPayoutHistoryComponent } from './payment-mgmt/view-payout-history/view-payout-history.component';
import { DeleteDialogComponent } from './common-dialog/delete-dialog/delete-dialog.component';
import { ViewDialogComponent } from './common-dialog/view-dialog/view-dialog.component';
import { JoinAsSponsorComponent } from './join-as-sponsor/join-as-sponsor.component';
import { OrderMgmtComponent } from './order-mgmt/order-mgmt.component';
import { DetailDialogComponent } from './common-dialog/detail-dialog/detail-dialog.component';
import { RatingsComponent } from './ratings/ratings.component';
import { RatingDialogComponent } from './common-dialog/rating-dialog/rating-dialog.component';
import { MapDialogComponent } from './common-dialog/map-dialog/map-dialog.component';
import { SupplementMgmtComponent } from './supplement-mgmt/supplement-mgmt.component';
import { AddEditSupplementComponent } from './supplement-mgmt/add-edit-supplement/add-edit-supplement.component';
import { WeightSizesComponent } from './supplement-mgmt/weight-sizes/weight-sizes.component';
import { DescriptionViewDialogComponent } from './supplement-mgmt/description-view-dialog/description-view-dialog.component';
import { ImageViewDialogComponent } from './supplement-mgmt/image-view-dialog/image-view-dialog.component';
import { DeliveryChargesComponent } from './supplement-mgmt/delivery-charges/delivery-charges.component';
import { SupplementPacakgeMgmtComponent } from './supplement-pacakge-mgmt/supplement-pacakge-mgmt.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { AddSupplementPackageMgmtComponent } from './supplement-pacakge-mgmt/add-supplement-package-mgmt/add-supplement-package-mgmt.component';
import { CreateSupportTicketComponent } from './support-ticket/create-support-ticket/create-support-ticket.component';
// import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProductDialogComponent } from './supplement-pacakge-mgmt/product-dialog/product-dialog.component';
import { ViewDescriptionDialogComponent } from './supplement-pacakge-mgmt/view-description-dialog/view-description-dialog.component';
import { ViewPackageProductComponent } from './supplement-pacakge-mgmt/view-package-product/view-package-product.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    PreviewDialogComponent,
    MenuMgmtComponent,
    CategoryNameComponent,
    ItemNameComponent,
    AddDialogComponent,
    SupportComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    AboutUsComponent,
    FaqComponent,
    SubscriptionComponent,
    PaymentDialogComponent,
    SuccessfullDialogComponent,
    OfferMgmtComponent,
    AddTicketComponent,
    DescriptionDialogComponent,
    CustomizeItemDetailsComponent,
    LogoutDialogComponent,
    WalletMgmtComponent,
    PaymentMgmtComponent,
    ViewPayoutHistoryComponent,
    DeleteDialogComponent,
    ViewDialogComponent,
    JoinAsSponsorComponent,
    OrderMgmtComponent,
    DetailDialogComponent,
    RatingsComponent,
    RatingDialogComponent,
    MapDialogComponent,
    SupplementMgmtComponent,
    AddEditSupplementComponent,
    WeightSizesComponent,
    DescriptionViewDialogComponent,
    ImageViewDialogComponent,
    DeliveryChargesComponent,
    SupplementPacakgeMgmtComponent,
    SupportTicketComponent,
    AddSupplementPackageMgmtComponent,
    CreateSupportTicketComponent,
    ProductDialogComponent,
    ViewDescriptionDialogComponent,
    ViewPackageProductComponent,
  ],
  imports: [
    CommonModule,
    FoodRestaurantRoutingModule,
    SharedModule,
    MaterialModule,
    ColorPickerModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBkPugcJ44sXBxNLtpjhtcKMkMgwTLXe_g',
        libraries: ['places']    
    }),
    NgMultiSelectDropDownModule.forRoot()
    // NgxUiLoaderModule,
    // NgxUiLoaderHttpModule.forRoot({
    //   showForeground:true
    // }),
    // NgxUiLoaderRouterModule
  ]
})
export class FoodRestaurantModule { }
