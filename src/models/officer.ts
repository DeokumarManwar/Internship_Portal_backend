import { Schema, model, Document, Types } from "mongoose";

export interface Students {
  name: string;
  cgpa: number;
  year_batch: number;
}

export interface SharedDetails {
  company_id: string;
  shared_id: string;
  details_id: string;
}

export interface Department {
  name: string;
  student_details: Students[];
}

export interface Officer extends Document {
  name: string;
  email_id: string;
  imageURL: string;
  college_name: string;
  details: Department[];
  sharedCompany: SharedDetails[];
}

export const SharedDetailsSchema = new Schema<SharedDetails>({
  shared_id: {
    type: String,
  },
  company_id: {
    type: String,
  },
  details_id: {
    type: String,
  },
});

export const StudentsSchema = new Schema<Students>({
  name: {
    type: String,
  },
  cgpa: {
    type: Number,
  },
  year_batch: {
    type: Number,
  },
});

export const DepartmentSchema = new Schema<Department>({
  name: {
    type: String,
  },
  student_details: {
    type: [StudentsSchema],
  },
});

const OfficerSchema = new Schema<Officer>({
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  email_id: {
    type: String,
    required: true,
  },
  college_name: {
    type: String,
    required: true,
  },
  details: {
    type: [DepartmentSchema],
  },
  sharedCompany: {
    type: [SharedDetailsSchema],
  },
});

const OfficerModel = model<Officer>("Officer", OfficerSchema);

export default OfficerModel;
