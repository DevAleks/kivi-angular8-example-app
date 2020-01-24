import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourIconsBlockComponent } from './four-icons-block.component';

describe('FourIconsBlockComponent', () => {
  let component: FourIconsBlockComponent;
  let fixture: ComponentFixture<FourIconsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourIconsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourIconsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
