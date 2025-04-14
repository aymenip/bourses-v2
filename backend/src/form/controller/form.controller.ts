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
  getFormsById,
  deleteForm,
  getFormsForUser,
  getFullFormById,
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

export const AllForms = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const creator = req.user?.sub;

    if (!creator) {
      return res.status(400).json({ message: SW });
    }

    const forms = await getFormsById(creator);

    return res.status(200).json(forms);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetForm = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const creator = req.user?.sub;
    const formId = parseInt(req.params.id);
    if (!creator) {
      return res.status(400).json({ message: SW });
    }

    const form = await getFormById(formId);

    return res.status(200).json(form);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteForm = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const creator = req.user?.sub;
    const formId = parseInt(req.params.id);
    if (!creator) {
      return res.status(400).json({ message: SW });
    }

    const form = await getFormById(formId);

    if (form.creator !== creator) throw new Error();
    await deleteForm(formId);

    return res.status(200).json(form);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetFormsForUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const positionId = parseInt(req.params.positionId);

    const forms = await getFormsForUser(positionId);

    return res.status(200).json(forms);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetFullFormById = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const formId = parseInt(req.params.id);

    const fullForm = await getFullFormById(formId);
    return res.status(200).json(fullForm);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
