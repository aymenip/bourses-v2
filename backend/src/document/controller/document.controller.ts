import express from "express";
import {
  createDocument,
  getDocumentById,
  deleteDocument,
} from "../repository/document.repository";
import { CreateDocumentDTO } from "../dtos";

export const CreateDocument = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const userId = req.user?.sub; // Get user ID from JWT
    const type = req.body.type; // Get document type
    const filePath = `/uploads/${req.file.filename}`; // Store file path

    const createDocumentDTO = new CreateDocumentDTO(type, filePath, userId);
    const createdDocument = await createDocument(createDocumentDTO);

    return res.status(201).json(createdDocument);
  } catch (error) {
    console.error("CreateDocument Error:", error);
    return res.status(500).json({ message: "Failed to create document" });
  }
};

export const GetDocumentById = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const document = await getDocumentById(Number(id));

    if (!document)
      return res.status(404).json({ message: "Document not found" });

    return res.status(200).json(document);
  } catch (error) {
    console.error("GetDocumentById Error:", error);
    return res.status(500).json({ message: "Failed to fetch document" });
  }
};

export const DeleteDocument = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    await deleteDocument(Number(id));

    return res.sendStatus(204);
  } catch (error) {
    console.error("DeleteDocument Error:", error);
    return res.status(500).json({ message: "Failed to delete document" });
  }
};
