import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderPageComponent } from './edit-order-page.component';

describe('EditOrderPageComponent', () => {
  let component: EditOrderPageComponent;
  let fixture: ComponentFixture<EditOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
