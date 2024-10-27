import express from "express";
import xlsx from "xlsx";
import fs from 'fs';
import moment from "moment";
import { CreateTeacherDTO, UpdateTeacherDTO, UpgradeTeacherInputDTO } from "../dtos";
import { allTeachers, allTeachersWithDetails, createTeacher, deleteTeacher, teacher, updateTeacher } from "../repository/teacher.repositories";
import { handleError } from "../../utils/errors";
import { createTeacherFromRow, getTeacherTier, upgradeTeacherDetails } from "../utils";
import { createTeacherHistory, teacherLastHistory } from "../../teacherHistory/repository/teacherHistory.repository";
import { Degree, MatrialStatus } from "../teacher.enums";
import { tier } from "../../tier/repository/tier.repositories";
import { duration } from "../../duration/repository/duration.repository";

export const CreateTeacher = async (req: express.Request, res: express.Response): Promise<CreateTeacherDTO | any> => {
    try {
        const {
            firstname,
            lastname,
            email,
            dob,
            matrialStatus,
            age,
            debt,
            currentDegree,
            nextDegree,
            effectiveDate,
            highPostion,
            positionId,
            tierId,
        } = req.body;
        // Create an instance of UserDTO
        const createTeacherDTO = new CreateTeacherDTO(
            firstname,
            lastname,
            email,
            new Date(dob), // Ensure dob is a Date object
            matrialStatus,
            age,
            debt,
            currentDegree,
            nextDegree,
            new Date(effectiveDate), // Ensure effectiveDate is a Date object
            highPostion,
            positionId,
            tierId,
        );
        const resutl = await createTeacher(createTeacherDTO);
        return res.status(200).json(resutl)
    } catch (error) {
        handleError((msg) => console.log(msg), 'An error occurred');
        return res.sendStatus(400);
    }
}

export const AllTeachers = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const resutl = await allTeachers();
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const Teacher = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { id } = req.params;
        const resutl = await teacher(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const UpdateTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const {
            id,
            firstname,
            lastname,
            email,
            dob,
            matrialStatus,
            age,
            debt,
            currentDegree,
            nextDegree,
            effectiveDate,
            highPostion,
            positionId,
            tierId,
        } = req.body;
        // Create an instance of UserDTO
        const updateTeacherDTO = new UpdateTeacherDTO(
            id,
            firstname,
            lastname,
            email,
            new Date(dob), // Ensure dob is a Date object
            matrialStatus,
            age,
            debt,
            currentDegree,
            nextDegree,
            new Date(effectiveDate), // Ensure effectiveDate is a Date object
            highPostion,
            positionId,
            tierId,
        );
        const result = await updateTeacher(updateTeacherDTO);
        return res.status(200).json(result)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const DeleteTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
    const { id } = req.params;
    try {
        const result = await deleteTeacher(Number(id));
        return res.status(200).json(result)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}


// import feature
export const ImportTeachersXlsx = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const filePath = req.file.path;
        const {
            highPosition,
            tierId,
            positionId,
            worksheetIndex,
        } = req.query;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[Number(worksheetIndex) || 0]; // Assuming you want to read the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const csvData = xlsx.utils.sheet_to_csv(worksheet).split("\n").splice(3);
        for (const _ of csvData) {
            const row = _.split(",");
            const createTeacherDto = new CreateTeacherDTO(
                row[2],
                row[3],
                row[28] || null,
                new Date(row[5]) || null,
                row[6] as MatrialStatus || null,
                Number(row[7]),
                undefined,
                row[9] as Degree,
                row[10] as Degree,
                new Date(row[11]),
                Boolean(highPosition),
                Number(positionId),
                Number(tierId),
            );
            try {
                await createTeacherFromRow(createTeacherDto);
            } catch (error) {
                continue;
            }
        }
        // Clean up the uploaded file
        fs.unlinkSync(filePath); // Remove the temporary file

        return res.status(200).json({
            msg: `${csvData.length} field(s) was added.`
        });
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}


// Export teachers
export const ExportTeachersToXlsx = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const teachers = await allTeachersWithDetails();

        if (!teachers || teachers.length === 0) {
            return res.status(404).send("No teachers found.");
        }


        const worksheet = xlsx.utils.json_to_sheet(teachers);


        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Teachers");


        const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        const day = moment().date().toString()
        const month = moment().month().toString();
        const filename = `teachers-${day}-${month}.xlsx`;
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');


        res.status(200).send(excelBuffer);
    } catch (error) {

        console.error("Error exporting teachers:", error);
        res.status(500).send("Error exporting teachers.");
    }
}


// upgrade teacher 
export const UpgradeTeacher = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        // step 1: Getting required data from the request body
        const {
            id,
            southernPrivilege, // إمتياز الجنوب
            professionalExperience, // الخبرة المهنية
        } = req.body;

        const upgradeTeacherDetailsInput = new UpgradeTeacherInputDTO(Number(id), Number(southernPrivilege), Number(professionalExperience))

        const details = await upgradeTeacherDetails(upgradeTeacherDetailsInput);

        if (details.upgrade) {

            if (details.upgradeWithDebt) {
                await updateTeacher({ id: id, debt: Number(details.newDebt) });
            }

            await createTeacherHistory({
                teacherId: id,
                effectiveDate: details.newEffectiveDate,
                highPostion: details.highPosition,
                currentDegree: details.currentDegree,
                nextDegree: details.nextDegree
            })


            const decision = "Upgrade the teacher.";
            const reason = "Teacher upgraded because all conditions are satisfied.";
            return res.status(200).json({ ...details, decision, reason })
        }
        const decision = "Don't upgrade the teacher, conditions are not satisfied.";
        const reason = "Nothing to add beacause months to add are less then targeted tier duration.";
        return res.status(200).json({ ...details, decision, reason })


    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}