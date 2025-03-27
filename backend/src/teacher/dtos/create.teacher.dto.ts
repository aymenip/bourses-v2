export class CreateTeacherDTO {
  highPosition: boolean;
  constructor(
    highPosition: boolean = false // Default to false if not provided
  ) {
    this.highPosition = highPosition;
  }
}
