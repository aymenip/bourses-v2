export class FormDTO {
    id: number;
    title: string;
    creator: number;
    constructor(
        id: number,
        title: string,
        creator: number,
    ) {
        this.id = id;
        this.title = title;
        this.creator = creator;
    }
}