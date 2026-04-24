import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSeneriaoComponent } from './pending-seneriao.component';

describe('PendingSeneriaoComponent', () => {
  let component: PendingSeneriaoComponent;
  let fixture: ComponentFixture<PendingSeneriaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingSeneriaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingSeneriaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
