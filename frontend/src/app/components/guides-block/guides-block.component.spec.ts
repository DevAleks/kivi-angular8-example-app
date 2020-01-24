import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesBlockComponent } from './guides-block.component';

describe('GuidesBlockComponent', () => {
  let component: GuidesBlockComponent;
  let fixture: ComponentFixture<GuidesBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidesBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
