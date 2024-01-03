import { ProfileDetails } from "./profile-details";

export interface UserDetail {
    id: string;
    // profile: ProfileDetails;
    profile: string; // HR/Manager/Admin
    status:string;
    firstName: string;
    lastName: string;
    empCode: string;
    dob: string;
    mobileNo: string;
    emailId:string;
    address: string;
    gender:string;
    company:string;
    branch:string;
    // isLoggedin:boolean;
    // token:string;
}
