export class TierDTO {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    durationId: number;

    constructor(
        id: number,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        durationId: number,
    ) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.durationId = durationId;
    }
}