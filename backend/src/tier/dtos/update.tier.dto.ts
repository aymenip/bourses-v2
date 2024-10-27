export class UpdateTierDTO {
    id: number;
    name?: string;
    durationId?: number;
    constructor(
        id: number,
        name: string,
        durationId: number,
    ) {
        this.id = id;
        this.name = name;
        this.durationId = durationId;
    }
}
