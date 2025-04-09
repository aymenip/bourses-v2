import express from "express";

import { handleError } from "../../utils/errors";
import {
  createSubmission,
  deleteSubmission,
  getAllSubmissions,
  getAllSubmissionsForUser,
  getSubmissionById,
  updateSubmission,
} from "../repository/submission.repository";
import { CreateSubmissionDTO, UpdateSubmissionDTO } from "../dtos";

export const CreateSubmission = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    let createSubmissionDTO: CreateSubmissionDTO = req.body;

    const userId = req.user?.sub;
    createSubmissionDTO.userId = userId;
    createSubmissionDTO = {
      ...createSubmissionDTO,
      data: JSON.stringify(createSubmissionDTO.data),
    };

    if (!createSubmissionDTO) {
      return res.sendStatus(400);
    }

    const createdSubmission = await createSubmission(createSubmissionDTO);

    return res.status(200).json(createdSubmission);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateSubmission = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateSubmissionDTO: UpdateSubmissionDTO = req.body;

    const userId = req.user?.sub;

    if (!updateSubmissionDTO) return res.sendStatus(400);

    const submission = await getSubmissionById(updateSubmissionDTO.id);

    if (!submission) return res.sendStatus(400);

    if (submission.userId !== userId) return res.sendStatus(404);

    const updatedSubmission = await updateSubmission(updateSubmissionDTO);

    return res.status(200).json(updatedSubmission);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllSubmissionsForUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;

    const submissions = await getAllSubmissionsForUser(userId);

    return res.status(200).json(submissions);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};
export const GetSubmissionById = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;
    const id = parseInt(req.params.id);
    if (!userId) {
      return res.sendStatus(400);
    }

    const submission = await getSubmissionById(id);
    if (submission.userId !== userId) {
      return res.sendStatus(401);
    }
    return res.status(200).json(submission);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllSubmissions = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const submissions = await getAllSubmissions();

    return res.status(200).json(submissions);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteSubmission = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;

    const submission = await getSubmissionById(Number(id));
    if (submission.userId !== userId)
      return res.status(401).json({ message: "Unauthorized" });
    await deleteSubmission(Number(id));
    return res.status(204).json({ message: "FormSubmission deleted" });
  } catch (error) {
    console.error("GetSubmissionById Error:", error);
    return res.status(500).json({ message: "Failed to fetch submissions" });
  }
};
