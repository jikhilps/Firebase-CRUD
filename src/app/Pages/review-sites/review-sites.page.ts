import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/Class/User';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-review-sites',
  templateUrl: './review-sites.page.html',
  styleUrls: ['./review-sites.page.scss'],
})
export class ReviewSitesPage implements OnInit {
user=new User();
IsFBAdded:boolean=false;
IsGoogleAdded:boolean=false;
IsIGAdded:boolean=false;
  constructor(public activatedRoute: ActivatedRoute,private userService:UserService,private router:Router,private toastCtrl: ToastController) { 

    this.activatedRoute.queryParams.subscribe(params=>{
      if(!!this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.user){
        this.user=this.router.getCurrentNavigation().extras.state.user;

        if(this.user.GoogleURL.length>1)
        {
          this.IsGoogleAdded=true;
        }
        if(this.user.FacebookURL.length>1)
        {
          this.IsFBAdded=true;
        }
        if(this.user.InstagramURL.length>1)
        {
          this.IsIGAdded=true;
        }
   
      }
      else 
      {
        this.router.navigate(['home'])
      }
     
    })
  }

  ngOnInit() {
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  AddGoogleLink()
  {
    this.userService.updateUser(this.user.Id,this.user).then(()=>
    {
      this.DisplayToast("Google Link Added")
      this.IsGoogleAdded=true
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  AddFBLink()
  {
    this.userService.updateUser(this.user.Id,this.user).then(()=>
    {
      this.DisplayToast("FaceBook Link Added")
      this.IsFBAdded=true
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  AddIGLink()
  {
    this.userService.updateUser(this.user.Id,this.user).then(()=>
    {
      this.DisplayToast("Instagram Link Added")
      this.IsIGAdded=true
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  async DisplayToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
    
    });
    toast.present();
  }

}
