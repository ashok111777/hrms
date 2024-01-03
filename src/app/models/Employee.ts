    export class Employee {
        employeeid?: string;
        firstName?: string;
        lastName?: string;
        department?: Department;
        mobileNo?: string;
        emailId?: string;
        gender?: string;
        dob?: string;
    }
    export class Department {
        deptId?: string;
        deptName?: string;
    }
    export class Designation {
        desigId?: string;
        desigName?: string;
    }

    export class EmployeePersonalDetail {
        id?: string;
        firstName?: string;
        lastName?: string;
        mobileNo?: string;
        emailId?: string;
        gender?: string;
        dob?: string;
        fatherName?:string;
        motherName?:string;
    }
    export class ResidentialDetail {
        street?: string;
        village?: string;
        city?: string;
        district?: string;
        state?: string;
        zipcode?: string;
        country?: string;
        
    }
    export class CommunicationDetail {
        street?: string;
        village?: string;
        city?: string;
        district?: string;
        state?: string;
        zipcode?: string;
        country?: string;
        
    }
    export class ProfessionalDetail {
        teamName?: string;
        designation?: string;
        doj?: string; // date of joining
        doc?: string; // date of confirmation
        empType?: string;
        experience?: string;
        qualifications?:string;
        PreviousEmployer?:string;
        PreviousExperience?:string;
        PreviousDesignation?:string;
        Workloaction?:string;
        Geography?:string;
        AdditionReplacement?:string;
        Category?:string;
        Totalexperience?:string;
    }
    export interface EmployeeDetail {
        profileurl:any
        personalDetail: EmployeePersonalDetail,
        residentialDetail: ResidentialDetail,
        communicationDetail: CommunicationDetail,
        professionalDetail: ProfessionalDetail
    }

    export class TrainingEmployeeDetail {
        id?: string;
        Name?: string;
        Doj?: string;
        Designation?: string;
        Departnment?: string;
        mobileNo?: string;
        Exp?: string;
    }

    
    export class designationListClass {
        id:number;
        designation:string;
        description:string;
    }
    
    export class productListClass {
        id:number;
        teamName:string;
        description:string;
    }

    export class userListClass {
        userId:number;
        userName:string;
    }