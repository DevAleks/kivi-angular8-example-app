import { browser, logging, by, element } from 'protractor';

describe('Kivi-app, elements tests', () => {

  function goleft() {
    element(by.id('slider2')).element(by.css('.owl-nav')).element(by.css('.owl-prev')).click();
  }

  beforeEach(() => {
    // Задержка для полной загрузки всех элементов страниц
    browser.get('http://localhost:4200/', 2000);
  });

  it('Should have a h1 tag', () => {    
    expect(element(by.tagName('h1')).getText()).toBe('База рафтинга и активного отдыха "Кивиниеми"');    
  });

  it('Should have an app-top-block tag', () => {    
    expect(element(by.tagName('app-top-block'))).toBeDefined();
  });  

  it('Should have a router-outlet tag', () => {    
    expect(element(by.tagName('router-outlet'))).toBeDefined();
  }); 

  it('Should have an app-footer-block tag', () => {    
    expect(element(by.tagName('app-footer-block'))).toBeDefined();
  }); 

  it('Should have an app-top-form tag', () => {    
    expect(element(by.tagName('app-top-form'))).toBeDefined();
  });   

  it('Should have an iframe .inner tag with src = videourl', () => {    
    expect(element(by.css('.inner')).getAttribute('src')).toBe('https://www.youtube.com/embed/LzkDYkvDnlI');
  }); 

  it('FancyImg carusel should rotate to the left after left button click', () => {   
    goleft();
    expect(element(by.id('slider2')).element(by.css('.owl-stage')).getAttribute('style')).toBe('transform: translate3d(-581px, 0px, 0px); transition: all 0.25s ease 0s; width: 2713px;');
  });  

  it('If clicking to link Рафтинг in the top menu it\'ll navigate the url /rafting ', async () => {   
    debugger;
    element(by.id('rafting-item')).click();
    // Ждем загрузки VK виджета
    browser.wait(function() {
      return element(by.id('vkwidget1')).isPresent();
    }, 8000);    
    expect(await browser.getCurrentUrl()).toBe('http://localhost:4200/rafting');
  }); 

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
