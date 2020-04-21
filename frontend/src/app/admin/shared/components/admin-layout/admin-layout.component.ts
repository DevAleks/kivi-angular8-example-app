import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router) {

  }

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/admin', 'login'])
  }

  ngOnInit() {
  }



}
