import { db } from "../../db/setup";
import { documents, certificates } from "../../db/schema";
import {
  CreateCertificateDTO,
  CertificateDTO,
  UpdateCertificateDTO,
} from "../dtos";
import { eq } from "drizzle-orm";
import { deleteDocument } from "../../utils/uploads";

export const createCertificate = async (
  createCertificateDTO: CreateCertificateDTO,
  userId: number
): Promise<CreateCertificateDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .insert(certificates)
      .values({ ...createCertificateDTO, userId })
      .execute();
    const book = await getCertificateById(result[0].insertId);
    return book;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Certificate"); // Handle errors appropriately
  }
};

export const updateCertificate = async (
  updateCertificateDTO: UpdateCertificateDTO
): Promise<CreateCertificateDTO> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .update(certificates)
      .set(updateCertificateDTO)
      .where(eq(certificates.id, updateCertificateDTO.id))
      .execute();
    const thesis = await getCertificateById(result[0].insertId);
    return thesis;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Certificate"); // Handle errors appropriately
  }
};

export const getAllCertificatesForUser = async (
  userId: number
): Promise<CertificateDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(certificates)
      .where(eq(certificates.userId, userId))
      .execute();
    const _certificates: CertificateDTO[] = result;
    // Return the first role or null if none found
    return result || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getAllCertificates = async (): Promise<CertificateDTO[]> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance.select().from(certificates);

    // Return the first role or null if none found
    return result || [];
  } catch (error) {
    return null; // Handle errors appropriately
  }
};

export const getCertificateById = async (
  id: number
): Promise<CertificateDTO | null> => {
  try {
    const dbInstance = await db;
    const result = await dbInstance
      .select()
      .from(certificates)
      .where(eq(certificates.id, id))
      .execute();
    // Return the first user or null if none found
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw new Error("Failed to get Certificate"); // Handle errors appropriately
  }
};
export const deleteCertificate = async (id: number): Promise<void> => {
  try {
    const dbInstance = await db;
    const deletedCertificate = await getCertificateById(id);
    await dbInstance
      .delete(certificates)
      .where(eq(certificates.id, id))
      .execute();

    try {
      // delete the document from the documents table
      const document = await dbInstance
        .select({
          path: documents.path,
        })
        .from(documents)
        .where(eq(documents.id, deletedCertificate.documentId))
        .limit(1)
        .execute();

      await dbInstance
        .delete(documents)
        .where(eq(documents.id, deletedCertificate.documentId))
        .then(async () => {
          deleteDocument(document[0].path);
        });
    } catch (error) {
      throw new Error("Failed to delete Certificate"); // Handle errors appropriately
    }

    return;
  } catch (error) {
    throw new Error("Failed to delete Certificate"); // Handle errors appropriately
  }
};
