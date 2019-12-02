import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Для обработки конструкции script-hack в SubscribeBlockComponent:
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

import { SemeyniyRaftingComponent } from './semeyniy-rafting.component';
import { FormsService } from '../../services/forms.service';
import { ClickForm } from '../../classes/click-class'

describe('SemeyniyRaftingComponent', () => {
  let component: SemeyniyRaftingComponent;
  let fixture: ComponentFixture<SemeyniyRaftingComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;
  const openFormStub = {
    openForm: (openClickStub: ClickForm) => {}
  };  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemeyniyRaftingComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: FormsService, useValue: openFormStub } ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemeyniyRaftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called openForm', () => {
    spy = spyOn(forms, 'openForm');
    const openClick: ClickForm = {typeofform: 2, typeofact: 'Рафтинг'};
    forms.openForm(openClick);    
    expect(spy.calls.any()).toBeTruthy();
  });

});