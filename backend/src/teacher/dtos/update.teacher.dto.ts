export class UpdateTeacherDTO {
    id: number;
    highPostion?: boolean;
    positionId?: number;
    constructor(
        id: number,
        highPostion?: boolean,
        positionId?: number,
    ) {
        this.id = id;
        this.highPostion = highPostion;
        this.positionId = positionId;
    }
}
