import dotenv from 'dotenv';
dotenv.config();

import { CompanyType } from '../types/global/entities';

export default class CompanyDto {
  id;
  age;
  name;
  avatar;
  location;
  scope;
  ceo;
  created_at;
  updated_at;
  deleted_at;

  constructor(model: CompanyType) {
    this.id = model.id;
    this.age = model.age;
    this.location = model.location;
    this.scope = model.scope;
    this.ceo = model.ceo;
    this.avatar = `storage/companies/avatars/${model.avatar}`;
    this.name = model.name;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
    this.deleted_at = model.deleted_at;
  }
}
