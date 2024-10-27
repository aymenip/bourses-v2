import { createTeacherHistory, teacherLastHistory } from "../teacherHistory/repository/teacherHistory.repository";
import { getTierByName, tier } from "../tier/repository/tier.repositories";
import { CreateTeacherDTO, UpgradeTeacherInputDTO, UpgradeTeacherResponseDTO } from "./dtos";
import { createTeacher, teacher, updateTeacher } from "../teacher/repository/teacher.repositories";
import { duration } from "../duration/repository/duration.repository";
import moment from "moment";
import { Degree } from "./teacher.enums";

// Function to create a teacher from the extracted data
export const createTeacherFromRow = async (createTeacherDTO: CreateTeacherDTO) => {
    return createTeacher(createTeacherDTO);
};


export const getTeacherTier = async (highPosition: boolean, tierId: number): Promise<any> => {
    if (highPosition)
        return (await getTierByName("دنيا")).id;
    return tierId;
}




export const upgradeTeacherDetails = async (upgradeTeacherInputDTO: UpgradeTeacherInputDTO): Promise<UpgradeTeacherResponseDTO> => {

    const { id, southernPrivilege, professionalExperience } = upgradeTeacherInputDTO;
    let upgrade = false;
    let upgradeWithDebt = false;
    let monthsToAdd = undefined;
    let newDebt = undefined;

    // step 1: Getting the teacher information
    const {
        highPostion,
        tierId,
        debt,
    } = await teacher(Number(id));
    // step 1.1: Getting teacher history information
    const {
        currentDegree,
        nextDegree,
        effectiveDate,
    } = await teacherLastHistory(Number(id)) || { currentDegree: 0, nextDegree: 0, effectiveDate: new Date() };


    // note: All periods are in months
    // step 3: Getting duration of the tier assigned to the teacher
    const targetedTier = await getTeacherTier(highPostion, tierId);
    const durationId = (await tier(targetedTier)).durationId
    const targetedDuration = Number((await duration(durationId)).duration); // like: 2.6, 3, 3.6

    // step 4: Calculating the time from the effective date to the new year to make a decision (upgrade / don't upgrade)
    const nextYearFirstDay = moment(moment().endOf("year")).add(1, "days");
    const fromEffectiveDateToNextYear = Number(moment(nextYearFirstDay).diff(effectiveDate, "days") / 30);
    const totalMonths = Number(southernPrivilege) + Number(professionalExperience) + fromEffectiveDateToNextYear;
    const monthsToAddWithoutDebt = totalMonths - targetedDuration; // months to add to the effective date without the debt
    const monthsToAddWithDebt = monthsToAddWithoutDebt + debt; // months to add to the effective date with the debt

    if (monthsToAddWithoutDebt >= 0 || monthsToAddWithDebt >= targetedDuration) {
        upgrade = true;
        if (monthsToAddWithoutDebt < 0) { // with debt, so we should update the new debt    
            monthsToAdd = monthsToAddWithDebt;
            upgradeWithDebt = true;
            newDebt = Math.max(debt - targetedDuration, 0);
        }
        monthsToAdd = monthsToAddWithoutDebt;
        return new UpgradeTeacherResponseDTO(
            id,
            totalMonths,
            targetedDuration,
            upgrade,
            upgradeWithDebt,
            !upgradeWithDebt,
            effectiveDate,
            nextDegree as Degree,
            (parseInt(nextDegree.toString()) + 1).toString() as Degree,
            highPostion,
            debt,
            newDebt,
        )
    } else {
        return new UpgradeTeacherResponseDTO(
            id,
            totalMonths,
            targetedDuration,
            false,
            upgradeWithDebt,
            !upgradeWithDebt,
            effectiveDate,
            currentDegree as Degree,
            nextDegree as Degree,
            highPostion,
            debt,
            newDebt,
        )
    }

}