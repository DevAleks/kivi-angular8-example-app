import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';

import { TopFormComponent } from './top-form.component';
import { ClickForm } from '../../classes/click-class'

describe('TopFormComponent', () => {
  let component: TopFormComponent;
  let fixture: ComponentFixture<TopFormComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ TopFormComponent ],
      providers: [ FormsService ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFormComponent);
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

  it('should have typeOfForm == 3 after observableclicks$.subscribe() call', async((done: DoneFn) => {
    const openClick: ClickForm = {typeOfForm: 3, typeOfAct: 'Рафтинг'};
    forms.openForm(openClick); 
    forms.observableclicks$.subscribe((data) => {
      expect(data.typeOfForm).toBe(3);
      done();                      
    });     
  }));  

  it('should amended some variables after closeForm() calling', () => {
    component.closeForm();
    expect(component.isModalSwitcher).toBe(false); 
    expect(component.switcher).toBe(false); 
    expect(component.errServ).toBe(false);  
    expect(component.formValidError).toBe(true); 
    expect(component.receivedFormTop.status).toBe(false); 
    expect(component.isValidSwitcher).toBe(false);     
  });

  it('should post and recived form data success from FormsService', () => {
    const expectForm:FormBottom = {
      typeOfAct: 'Тип активности: Аренда байдарок', 
      name: 'Имя: Алекс', 
      phone: 'Телефон: +7(933) 888-99-00',
      email: 'Email: test@mail.com',
      promo: 'Promo: Promo 123',
      typeOfForm: 3,
      status: false
    };
    const spyObj = jasmine.createSpyObj('FormsService', {postForm: expectForm});
    component.receivedFormTop = spyObj.postForm();
    expect(component.receivedFormTop).toEqual(expectForm); 
  });

});
