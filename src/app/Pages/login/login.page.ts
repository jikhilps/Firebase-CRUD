import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/Class/User';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  IsRegister:boolean=true;
  UserList:User[]=[];
  user=new User();

  constructor(private formBuilder: FormBuilder,private userService:UserService,private router:Router,private toastCtrl: ToastController) {}

  ngOnInit() {
  }
  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get username() {
    return this.LoginForm.get('username');
  }
  get loginpass() {
    return this.LoginForm.get('password');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' },
      { type: 'minlength', message: 'Please enter 10 digit' }
    ],
    password :[ { type: 'required', message: 'password is required' }]
  
  };
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')

      ]
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
        Validators.minLength(10)
      ]
    ],
    password: ['',[ Validators.required]]
   
  });


  LoginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(100)]],
    password: ['',[Validators.required]],
   
  });
  public Register() {
   
    let data=this.registrationForm.value
    let uu=new User();
    uu.Name=data['name'];
    uu.Email=data['email'];
    uu.Mobile=data['phone'];
    uu.Password=data['password'];
    console.log(uu);
   let key= this.userService.RegisterUser(uu).key;
   this.DisplayToast("Register Success");
  this.GotoLogin();
  }


  Login()
  {
     
    let data=this.LoginForm.value;
     let userlist = this.userService.LoginCheck();
    userlist.snapshotChanges().subscribe(res => {
      this.UserList = [];
      res.forEach(item => {
        let uu=new User();
        let itm = item.payload.toJSON();
        uu.Id=item.key;
        uu.Name=itm['Name'];
        uu.Email=itm['Email'];
        uu.Mobile=itm['Mobile'];
        uu.Password=itm['Password'];
      
        this.UserList.push(uu);
      })
      
      if(this.UserList.find((x)=> x.Password==data['password'] && (x.Email==data['username'] || x.Mobile==data['username'])))
      {
        this.DisplayToast("Login Success");
       this.user=this.UserList.find((x)=> x.Password==data['password'] && (x.Email==data['username'] || x.Mobile==data['username']))
       localStorage.setItem("user",JSON.stringify(this.user));
       this.router.navigate(['location-list'])

      }
      else
      {
       this.DisplayToast("Invalid UserName Or Password");
      }
      
    })
  }

  GotoLogin()
  {
    this.IsRegister=!this.IsRegister;
  }

  async DisplayToast(msg:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    
    });
    toast.present();
  }

  ionViewWillEnter ()
  {
    if(localStorage.getItem('user'))
    {
     this.router.navigate(['location-list']);
      
    }
   
  }

}
