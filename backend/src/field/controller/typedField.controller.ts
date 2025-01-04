import express from "express";
import { handleError } from "../../utils/errors";
import { SW } from "../../utils/constants";
import { CreateTypedFieldDTO } from "../../field/dtos/typedField";
import {
    createTypedField,
    updateTypedField,
} from "../../field/repository/typedField.repository";
import { UpdateTypedFieldDTO } from "../../field/dtos/typedField/update.typedField.dto";

export const CreateTypedField = async (
    req: express.Request,
    res: express.Response
): Promise<any> => {
    try {
        const createTypedFieldDTO: CreateTypedFieldDTO = req.body;
        if (!createTypedFieldDTO) {
            return res.status(400).json({ message: SW });
        }

        const createdTypedField = await createTypedField(createTypedFieldDTO);

        return res.status(200).json(createdTypedField);
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
};

export const UpdateTypedField = async (
    req: express.Request,
    res: express.Response
): Promise<any> => {
    try {
        const updateTypedFieldDTO: UpdateTypedFieldDTO = req.body;

        if (!updateTypedFieldDTO) {
            return res.status(400).json({ message: SW });
        }

        const updatedTypedField = await updateTypedField(updateTypedFieldDTO);

        return res.status(200).json(updatedTypedField);
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
};
