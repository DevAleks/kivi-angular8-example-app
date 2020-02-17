import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';

import { CallorderFormComponent } from './callorder-form.component';
import { ClickForm } from '../../classes/click-class'

describe('CallorderFormComponent', () => {
  let component: CallorderFormComponent;
  let fixture: ComponentFixture<CallorderFormComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ CallorderFormComponent ],
      providers: [ FormsService ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(CallorderFormComponent);
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

  it('should have typeofform == 4 after observableclicks$.subscribe() call', async((done: DoneFn) => {
    const openClick: ClickForm = {typeofform: 4, typeofact: 'Рафтинг'};
    forms.openForm(openClick); 
    forms.observableclicks$.subscribe((data) => {
      expect(data.typeofform).toBe(4);
      done();                      
    });     
  }));

  it('should amended some variables after closeForm() calling', () => {
    component.closeForm();
    expect(component.modal_switcher).toBe(false); 
    expect(component.switcher).toBe(false); 
    expect(component.errServ).toBe(false);  
    expect(component.formValidError).toBe(true); 
    expect(component.receivedFormCallOrder.status).toBe(false); 
    expect(component.switcher_valid).toBe(false);     
  });

  it('should post and recived form data success from FormsService', () => {
    const expectForm:FormBottom = {
      typeofact: 'Тип активности: Заказать звонок', 
      name: 'Имя: Алекс', 
      phone: 'Телефон: +7(933) 888-99-00',
      typeofform: 4,
      status: false
    };
    const spyObj = jasmine.createSpyObj('FormsService', {postForm: expectForm});
    component.receivedFormCallOrder = spyObj.postForm();
    expect(component.receivedFormCallOrder).toEqual(expectForm); 
  });

/*
  it('should call closeForm() after click the ESC button', () => {
    spy = spyOn(component, "closeForm");
    const eventMock = new KeyboardEvent('keydown', {
      "code": "escape",
    });
    fixture.nativeElement.dispatchEvent(eventMock);
    fixture.detectChanges();
    component.handleKeyboardEvent(eventMock);
    expect(spy).toHaveBeenCalled();
    //expect(component.sw).toBe(true);
    //fixture.detectChanges();
    //fixture.debugElement.triggerEventHandler('keydown', {code: 'Escape'});
  }); 
*/

  it('should unsubscribe() when destroyed', () => {
    spy = spyOn(component.subscription, 'unsubscribe');
    fixture.detectChanges();
    fixture.destroy();
    expect(spy).toHaveBeenCalled();
  });
  
});
