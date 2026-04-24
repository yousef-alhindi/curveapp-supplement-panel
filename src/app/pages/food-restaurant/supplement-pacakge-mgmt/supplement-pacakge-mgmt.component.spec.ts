import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementPacakgeMgmtComponent } from './supplement-pacakge-mgmt.component';

describe('SupplementPacakgeMgmtComponent', () => {
  let component: SupplementPacakgeMgmtComponent;
  let fixture: ComponentFixture<SupplementPacakgeMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementPacakgeMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplementPacakgeMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
