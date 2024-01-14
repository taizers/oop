import dotenv from 'dotenv';
dotenv.config();

import { EmployeeType } from '../types/global/entities';

export default class EmployeeDto {
  id;
  age;
  name;
  avatar;
  education;
  courses;
  foreign_level;
  adress;
  company_id;
  created_at;
  updated_at;
  deleted_at;

  constructor(model: EmployeeType) {
    this.id = model.id;
    this.age = model.age;
    this.education = model.education;
    this.courses = model.courses;
    this.foreign_level = model.foreign_level;
    this.adress = model.adress;
    this.company_id = model.company_id;
    this.avatar = model.avatar && `storage/employees/avatars/${model.avatar}`;
    this.name = model.name;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
    this.deleted_at = model.deleted_at;
  }
}
