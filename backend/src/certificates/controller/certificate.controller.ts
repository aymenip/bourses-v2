import express from "express";

import { handleError } from "../../utils/errors";
import {
  createCertificate,
  deleteCertificate,
  getAllCertificates,
  getAllCertificatesForUser,
  getCertificateById,
  updateCertificate,
} from "../repository/certificate.repository";
import { CreateCertificateDTO, UpdateCertificateDTO } from "../dtos";

export const CreateCertificate = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const createCertificateDTO: CreateCertificateDTO = req.body;
    
    const userId = req.user?.sub;
    if (!createCertificateDTO) {
      return res.sendStatus(400);
    }

    const createdCertificate = await createCertificate(createCertificateDTO, userId);

    return res.status(200).json(createdCertificate);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const UpdateCertificate = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const updateCertificateDTO: UpdateCertificateDTO = req.body;

    const userId = req.user?.sub;

    if (!updateCertificateDTO) return res.sendStatus(400);

    const book = await getCertificateById(updateCertificateDTO.id);

    if (!book) return res.sendStatus(400);

    if (book.userId !== userId) return res.sendStatus(404);

    const updatedCertificate = await updateCertificate(updateCertificateDTO);

    return res.status(200).json(updatedCertificate);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllCertificatesForUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const userId = req.user?.sub;

    const certificates = await getAllCertificatesForUser(userId);

    return res.status(200).json(certificates);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const GetAllCertificates = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const certificates = await getAllCertificates();

    return res.status(200).json(certificates);
  } catch (error) {
    handleError(() => console.log(error));
    return res.sendStatus(400);
  }
};

export const DeleteCertificate = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user.sub;
    
    const book = await getCertificateById(Number(id));
    if (book.userId !== userId)
      return res.status(401).json({ message: "Unauthorized" });
    await deleteCertificate(Number(id));
    return res.status(204).json({ message: "Certificate deleted" });
  } catch (error) {
    console.error("GetCertificateById Error:", error);
    return res.status(500).json({ message: "Failed to fetch certificates" });
  }
};
