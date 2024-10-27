export class positionDTO {
    id: number;
    name: string;
    createdAt: Date;
    updateAt: Date;

    constructor(
        id: number,
        name: string,
        createdAt: Date,
        updateAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }
}