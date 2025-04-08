import { SubmissionStatus } from "submission/submission.enums";

export class CreateSubmissionDTO {
  formId: number;
  userId: number;
  status: SubmissionStatus;
  data: string;
  constructor(
    formId: number,
    userId: number,
    status: SubmissionStatus,
    data: string,
  ) {
    this.formId = formId;
    this.userId = userId;
    this.status = status;
    this.data = data;
  }
}
