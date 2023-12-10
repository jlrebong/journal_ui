import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedtradesComponent } from './closedtrades.component';

describe('ClosedtradesComponent', () => {
  let component: ClosedtradesComponent;
  let fixture: ComponentFixture<ClosedtradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedtradesComponent]
    });
    fixture = TestBed.createComponent(ClosedtradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
