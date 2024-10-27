export class CreateTeacherDTO {
    firstname: string;
    lastname: string;
    email: string;
    dob: Date;
    matrialStatus: 'متزوج' | 'أعزب';
    age?: number; // Optional, as it might not be provided
    debt?: number;
    currentDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    nextDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    effectiveDate: Date;
    highPostion: boolean;
    positionId: number;
    tierId: number;

    constructor(
        firstname: string,
        lastname: string,
        email: string,
        dob: Date,
        matrialStatus: 'متزوج' | 'أعزب',
        age: number | undefined,
        debt: number | undefined,
        currentDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12',
        nextDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12',
        effectiveDate: Date,
        highPostion: boolean = false, // Default to false if not provided
        positionId: number,
        tierId: number,
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.dob = dob;
        this.matrialStatus = matrialStatus;
        this.age = age;
        this.debt = debt;
        this.currentDegree = currentDegree;
        this.nextDegree = nextDegree;
        this.effectiveDate = effectiveDate;
        this.highPostion = highPostion;
        this.positionId = positionId;
        this.tierId = tierId;
    }
}
