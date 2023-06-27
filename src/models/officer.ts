import { Schema, model, Document, ObjectId } from "mongoose";
import { batchWiseDepartments, batchwiseDepartmentsInterface } from "./company";

// Selected Students by Company Interface --------------------------

export interface selectedStudentsInterface {
  department_name: string;
  year_batch: number;
  start_date: Date | null;
  end_date: Date | null;
  confirmed: boolean;
  studentsdetails: Students[];
}

// Selected Students by Company Interface --------------------------

// ----------------------------------- subscribeRequest Interface

export interface subscribeRequest {
  company_id: string;
  index: number;
  message: string;
  username: string;
  company_name: string;
}

// ----------------------------------- subscribeRequest Interface

// ----------------------------------- subscribedCompany Interface

export interface subscribedCompany {
  company_id: string;
  index: number;
  message: string;
  username: string;
  company_name: string;
  access: batchwiseDepartmentsInterface[];
  selectedstudents: selectedStudentsInterface[];
}

// ----------------------------------- subscribedCompany Interface

// ----------------------------------- cancelledCompany Interface

export interface cancelledCompany {
  company_id: string;
  index: number;
  username: string;
  company_name: string;
  message: string;
}

// ----------------------------------- cancelledCompany Interface

// -------------------------------------------- Students Interface

export interface Students {
  index: number;
  name: string;
  email_id: string;
  college_name: string;
  location: string;
  mobile_no: string;
  branch: string;
  roll_no: string;
  achievements: [string];
  skills: [string];
  hobbies: [string];
  cgpa: number;
  backlog: boolean;
  year_batch: number;
  linked_profile_link: string;
  github_profile_link: string;
  leetcode_profile: string;
  geeksforgeeks_profile: string;
  internship_start_date: Date | null;
  internship_end_date: Date | null;
  Internship_status: boolean;
  current_internship: string | null;
  internships_till_now: [string];
  tenth_percentage: number;
  twelve_percentage: number;
  diploma_percentage: number;
}

// -------------------------------------------- Students Interface

// ----------------------------------------- Department Interface

export interface Department {
  _id?: ObjectId;
  department_name: string;
  year_batch: number;
  student_details: Students[];
}

// ----------------------------------------- Department Interface

// -------------------------------------------- Officer Interface

export interface Officer extends Document {
  index: number;
  username: string;
  email_id: string;
  mobile_no: string;
  college_name: string;
  password: string;
  subscribe_request_from_company: subscribeRequest[];
  subscribe_request_to_company: subscribeRequest[];
  subscribed_company: subscribedCompany[];
  cancelled_company: cancelledCompany[];
  college_details: Department[];
}

// -------------------------------------------- Officer Interface

// --------------------------------------------- Student Schema

export const StudentsSchema = new Schema<Students>({
  index: {
    type: Number,
  },
  name: {
    type: String,
  },
  email_id: {
    type: String,
  },
  college_name: {
    type: String,
  },
  location: {
    type: String,
  },
  mobile_no: {
    type: String,
  },
  branch: {
    type: String,
  },
  roll_no: {
    type: String,
  },
  achievements: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  hobbies: {
    type: [String],
  },
  cgpa: {
    type: Number,
  },
  year_batch: {
    type: Number,
  },
  backlog: {
    type: Boolean,
  },
  linked_profile_link: {
    type: String,
  },
  github_profile_link: {
    type: String,
  },
  leetcode_profile: {
    type: String,
  },
  geeksforgeeks_profile: {
    type: String,
  },
  internship_start_date: {
    type: Date,
    default: null,
  },
  internship_end_date: {
    type: Date,
    default: null,
  },
  tenth_percentage: {
    type: Number,
  },
  twelve_percentage: {
    type: Number,
  },
  diploma_percentage: {
    type: Number,
  },
  current_internship: {
    type: String,
    default: null,
  },
  internships_till_now: {
    type: [String],
  },
  Internship_status: {
    type: Boolean,
  },
});

StudentsSchema.pre<Students>("save", function (next) {
  const currentDate = new Date();
  if (this.internship_end_date && this.internship_end_date <= currentDate) {
    this.Internship_status = false;
    this.current_internship = null;
    this.internship_start_date = null;
    this.internship_end_date = null;
  }
  next();
});

// ----------------------------------------------- Student Schema

// Selected Students by Company Schema --------------------------

export const selectedStudents = new Schema<selectedStudentsInterface>({
  department_name: {
    type: String,
  },
  year_batch: {
    type: Number,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  confirmed: {
    type: Boolean,
  },
  studentsdetails: {
    type: [StudentsSchema],
  },
});

// Selected Students by Company Schema --------------------------

// ----------------------------------- subscribedCompany Schema

export const subscribedCompany = new Schema<subscribedCompany>({
  company_id: {
    type: String,
  },
  index: {
    type: Number,
  },
  access: {
    type: [batchWiseDepartments],
  },
  message: {
    type: String,
  },
  username: {
    type: String,
  },
  company_name: {
    type: String,
  },
  selectedstudents: {
    type: [selectedStudents],
  },
});

// ----------------------------------- subscribedCompany Schema

// ----------------------------------- subscribeRequestFromCompany Schema

export const subscribeRequestFromCompany = new Schema<subscribeRequest>({
  company_id: {
    type: String,
  },
  index: {
    type: Number,
  },
  message: {
    type: String,
  },
  username: {
    type: String,
  },
  company_name: {
    type: String,
  },
});

// ----------------------------------- subscribeRequestFromCompany Schema

// ----------------------------------- subscribeRequestFromCompany Schema

export const subscribeRequesttoCompany = new Schema<subscribeRequest>({
  company_id: {
    type: String,
  },
  index: {
    type: Number,
  },
  message: {
    type: String,
  },
  username: {
    type: String,
  },
  company_name: {
    type: String,
  },
});

// ----------------------------------- subscribeRequestFromCompany Schema

// ----------------------------------- cancelledCompany Schema

export const cancelledCompany = new Schema<cancelledCompany>({
  company_id: {
    type: String,
  },
  index: {
    type: Number,
  },
  message: {
    type: String,
  },
  username: {
    type: String,
  },
  company_name: {
    type: String,
  },
});

// ----------------------------------- cancelledCompany Schema

// --------------------------------------------- Department Schema

export const DepartmentSchema = new Schema<Department>({
  department_name: {
    type: String,
    minlength: [2, "minimum 2 letters required"],
    required: true,
  },
  year_batch: {
    type: Number,
    validate: {
      validator: function (value: number): void {
        if (value.toString().length != 4) {
          throw new Error("The number should be of 4 digits long.");
        }
      },
    },
    required: true,
  },
  student_details: {
    type: [StudentsSchema],
  },
});

// -------------------------------------------- Department Schema

// ----------------------------------------------- Officer Schema

const OfficerSchema = new Schema<Officer>({
  index: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  college_name: {
    type: String,
    required: true,
  },
  subscribe_request_from_company: {
    type: [subscribeRequestFromCompany],
  },
  subscribe_request_to_company: {
    type: [subscribeRequesttoCompany],
  },
  subscribed_company: {
    type: [subscribedCompany],
  },
  cancelled_company: {
    type: [cancelledCompany],
  },
  college_details: {
    type: [DepartmentSchema],
  },
});

// ----------------------------------------------- Officer Schema

const OfficerModel = model<Officer>("Officer", OfficerSchema);

export default OfficerModel;
