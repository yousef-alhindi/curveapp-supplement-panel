import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LogoutDialogComponent } from 'src/app/pages/food-restaurant/common-dialog/logout-dialog/logout-dialog.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  authenticate: any;

  sidebarModules: any[] = [
    {
    route: "/supplement/dashboard",
    name: 'Dashboard',
    icon: 'assets/images/dashboard.png'
  },
  // {
  //   route: "/supplement/menu-mgmt",
  //   name: 'Menu Management',
  //   icon: 'assets/images/package_management.png'
  // },
  {
    route: "/supplement/order-mgmt",
    name: 'Order Management',
    icon: 'assets/images/package_bookings.png'
  },  
  {
    route: "/supplement/wallet-mgmt",
    name: ' My Wallet ',
    icon: 'assets/images/payment_management.png'
  },
  {
    route: "/supplement/supplement-pacakge-mgmt",
    name: 'Supplement package  ',
    icon: 'assets/images/icons8-package-50.png'
  },

  {
    route: "/supplement/supplement-mgmt",
    name: 'Supplement Management ',
    icon: 'assets/images/package_management.png'
  },

  {
    route: "/supplement/offer-mgmt",
    name: 'Offer Management ',
    icon: 'assets/images/offer_management.png'
  },


  {
    route: "/supplement/join-as-sponsor",
    name: 'Join As Sponsor ',
    icon: 'assets/images/subscription.png'
  },

  {
    route: "/supplement/support-ticket",
    name: 'Support Ticket',
    icon: 'assets/images/support.png'
  },
  {
    route: "/supplement/payment-mgmt",
    name: 'Payment Management',
    icon: 'assets/images/payment_management.png'
  },
  {
    route: "/supplement/ratings",
    name: 'Ratings',
    icon: 'assets/images/ratings.png'
  },


  // {
  //   route: "/supplement/support",
  //   name: 'Support',
  //   icon: 'assets/images/support.png'
  // },

  {
    route: "/supplement/terms-condition",
    name: 'Terms & Conditions',
    icon: 'assets/images/terms_and_conditions.png'
  },

  {
    route: "/supplement/privacy-policy",
    name: 'Privacy Policy ',
    icon: 'assets/images/privacy_policy.png'
  },

  {
    route: "/supplement/about-us",
    name: 'About Us',
    icon: 'assets/images/about_us.png'
  },

  {
    route: "/supplement/faq",
    name: 'FAQs',
    icon: 'assets/images/faqs.png'
  },

  {
    route: "/supplement/contact-us",
    name: 'Contact Us',
    icon: 'assets/images/contact_us.png'
  },



  ]

  constructor(
    public dialog: MatDialog, private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  // @Output activeModule = 

  @Output() activeModule = new EventEmitter<string>();

  
  // reloadRoute(route: string): void {
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //     this.router.navigate([route]);
  //   });
  // }

  bindChildToParent(event: any, item: any) {
    this.activeModule.emit(event)
    // this.reloadRoute(item.route);
  }

  logoutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LogoutDialogComponent, {
      width: "400px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration
    })
  }

}
