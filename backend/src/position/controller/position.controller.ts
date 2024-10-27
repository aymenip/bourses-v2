import express from "express";
import { CreatePositionDTO, UpdatePositionDTO } from "../dtos";
import { handleError } from "../../utils/errors";
import { allPositions, createPosition, deletePosition, position, updatePosition } from "../repository/position.repositories";

export const CreatePosition = async (req: express.Request, res: express.Response): Promise<CreatePositionDTO | any> => {
    try {
        const {
            name
        } = req.body;
        // Create an instance of UserDTO
        const createPositionDTO = new CreatePositionDTO(name);
        const resutl = await createPosition(createPositionDTO);
        return res.status(200).json(resutl)
    } catch (error) {
        handleError((msg) => console.log(msg), 'An error occurred');
        return res.sendStatus(400);
    }
}

export const AllPositions = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const resutl = await allPositions();
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const Position = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { id } = req.params;
        const resutl = await position(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const UpdatePosition = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const {
            id,
            name,
        } = req.body;
        // Create an instance of UserDTO
        const updatePositionDTO = new UpdatePositionDTO(
            id,
            name,
        );
        const resutl = await updatePosition(updatePositionDTO);
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const DeletePosition = async (req: express.Request, res: express.Response): Promise<any> => {
    const { id } = req.params;
    try {
        const resutl = await deletePosition(Number(id));
        return res.status(200).json(resutl)
    } catch (error) {

        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}
