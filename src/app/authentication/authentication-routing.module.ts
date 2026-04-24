import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { CreateBusinessProfileComponent } from './create-business-profile/create-business-profile.component';
import { AddRestaurantLocationComponent } from './add-restaurant-location/add-restaurant-location.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { ProfileCreatedRejectedComponent } from './profile-created-rejected/profile-created-rejected.component';
import { PendingSeneriaoComponent } from './pending-seneriao/pending-seneriao.component';
import { ClearSessionGuard } from '../service/clear-session.guard';
import { AuthGuard } from '../service/auth.guard';


const routes: Routes = [
  {path:'' , redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent,  canActivate: [ClearSessionGuard]},
  {path:'otp', component:OtpComponent  , canActivate: [AuthGuard]},
  {path:'create-business-profile', component:CreateBusinessProfileComponent , canActivate: [AuthGuard]},
  {path:'add-restaurant-location', component:AddRestaurantLocationComponent , canActivate: [AuthGuard]},
  {path:'upload-documents', component:UploadDocumentsComponent , canActivate: [AuthGuard]},
  {path:'bank-detail', component:BankDetailComponent },
  {path:'profile-created-rejected', component:ProfileCreatedRejectedComponent , canActivate: [AuthGuard]},
  {path:'pending',component:PendingSeneriaoComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
