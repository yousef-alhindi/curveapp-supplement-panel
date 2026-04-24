import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-food-restaurant',
  templateUrl: './food-restaurant.component.html',
  styleUrls: ['./food-restaurant.component.css']
})
export class FoodRestaurantComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  data: any;
  activatedModuleName: string = 'Dashboard';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location

  ) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActivatedModuleName();
    });

    this.updateActivatedModuleName();

  }

  bindChildToParentVal(val: any) {
    this.activatedModuleName = val;

  }

  private updateActivatedModuleName() {
    const url = this.router.url;
    const decodedUrl = decodeURIComponent(url);
    if (decodedUrl === '/food/menu-mgmt') {
      this.activatedModuleName = 'Menu Management';
    } else if (decodedUrl === '/food/wallet-mgmt') {
      this.activatedModuleName = 'My Wallet';
    } else if (decodedUrl.includes('/food/menu-mgmt/category-name/')) {
      const segments = decodedUrl.split('/');
      const categoryName = segments[segments.length - 2];
      this.activatedModuleName = categoryName || 'Category Name';
    } else if (decodedUrl.includes('/food/menu-mgmt/item-name/')) {
      const segments = decodedUrl.split('/');
      const itemName = segments[segments.length - 2];
      this.activatedModuleName = itemName || 'Item Name';
    }
    else if (decodedUrl.includes('offer-mgmt')) {
      this.activatedModuleName = 'Offer Management';
    }

    else if (decodedUrl.includes('wallet-mgmt')) {
      this.activatedModuleName = 'My Wallet';
    }

    else if (decodedUrl.includes('supplement-pacakge-mgmt')) {
      this.activatedModuleName = 'Supplement Package Management';
    }
    else if (decodedUrl.includes('join-as-sponsor')) {
      this.activatedModuleName = 'Join As Sponsor';
    }
    else if (decodedUrl.includes('supplement-mgmt')) {
      this.activatedModuleName = 'Supplement Management';
    }
    // else if (decodedUrl.includes('support')) {
    //   this.activatedModuleName = 'Support Tickets';
    // }
    else if (decodedUrl.includes('support-ticket')) {
      this.activatedModuleName = 'Support Ticket';
    }
    else if (decodedUrl.includes('terms-condition')) {
      this.activatedModuleName = 'Terms & Conditions';
    }
    else if (decodedUrl.includes('privacy-policy')) {
      this.activatedModuleName = 'Privacy Policy';
    }
    else if (decodedUrl.includes('about-us')) {
      this.activatedModuleName = 'About Us';
    }
    else if (decodedUrl.includes('contact-us')) {
      this.activatedModuleName = "Contact Us"
    }
    else if (decodedUrl.includes('faq')) {
      this.activatedModuleName = 'FAQs';
    }
    else if (decodedUrl.includes('order-mgmt')) {
      this.activatedModuleName = 'Order Management';
    }
    else if (decodedUrl.includes('payment-mgmt')) {
      this.activatedModuleName = 'Payment Management';
    }
    else if (decodedUrl.includes('ratings')) {
      this.activatedModuleName = 'Ratings';
    }
    else if (decodedUrl.includes('my-profile')) {
      this.activatedModuleName = 'My Profile';
      
    }

    else {
      this.activatedModuleName = 'Dashboard ';
    }
  }

  goBack(): void {
    this.location.back();
  }


}
