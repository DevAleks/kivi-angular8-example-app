import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';

import { QuestionFormComponent } from './question-form.component';
import { ClickForm } from '../../classes/click-class'

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ QuestionFormComponent ],
      providers: [ FormsService ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
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

  it('should have typeOfForm == 5 after observableclicks$.subscribe() call', async((done: DoneFn) => {
    const openClick: ClickForm = {typeOfForm: 5, typeOfAct: 'Рафтинг'};
    forms.openForm(openClick); 
    forms.observableclicks$.subscribe((data) => {
      expect(data.typeOfForm).toBe(5);
      done();                      
    });     
  }));

  it('should amended some variables after closeForm() calling', () => {
    component.closeForm();
    expect(component.isModalSwitcher).toBe(false); 
    expect(component.switcher).toBe(false); 
    expect(component.errServ).toBe(false);  
    expect(component.formValidError).toBe(true); 
    expect(component.receivedFormQuestion.status).toBe(false); 
    expect(component.isValidSwitcher).toBe(false);     
  });

  it('should post and recived form data success from FormsService', () => {
    const expectForm:FormBottom = {
      typeOfAct: 'Задать вопрос', 
      phone: 'Телефон: +7(933) 888-99-00',
      email: 'Email: test@mail.com',
      text: 'Text: Текст Текст Текст',
      typeOfForm: 5,
      status: false
    };
    const spyObj = jasmine.createSpyObj('FormsService', {postForm: expectForm});
    component.receivedFormQuestion = spyObj.postForm();
    expect(component.receivedFormQuestion).toEqual(expectForm); 
  });

});
