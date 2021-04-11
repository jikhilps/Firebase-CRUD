
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


/*
  Generated class for the ValidationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class ValidationProvider {

  constructor(private alertservice: ToastController) {
  }


  ValidateEmail(mail,alt) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    else{
     if(alt)
     {
      this.DisplayToast('You have entered an invalid email address!');
      return (false)
     }
     else
     {
      return (false)
     }
      
    }
   
  }
  ValidateMobile(mobile,alt) 
  {
   if (/^(\+[\d]{1,5}|0)?[6-9]\d{9}$/.test(mobile))
    {
      return (true)
    }
    else{
     if(alt)
     {
      this.DisplayToast('You have entered an invalid Mobile no');
      return (false)
     }
     else
     {
      return (false)
     }
     
      
    }
      
    
  }
  ValidatePassword(name,alt) 
  {
   if (name.length>0&&name.length>6)
    {
      return (true)
    }
    else{ 
      this.DisplayToast("Please Enter Valid Password");}
      return (false)
  }





  ValidateValues(data:string,fieldName,alt) 
  {
   if (data.toString().trim().length>0)
    {
      return (true)
    }
    else{
     
      this.DisplayToast('Please enter '+fieldName);
      
    }
      
      return (false)
  }

  ValidateIntegerValues(data,fieldName,alt) 
  {
   if (data>0)
    {
      return (true)
    }
    else{
     
      this.DisplayToast('Please Select '+fieldName);
      
    }
      
      return (false)
  }



  async DisplayToast(msg:string) {
    const toast = await this.alertservice.create({
      message: msg,
      duration: 1000,
      position: 'bottom',
    
    });
    toast.present();
  }

}
