import { Injectable } from '@angular/core';
import { ProfileDetails, ProfileType, ProfileTypeList } from '../models/profile-details';
import { UserDetail } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserDetail;
  profile: ProfileDetails;
  profileType: ProfileType;
  profileTypeList: ProfileTypeList;
  constructor() {
  }
}