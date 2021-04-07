import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Users', url: 'user-list', icon: 'people-circle' },
    { title: 'Reports', url: '/folder/Reports', icon: 'paper-plane' },
    
    
  ];
  constructor() {}
}
