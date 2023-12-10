import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeentryComponent } from './tradeentry.component';

describe('TradeentryComponent', () => {
  let component: TradeentryComponent;
  let fixture: ComponentFixture<TradeentryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradeentryComponent]
    });
    fixture = TestBed.createComponent(TradeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
