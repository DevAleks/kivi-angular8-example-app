import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  isNavToggle = false // Переключатель dropdown меню

  constructor(
    private router: Router,
    public auth: AuthService,
    @Inject(DOCUMENT) private _document: Document
    ) { }

  // Устанавливаем в body стиль для блокировки прокрутки экрана
  isNavDropdown(isNavToggle: boolean) {
    if (isNavToggle) {
      this._document.body.classList.add('lock')
    } 
    else {
      this._document.body.classList.remove('lock')      
    }    
    isNavToggle = !isNavToggle
  }  

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }

  ngOnInit() { }

}
