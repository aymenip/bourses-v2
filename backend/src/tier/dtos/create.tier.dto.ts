export class CreateTierDTO {
    name: string;
    durationId: number;
    constructor(
        name: string,
        durationId: number,
    ) {
        this.name = name;
        this.durationId = durationId;
    }
}

