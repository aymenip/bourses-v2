import express from "express";
import { CreateFormAccessDTO } from "../dtos/form-access";
import { changeFormAccess } from "../repository/form.access.repositoty";
import { SW } from "../../utils/constants";
import { handleError } from "../../utils/errors";

export const ChangeFormAccess = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createFormAccessDTO: CreateFormAccessDTO = req.body;
    const creator = req.user?.sub;

    if (!creator || !createFormAccessDTO) {
      return res.status(400).json({ message: SW });
    }
    const createdFormAccess: CreateFormAccessDTO = await changeFormAccess(
      createFormAccessDTO
    );

    return res.status(200).json(createdFormAccess);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
