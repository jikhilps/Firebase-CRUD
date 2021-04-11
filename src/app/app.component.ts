import { Component } from '@angular/core';
import { UserService } from 'src/Services/user.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { User } from './Class/User';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
user=new User();
  constructor(private userservice:UserService,private router:Router,private platform:Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.CheckLocalStorage();
   
    });
  }

  CheckLocalStorage()
  {
    if(localStorage.getItem('user'))
    {

      let uu=JSON.parse(localStorage.getItem('user'));
      this.userservice.GetUser(uu['Id']).valueChanges().subscribe(res => {
       if(res ==undefined)
       {
         localStorage.removeItem('user');
        this.router.navigate(['login']);
       }
       else
       {
        this.user=res;
        this.user.Id=uu['Id']
        localStorage.removeItem('user');
        localStorage.setItem('user',JSON.stringify(this.user));
       }
       
        

      })



    }
    else
    {
      this.router.navigate(['login']);

    }
  }
}
