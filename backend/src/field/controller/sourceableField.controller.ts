import express from "express";
import { handleError } from "../../utils/errors";
import { SW } from "../../utils/constants";
import { CreateSourceabledFieldDTO, UpdateSourceabledFieldDTO } from "../../field/dtos/sourceableField";
import { createSourceableField, updateSourceableField } from "../../field/repository/sourceableField.repository";





export const CreateSourceableField = async (req: express.Request, res: express.Response): Promise<any> => {
    try {

        const createSourceableFieldDTO: CreateSourceabledFieldDTO = req.body;

        
        if (!createSourceableFieldDTO) {
            return res.status(400).json({ "message": SW });
        }


        const createdSourceableField = await createSourceableField(createSourceableFieldDTO);

        return res.status(200).json(createdSourceableField);

    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}



export const UpdateSourceableField = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const updateSourceableFieldDTO: UpdateSourceabledFieldDTO = req.body;

        if (!updateSourceableFieldDTO) {
            return res.status(400).json({ "message": SW });
        }


        const updatedSourceabledField = await updateSourceableField(updateSourceableFieldDTO);

        return res.status(200).json(updatedSourceabledField);

    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}
