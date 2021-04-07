import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from 'src/app/Class/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserListRef: AngularFireList<any>;
  UserRef: AngularFireObject<any>;

  ReviewSiteRef: AngularFireList<any>;
  SiteRefRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }


  RegisterUser(user:any)
  {
    this.UserListRef = this.db.list('/Users');
    return this.UserListRef.push(user);
  }


  LoginCheck()
  {
    this.UserListRef = this.db.list('/Users');
    return this.UserListRef;
  }

  // GetUserList() {
  //   this.UserListRef = this.db.list('/Users');
  //   return this.UserListRef;
  // }

  updateUser(id, user: User) {
    this.UserRef = this.db.object('/Users/' + id);
    return this.UserRef.update(user)
  }

  GetUser(id: string) {
    this.UserRef = this.db.object('/Users/' + id);
    return this.UserRef;
  }

  // DeleteUser(id: string) {
  //   this.UserRef = this.db.object('/Users/' + id);
  //   this.UserRef.remove();
  // }

}
