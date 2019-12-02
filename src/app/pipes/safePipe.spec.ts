import { DomSanitizer } from "@angular/platform-browser";
import { DomSanitizerImpl } from "@angular/platform-browser/esm2015/src/security/dom_sanitization_service";
import { SafePipe } from '../pipes/safePipe';

describe('SafePipe', () => {
    let sanitizer: DomSanitizer = new DomSanitizerImpl(null);
    let safePipe: SafePipe;
    const mockUrl = "https://www.youtube.com/embed/LzkDYkvDnlI";

    beforeEach(() => {
      safePipe = new SafePipe(sanitizer);
    });
     
    it('should transforms mockUrl', () => {
      expect(safePipe.transform(mockUrl)).toEqual(sanitizer.bypassSecurityTrustResourceUrl(mockUrl));
    });
  
});

