export class CreateTeacherDTO {
    highPostion: boolean;
    positionId: number;
    constructor(
        highPostion: boolean = false, // Default to false if not provided
        positionId: number,
    ) {
        this.highPostion = highPostion;
        this.positionId = positionId;
    }
}