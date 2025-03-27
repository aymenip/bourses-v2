export class UpdateTeacherDTO {
  id: number;
  highPosition?: boolean;
  constructor(id: number, highPosition?: boolean) {
    this.id = id;
    this.highPosition = highPosition;
  }
}
