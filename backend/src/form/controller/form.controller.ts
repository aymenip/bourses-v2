import express from "express";
import { handleError } from "../../utils/errors";
import dotenv from "dotenv";
import { FAE, SW, UA } from "../../utils/constants";
import { CreateFormDTO, UpdateFormDTO } from "form/dtos";
import {
  createForm,
  getFormById,
  getFormByTitle,
  updateForm,
  
} from "../repository/form.repository";

dotenv.config();

export const CreateForm = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createFormDTO: CreateFormDTO = req.body;
    const creator = req.user?.sub;

    if (!creator || !createFormDTO) {
      return res.status(400).json({ message: SW });
    }

    const form = await getFormByTitle(createFormDTO.title, creator);

    if (form) {
      return res.status(400).json({ message: FAE });
    }

    const createdForm = await createForm(createFormDTO, creator);

    return res.status(200).json(createdForm);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateForm = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateFormDTO: UpdateFormDTO = req.body;
    const userId = req.user?.sub;

    if (!userId || !updateFormDTO) {
      return res.status(400).json({ message: SW });
    }

    const targetedForm = await getFormById(updateFormDTO.id);

    if (userId !== targetedForm.creator) {
      return res.status(400).json({ message: UA });
    }

    const updatedForm = await updateForm(updateFormDTO, userId);

    return res.status(200).json(updatedForm);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
