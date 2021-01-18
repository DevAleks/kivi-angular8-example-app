import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';

import { FooterFormComponent } from './footer-form.component';

describe('FooterFormComponent', () => {
  let component: FooterFormComponent;
  let fixture: ComponentFixture<FooterFormComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ FooterFormComponent ],
      providers: [ FormsService ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called observableclicks$.subscribe()', async(() => {
    spy = spyOn(forms.observableclicks$, 'subscribe');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spy).toBeTruthy(); 
    });
  }));

  it('should amended some variables after closeForm() calling', () => {
    component.closeForm();
    expect(component.isModalSwitcher).toBe(false); 
    expect(component.isSuccesAnswer).toBe(false); 
    expect(component.isErrServ).toBe(false);  
    expect(component.isFormValidError).toBe(true); 
    expect(component.receivedFormFooter.status).toBe(false); 
    expect(component.isValidSwitcher).toBe(false);     
  });

  it('should post and recived form data success from FormsService', () => {
    const expectForm:FormBottom = {
      typeOfAct: 'Тип активности: Заказать звонок', 
      name: 'Имя: Алекс', 
      phone: 'Телефон: +7(933) 888-99-00',
      email: 'Email: test@mail.com',
      typeOfForm: 1,
      status: false
    };
    const spyObj = jasmine.createSpyObj('FormsService', {postForm: expectForm});
    component.receivedFormFooter = spyObj.postForm();
    expect(component.receivedFormFooter).toEqual(expectForm); 
  });

});
