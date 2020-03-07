import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Pipe для ссылки на Youtube видео в шаблоне компонента VideoBlockComponent
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
    transform(url:any) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

/*
@Pipe({ name: 'safescript' })
export class SafeScriptPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
    transform(url:string) {
      return this.sanitizer.bypassSecurityTrustScript(url);
  }
} 
*/