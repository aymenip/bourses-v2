import express from "express";

import { handleError } from "../../utils/errors";
import {
  createConference,
  deleteConference,
  getAllConferences,
  getAllConferencesForUser,
  getConferenceById,
  updateConference,
} from "../repository/conference.repository";
import { CreateConferenceDTO, UpdateConferenceDTO } from "../dtos";

export const CreateConference = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createConferenceDTO: CreateConferenceDTO = req.body;
    
    const userId = req.user?.sub;
    if (!createConferenceDTO) {
      return res.sendStatus(400);
    }

    const createdConference = await createConference(createConferenceDTO, userId);

    return res.status(200).json(createdConference);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateConference = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateConferenceDTO: UpdateConferenceDTO = req.body;

    const userId = req.user?.sub;

    if (!updateConferenceDTO) return res.sendStatus(400);

    const book = await getConferenceById(updateConferenceDTO.id);

    if (!book) return res.sendStatus(400);

    if (book.userId !== userId) return res.sendStatus(404);

    const updatedConference = await updateConference(updateConferenceDTO);

    return res.status(200).json(updatedConference);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllConferencesForUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;

    const conferences = await getAllConferencesForUser(userId);

    return res.status(200).json(conferences);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllConferences = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const conferences = await getAllConferences();

    return res.status(200).json(conferences);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteConference = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;
    
    const book = await getConferenceById(Number(id));
    if (book.userId !== userId)
      return res.status(401).json({ message: "Unauthorized" });
    await deleteConference(Number(id));
    return res.status(204).json({ message: "Conference deleted" });
  } catch (error) {
    console.error("GetConferenceById Error:", error);
    return res.status(500).json({ message: "Failed to fetch conferences" });
  }
};
