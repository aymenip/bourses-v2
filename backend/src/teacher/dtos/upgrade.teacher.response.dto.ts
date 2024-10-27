import { Degree } from "teacher/teacher.enums";

export class UpgradeTeacherResponseDTO {
    id: number;
    months: number;
    targetDuration: number;
    upgrade: boolean;
    upgradeWithDebt: boolean;
    upgradeWithoutDebt: boolean;
    newEffectiveDate: Date;
    currentDegree: Degree;
    nextDegree: Degree;
    highPosition: boolean;
    debt?: Number;
    newDebt?: Number;

    constructor(
        id: number,
        months: number,
        targetDuration: number,
        upgrade: boolean,
        upgradeWithDebt: boolean,
        upgradeWithoutDebt: boolean,
        newEffectiveDate: Date,
        currentDegree: Degree,
        nextDegree: Degree,
        highPosition: boolean,
        debt: number | undefined,
        newDebt?: number | undefined,

    ) {
        this.id = id;
        this.months = months;
        this.targetDuration = targetDuration;
        this.upgrade = upgrade;
        this.upgradeWithDebt = upgradeWithDebt;
        this.upgradeWithoutDebt = upgradeWithoutDebt;
        this.newEffectiveDate = newEffectiveDate;
        this.currentDegree = currentDegree
        this.nextDegree = nextDegree
        this.highPosition = highPosition
        this.debt = debt;
        this.newDebt = newDebt;
    }
}   