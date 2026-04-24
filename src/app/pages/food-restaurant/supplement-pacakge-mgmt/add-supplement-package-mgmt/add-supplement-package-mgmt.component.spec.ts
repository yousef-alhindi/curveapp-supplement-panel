import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplementPackageMgmtComponent } from './add-supplement-package-mgmt.component';

describe('AddSupplementPackageMgmtComponent', () => {
  let component: AddSupplementPackageMgmtComponent;
  let fixture: ComponentFixture<AddSupplementPackageMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplementPackageMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplementPackageMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
