import express from "express";

import { handleError } from "../../utils/errors";
import {
  createThesis,
  deleteThesis,
  getAllTheses,
  getAllThesesForUser,
  getThesisById,
  updateThesis,
} from "../repository/thesis.repository";
import { CreateThesisDTO, UpdateThesisDTO } from "../dtos";

export const CreateThesis = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createThesisDTO: CreateThesisDTO = req.body;
    const userId = req.user?.sub;
    if (!createThesisDTO) {
      return res.sendStatus(400);
    }

    const createdThesis = await createThesis(createThesisDTO, userId);

    return res.status(200).json(createdThesis);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateThesis = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateThesisDTO: UpdateThesisDTO = req.body;

    const userId = req.user?.sub;

    if (!updateThesisDTO) return res.sendStatus(400);

    const thesis = await getThesisById(updateThesisDTO.id);

    if (!thesis) return res.sendStatus(400);

    if (thesis.userId !== userId) return res.sendStatus(404);

    const updatedThesis = await updateThesis(updateThesisDTO);

    return res.status(200).json(updatedThesis);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllThesesForUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;

    const theses = await getAllThesesForUser(userId);

    return res.status(200).json(theses);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetThesisById = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;
    const { id } = req.params;
    const isAdmin = req.user.isAdmin;
    const thesis = await getThesisById(parseInt(id));
    if (thesis.userId !== userId && !isAdmin) return res.status(401);
    return res.status(200).json(thesis);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};


export const GetAllTheses = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const theses = await getAllTheses();

    return res.status(200).json(theses);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteThesis = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;
    const thesis = await getThesisById(Number(id));
    if (thesis.userId !== userId)
      return res.status(401).json({ message: "Unauthorized" });
    await deleteThesis(Number(id));
    return res.status(204).json({ message: "Thesis deleted" });
  } catch (error) {
    console.error("GetThesisById Error:", error);
    return res.status(500).json({ message: "Failed to fetch thesis" });
  }
};
