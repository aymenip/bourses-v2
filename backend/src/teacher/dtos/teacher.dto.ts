export class TeacherDTO {
    id: number;
    highPostion: boolean;
    createdAt: Date;
    updatedAt: Date;
    positionId: number;
    constructor(
        id: number,
        highPostion: boolean,
        createdAt: Date,
        updatedAt: Date,
        positionId: number,
    ) {
        this.id = id,
            this.highPostion = highPostion,
            this.createdAt = createdAt,
            this.updatedAt = updatedAt,
            this.positionId = positionId
    }
}