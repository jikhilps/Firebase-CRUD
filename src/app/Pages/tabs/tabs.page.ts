import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { User } from 'src/app/Class/User';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
user=new User();


  constructor(private menu: MenuController,private formBuilder: FormBuilder,private userService:UserService,private router:Router,private toastCtrl: ToastController) {}


  logout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ionViewWillEnter ()
  {
    if(localStorage.getItem('user'))
    {
    this.user=JSON.parse(localStorage.getItem('user'));
 
    let x=this.userService.GetUser(this.user.Id).valueChanges().subscribe((data)=>{
      this.user=data;
      if(this.user.Address.length>2)
      {
        localStorage.setItem("user",JSON.stringify(this.user))
        this.GotoReviewSites();
      }
    
      
      
    })
    }
   
  }

  Save()
  {
    this.userService.updateUser(this.user.Id,this.user).then(()=>
    {
      this.DisplayToast("Location Added Success")
     this.GotoReviewSites();
      
    }).catch((err)=>{
      console.log(err);
      
    })
    
  }

  GotoReviewSites()
  {
     
    let navigationExtras:NavigationExtras={
      state:{
        user:this.user
      } 
    }
    this.router.navigate(['review-sites'],navigationExtras);
  }


  async DisplayToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
    
    });
    toast.present();
  }
 

}
