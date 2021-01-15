import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';

import { FirstFormComponent } from './first-form.component';
import { ClickForm } from '../../classes/click-class'

describe('FirstFormComponent', () => {
  let component: FirstFormComponent;
  let fixture: ComponentFixture<FirstFormComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ FirstFormComponent ],
      providers: [ FormsService ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstFormComponent);
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

  it('should have typeOfForm == 2 after observableclicks$.subscribe() call', async((done: DoneFn) => {
    const openClick: ClickForm = {typeOfForm: 2, typeOfAct: 'Рафтинг'};
    forms.openForm(openClick); 
    forms.observableclicks$.subscribe((data) => {
      expect(data.typeOfForm).toBe(2);
      done();                      
    });     
  }));

  it('should amended some variables after closeForm() calling', () => {
    component.closeForm();
    expect(component.isModalSwitcher).toBe(false); 
    expect(component.isSuccesAnswer).toBe(false); 
    expect(component.isErrServ).toBe(false);  
    expect(component.isFormValidError).toBe(true); 
    expect(component.receivedFormFirst.status).toBe(false); 
    expect(component.isValidSwitcher).toBe(false);     
  });

  it('should post and recived form data success from FormsService', () => {
    const expectForm: FormBottom = {
      typeOfAct: 'Тип активности: Рафтинг', 
      name: 'Имя: Алекс', 
      phone: 'Телефон: +7(933) 888-99-00',
      email: 'Email: test@mail.com',
      promo: 'Promo: Promo 123',
      typeOfForm: 2,
      status: false
    };
    const spyObj = jasmine.createSpyObj('FormsService', {postForm: expectForm});
    component.receivedFormFirst = spyObj.postForm();
    expect(component.receivedFormFirst).toEqual(expectForm); 
  });

});
