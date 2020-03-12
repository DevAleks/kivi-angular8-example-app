import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SubscribeBlockComponent } from './subscribe-block.component';

describe('SubscribeBlockComponent', () => {
  let component: SubscribeBlockComponent;
  let fixture: ComponentFixture<SubscribeBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeBlockComponent ],      
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeBlockComponent);
    component = fixture.componentInstance; 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
