import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { User } from 'src/app/Class/User';
import { UserService } from 'src/Services/user.service';
import { Location } from 'src/app/Class/Location';
import { ValidationProvider } from 'src/Services/validation/validation';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
user=new User();
location=new Location()
IsEdit:boolean=false;
locationIndex:number=-1;


  constructor(private userService:UserService,private router:Router,private toastCtrl: ToastController,private validationservice:ValidationProvider) {
    if(!!this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.user && this.router.getCurrentNavigation().extras.state.location){
      this.user=this.router.getCurrentNavigation().extras.state.user;
      this.location=this.router.getCurrentNavigation().extras.state.location;
      this.IsEdit=this.router.getCurrentNavigation().extras.state.isedit;
      this.location.UserId=this.user.Id;
      if(this.IsEdit)
      {
        this.locationIndex=(this.user.LocationList.findIndex((d)=> d.LocationName==this.location.LocationName && d.Address==this.location.Address));
      }
    }
    else
    {
      this.router.navigate(['location-list']);
    }
  }




 

  Save()
  {
    if(this.validationservice.ValidateValues(this.location.LocationName,"Location Name",true) && this.validationservice.ValidateValues(this.location.Address,"Location Address",true) 
    && this.validationservice.ValidateValues(this.location.City,"City",true) && this.validationservice.ValidateValues(this.location.Country,"Country",true) && 
    this.validationservice.ValidateMobile(this.location.Phone,true))
    {
      if(this.user.LocationList.length>0)
      {
       let indx=(this.user.LocationList.findIndex((d)=> d.LocationName==this.location.LocationName && d.Address==this.location.Address));
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
   
      this.userService.updateUser(this.user.Id,this.user).then(()=>{
       this.GotoReviewSites()
      }).catch();  
       
    }

  }

  Edit()
  { if(this.validationservice.ValidateValues(this.location.LocationName,"Location Name",true) && this.validationservice.ValidateValues(this.location.Address,"Location Address",true) 
  && this.validationservice.ValidateValues(this.location.City,"City",true) && this.validationservice.ValidateValues(this.location.Country,"Country",true) && 
  this.validationservice.ValidateMobile(this.location.Phone,true))
  {
    if(this.locationIndex<=0)
    {
      this.user.LocationList[this.locationIndex]=this.location;
      this.userService.updateUser(this.user.Id,this.user).then(()=>{
        this.back()
       }).catch(); 
    }
    else
    {
      this.DisplayToast("Error While Insert")
    }
  }

  }

  back()
  {
    this.router.navigate(['location-list'])
  }

  GotoReviewSites()
  {
     
    let navigationExtras:NavigationExtras={
      state:{
        user:this.user,
        location:this.location,
        isedit:false
      } 
    }
    this.router.navigate(['review-sites'],navigationExtras);
  }


  async DisplayToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    
    });
    toast.present();
  }
 

}
