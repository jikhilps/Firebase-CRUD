import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/Class/User';
import { UserService } from 'src/Services/user.service';
import { Location } from 'src/app/Class/Location';
import { ValidationProvider } from 'src/Services/validation/validation';

@Component({
  selector: 'app-review-sites',
  templateUrl: './review-sites.page.html',
  styleUrls: ['./review-sites.page.scss'],
})
export class ReviewSitesPage implements OnInit {
user=new User();
location=new Location();
IsFBAdded:boolean=false;
IsGoogleAdded:boolean=false;
IsIGAdded:boolean=false;
IsEdit:boolean=false;

  constructor(public activatedRoute: ActivatedRoute,private userService:UserService,private router:Router,private toastCtrl: ToastController,private validationService:ValidationProvider) { 

    this.activatedRoute.queryParams.subscribe(params=>{
      if(!!this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.user && this.router.getCurrentNavigation().extras.state.location){
        this.user=this.router.getCurrentNavigation().extras.state.user;
        this.location=this.router.getCurrentNavigation().extras.state.location;
        this.IsEdit=this.router.getCurrentNavigation().extras.state.isedit;
        if(this.location.GoogleURL.length>2)
        {
          this.IsGoogleAdded=true;
        }
        else
        {
          this.IsGoogleAdded=false;
        }
        if(this.location.FacebookURL.length>2)
        {
          this.IsFBAdded=true;
        }
        else
        {
          this.IsFBAdded=false;
        }
        if(this.location.InstagramURL.length>2)
        {
          this.IsIGAdded=true;
        }
        else
        {
          this.IsIGAdded=false;
        }
     
      }
      else 
      {
        this.router.navigate(['location-list'])
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

    if(this.validationService.ValidateValues(this.location.GoogleURL,"Google Url",true))
    {
      if(this.user.LocationList.length>0)
      {
       let indx=(this.user.LocationList.findIndex((d)=> d.LocationName==this.location.LocationName && d.Address==this.location.Address ));
       if(indx>=0)
       {
         this.user.LocationList[indx]=this.location;
       }
       else
       {
         this.user.LocationList.push(this.location);
       }
   
      }
      else
      {
       this.user.LocationList.push(this.location);
       console.log(this.user);
      }
  
      this.userService.updateUser(this.user.Id,this.user).then(()=>
      {
  
        this.DisplayToast("Google Link Added")
        this.IsGoogleAdded=true
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }
   
  
  }

  AddFBLink()
  {
    if(this.validationService.ValidateValues(this.location.FacebookURL,"Facebbook Url",true))
    {
      if(this.user.LocationList.length>0)
      {
       let indx=(this.user.LocationList.findIndex((d)=> d.LocationName==this.location.LocationName && d.Address==this.location.Address ));
       if(indx>=0)
       {
         this.user.LocationList[indx]=this.location;
       }
       else
       {
         this.user.LocationList.push(this.location);
       }
   
      }
      else
      {
       this.user.LocationList.push(this.location);
       console.log(this.user);
      }
  
      this.userService.updateUser(this.user.Id,this.user).then(()=>
      {
  
        this.DisplayToast("Facebook Link Added")
        this.IsFBAdded=true
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }
  }

  AddIGLink()
  {
    if(this.validationService.ValidateValues(this.location.InstagramURL,"Instagram Url",true))
    {
      if(this.user.LocationList.length>0)
      {
       let indx=(this.user.LocationList.findIndex((d)=> d.LocationName==this.location.LocationName && d.Address==this.location.Address ));
       if(indx>=0)
       {
         this.user.LocationList[indx]=this.location;
       }
       else
       {
         this.user.LocationList.push(this.location);
       }
   
      }
      else
      {
       this.user.LocationList.push(this.location);
       console.log(this.user);
      }
  
      this.userService.updateUser(this.user.Id,this.user).then(()=>
      {
  
        this.DisplayToast("Instagram Link Added")
        this.IsIGAdded=true
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }
  }
  async DisplayToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    
    });
    toast.present();
  }


  back()
  {
    this.router.navigate(['location-list'])
  }

}
