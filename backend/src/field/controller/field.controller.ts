import express from "express";
import { handleError } from "../../utils/errors";
import { SW } from "../../utils/constants";
import {
  createField,
  updateField,
  deleteField,
} from "../repository/field.repository";
import { CreateFieldDTO } from "../../field/dtos/create.field.dto";
import { UpdateFieldDTO } from "../../field/dtos/update.field.dto";
import { getFormById } from "../../form/repository/form.repository";

export const CreateField = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createFieldDTO: CreateFieldDTO = req.body;
    const userId = req.user.sub;

    const form = await getFormById(createFieldDTO.formId);
    const creator = form.creator;

    if (!createFieldDTO || creator !== userId) {
      return res.status(400).json({ message: SW });
    }

    const createdField = await createField(createFieldDTO);

    return res.status(200).json(createdField);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateField = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateFieldDTO: UpdateFieldDTO = req.body;

    if (!updateFieldDTO) {
      return res.status(400).json({ message: SW });
    }

    const updatedField = await updateField(updateFieldDTO);

    return res.status(200).json(updatedField);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DelteField = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: SW });
    }

    await deleteField(parseInt(id));

    return res.sendStatus(200);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
