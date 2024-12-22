import express from "express";
import { createRole, getRoleByCode } from "../repository/role.repository";
import { handleError } from "../../utils/errors";
import dotenv from "dotenv";
import { CreateRoleDTO } from "role/dtos";

dotenv.config()


export const CreateRole = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const createRoleDto: CreateRoleDTO = req.body;

        if (!createRoleDto) {
            return res.sendStatus(400)
        }

        const role = await getRoleByCode(createRoleDto.code);

        if (role) {
            return res.sendStatus(400)
        }


        const createdRole = await createRole(createRoleDto);


        return res.status(200).json(createdRole);

    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}