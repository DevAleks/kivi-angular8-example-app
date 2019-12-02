import { browser, logging, by, element, protractor } from 'protractor';

describe('Kivi-app, using topForm', () => {

  function openForm() {
    element(by.id('bt2-topForm')).click();
  }

  function sendOrder() {
    element(by.id('send-ord')).click();
  }  

  function browserWait(param: string) {
    browser.wait(function() {
      return element(by.id(param)).isPresent();
    }, 10000);
  }  

  beforeEach(() => {
    // Задержка для полной загрузки всех элементов страниц
    browser.get('http://localhost:4200/', 1000);
  });

  it('Usecase 1 (open & close): Opening topForm after click to button Заказать in top menu', () => {    
    openForm();
    expect(element(by.css('.modal-form-header')).getText()).toContain('Заказ услуги');
  });

  it('Usecase 1 (open & close): Closing topForm after click cross icon in right top coner', () => {    
    openForm();
    element(by.css('.close')).click();    
    expect(element(by.id('modal-form-bg')).getAttribute('style')).toContain('none');
  });

  it('Usecase 1 (open & close): Closing topForm after press escape button', () => {    
    openForm();
    element(by.tagName('body')).sendKeys(protractor.Key.ESCAPE);
    expect(element(by.id('modal-form-bg')).getAttribute('style')).toContain('none');
  });  

  it('Usecase 2 (trying to send wrong data): in the topForm with novalid data after clicking to send button should see the "typeofact" input error', () => {    
    openForm();
    sendOrder();
    expect(element(by.id('sel-er')).getText()).toContain('Для отправки заказа необходимо выбрать услугу');
  });

  it('Usecase 2 (trying to send wrong data): in the topForm with novalid data after clicking to send button should see the "userName" input error', () => {    
    openForm();
    element(by.id('userNameT')).sendKeys('А');
    sendOrder();
    expect(element(by.id('userNameT-min')).getText()).toContain('- Должно быть от 2 до 30 символов');
  }); 

  it('Usecase 3 (send valid data to broken server): should have error server data sending message', () => {    
    openForm();
    element(by.tagName("select#serviceTopForm")).element(by.css("#serviceTopForm [value='Рафтинг']")).click();
    element(by.id('userNameT')).sendKeys('Аlex');
    element(by.id('userPhoneT')).sendKeys('+7(904) 345 34-58');
    sendOrder();
    browserWait('reciveErrorT');
    expect(element(by.id('reciveErrorT')).getText()).toContain('Ошибка отправки данных. Повторите заказ позднее.');
  });  


  it('Usecase 3 (send valid data to working server): should have success message', () => {    
    openForm();
    element(by.tagName("select#serviceTopForm")).element(by.css("#serviceTopForm [value='Рафтинг']")).click();
    element(by.id('userNameT')).sendKeys('Аlex');
    element(by.id('userPhoneT')).sendKeys('+7(904) 345 34-58');
    sendOrder();
    browserWait('successT');
    expect(element(by.id('successT')).getText()).toContain('Заказ успешно отправлен!');
  }); 

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
