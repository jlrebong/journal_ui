import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcashComponent } from './addcash.component';

describe('AddcashComponent', () => {
  let component: AddcashComponent;
  let fixture: ComponentFixture<AddcashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcashComponent]
    });
    fixture = TestBed.createComponent(AddcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
