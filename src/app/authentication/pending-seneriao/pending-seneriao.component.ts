import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-seneriao',
  templateUrl: './pending-seneriao.component.html',
  styleUrls: ['./pending-seneriao.component.css']
})
export class PendingSeneriaoComponent implements OnInit, OnDestroy {
  private previousUrl: string | null = null;
  private subscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to router events
    this.subscription = this.router.events.pipe(
      filter((event): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      console.log('event', event)
      if (event.url === '/bank-detail') {
        // If navigating back from '/pending', redirect to '/login'
        this.router.navigate(['/login']);
      }
    });

    // Update the previous URL on NavigationEnd
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = event.urlAfterRedirects;
    });
  }

  ngOnDestroy() {
    // Clean up the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
