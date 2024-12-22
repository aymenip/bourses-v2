import express from "express";
import xlsx from "xlsx";
import fs from 'fs';
import moment from "moment";
import { CreateTeacherDTO, UpdateTeacherDTO } from "../dtos";
import { allTeachers, createTeacher, deleteTeacher, teacher, updateTeacher } from "../repository/teacher.repositories";
import { handleError } from "../../utils/errors";
import { createTeacherFromRow } from "../utils";
import { Degree, MatrialStatus } from "../teacher.enums";
import { CreateUserDTO, UpdateUserDTO } from "user/dtos";

export const CreateTeacher = async (req: express.Request, res: express.Response): Promise<CreateTeacherDTO | any> => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            dob,
            matrialStatus,
            highPostion,
            positionId,
            roleId,
        } = req.body;
        // Create an instance of UserDTO
        const createTeacherDTO = new CreateTeacherDTO(
            highPostion,
            positionId,
        );
        const createUserDTO = new CreateUserDTO(
            firstname,
            lastname,
            new Date(dob),
            matrialStatus,
            email,
            password,
            roleId
        )
        const resutl = await createTeacher(createTeacherDTO, createUserDTO);
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
            userId,
            teacherId,
            firstname,
            lastname,
            email,
            dob,
            password,
            matrialStatus,
            highPostion,
            positionId,
        } = req.body;
        // Create an instance of UserDTO
        const updateTeacherDTO = new UpdateTeacherDTO(
            teacherId,
            Boolean(highPostion),
            Number(positionId),
        );

        const updateUserDto = new UpdateUserDTO(
            userId,
            firstname,
            lastname,
            email,
            dob,
            matrialStatus,
        );

        const result = await updateTeacher(updateTeacherDTO, updateUserDto);
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
                Boolean(highPosition),
                Number(positionId),
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
        const teachers = await allTeachers();

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

