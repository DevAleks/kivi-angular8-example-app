/* Source: https://medium.com/allenhwkim/angular-monitor-element-is-in-viewport-after-scrolling-67f4d787647c */

import {Directive, Component, Input, ViewContainerRef, TemplateRef, AfterViewInit} from '@angular/core';

@Directive({selector: '[inView]'})
export class InViewDirective implements AfterViewInit {
  alreadyRendered: boolean; // cheking if visible already
  
  constructor(
    private vcRef: ViewContainerRef,
    private tplRef: TemplateRef<any>
  ) {}

  ngAfterViewInit() {
    const commentEl = this.vcRef.element.nativeElement // template
    const elToObserve = commentEl.parentElement
    this.setMinWidthHeight(elToObserve)
  
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          this.renderContents(entry.isIntersecting)
        })
      }, {threshold: [0, .1, .9, 1]})
    observer.observe(elToObserve);
  }

  renderContents(isInView) {
    if (isInView && !this.alreadyRendered) {
      this.vcRef.clear()
      this.vcRef.createEmbeddedView(this.tplRef)
      this.alreadyRendered = true
    }
  }

  setMinWidthHeight(el) { // prevent issue being visible all together
    const style = window.getComputedStyle(el)
    const [width, height] = [parseInt(style.width), parseInt(style.height)]
    !width && (el.style.minWidth = '40px')
    !height && (el.style.minHeight = '40px')
  }
}
