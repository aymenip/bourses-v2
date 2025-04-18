import { SubmissionStatus } from "submission/submission.enums";

export class SubmissionDTO {
  id: number;
  formId: number;
  userId: number;
  status: SubmissionStatus;
  data: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    formId: number,
    userId: number,
    status: SubmissionStatus,
    data: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.formId = formId;
    this.userId = userId;
    this.status = status;
    this.data = data;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class SubmissionWithUserInfoDTO {
  id: number;
  formId: number;
  userId: number;
  status: SubmissionStatus;
  firstname: string;
  lastname: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    formId: number,
    userId: number,
    status: SubmissionStatus,
    firstname: string,
    lastname: string,
    position: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.formId = formId;
    this.userId = userId;
    this.status = status;
    this.firstname = firstname;
    this.lastname = lastname;
    this.position = position;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
