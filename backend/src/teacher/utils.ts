import { CreateTeacherDTO } from "./dtos";
import { createTeacher } from "../teacher/repository/teacher.repositories";

// Function to create a teacher from the extracted data
export const createTeacherFromRow = async (createTeacherDTO: CreateTeacherDTO) => {
    return createTeacher(createTeacherDTO);
};
