import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Class/User';
import { UserService } from 'src/Services/user.service';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from 'src/app/Class/Location';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { exit } from 'process';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.page.html',
  styleUrls: ['./location-list.page.scss'],
})
export class LocationListPage implements OnInit {
user=new User();
backButtonSubscription:any;
  constructor(private userservice:UserService,private router:Router,public alertController: AlertController,private toastCtrl:ToastController,private platform:Platform) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    if(localStorage.getItem('user'))
    {
      let uu=JSON.parse(localStorage.getItem('user'));
      this.userservice.GetUser(uu['Id']).valueChanges().subscribe(res => {
       this.user=res;
       this.user.Id=uu['Id']
       if(this.user.LocationList === undefined  )
       {
        this.user.LocationList=[];
        console.log(this.user);
       }
       else
       {
        
       }
       
       
        
       });
      
    }
    else
    {
      this.router.navigate(['login'])
    }
  }

  CreateNewLocation()
  {
    let navigationExtras:NavigationExtras={
      state:{
        user:this.user,
        location:new Location(),
        isedit:false
      } 
    }
    this.router.navigate(['add-location'],navigationExtras);
  }

  EditLocation(loc)
  {
    let navigationExtras:NavigationExtras={
      state:{
        user:this.user,
        location:loc,
        isedit:true
      } 
    }
    this.router.navigate(['add-location'],navigationExtras);
  }

  GotoReviewSites(loc)
  {
     
    let navigationExtras:NavigationExtras={
      state:{
        user:this.user,
        location:loc,
        isedit:true
      } 
    }
    this.router.navigate(['review-sites'],navigationExtras);
  }


 async LogOut()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure You Want Logout',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            localStorage.clear();
           this.router.navigate(['login']);
          }
        }
      ]
    });

    await alert.present();
  }


 async DeleteLocation(loc,indx)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure You Want Delete Location '+loc.LocationName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
           
            this.user.LocationList.splice(indx,1);
            this.userservice.updateUser(this.user.Id,this.user).then(()=>{
              this.DisplayToast("Location Deleted");
            }).catch(()=>{})
            

          }
        }
      ]
    });

    await alert.present();
  }

  async DisplayToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    
    });
    toast.present();
  }


  ionViewDidEnter(){

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      let that = this;

      this.ExitApp()

    })

  }
  
  ionViewWillLeave(){
    this.backButtonSubscription.unsubscribe();
  }

  async ExitApp()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure You Want Exit App ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
           
            navigator['app'].exitApp();
            

          }
        }
      ]
    });

    await alert.present();
  }

 
 
}
