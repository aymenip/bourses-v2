import { SubmissionStatus } from "submission/submission.enums";

export class UpdateSubmissionDTO {
  id: number;
  formId?: number;
  userId?: number;
  status?: SubmissionStatus;
  data?: string;
  constructor(
    id: number,
    formId?: number,
    userId?: number,
    status?: SubmissionStatus,
    data?: string
  ) {
    this.id = id;
    this.formId = formId;
    this.userId = userId;
    this.status = status;
    this.data = data;
  }
}
