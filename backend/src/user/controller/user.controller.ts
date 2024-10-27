import express from "express";
import { CreateUserDTO, LoginUserDTO, LoginUserOutputDTO, UpdateUserDTO, UserDTO } from "user/dtos";
import { createUser, getUserByEmail, getUserById, updateMe } from "../repository/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { handleError } from "../../utils/errors";
import dotenv from "dotenv";

dotenv.config()

export const Me = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const id = req.user.sub;
        const me = await getUserById(Number(id));
        return res.status(200).json(me);
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}

export const UpdateMe = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const id = req.user.sub;
        const updateUserDTO: UpdateUserDTO = req.body;
        const me = await updateMe(updateUserDTO, id);
        return res.status(200).json(me);
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}


export const Login = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const loginUserDto: LoginUserDTO = req.body;

        if (!loginUserDto) {
            return res.sendStatus(400);
        }

        let user = await getUserByEmail(loginUserDto.email);

        if (!user) {
            return res.sendStatus(400);
        }

        if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
            return res.sendStatus(400);
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.roleId,
            name: user.name,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });

        const response: LoginUserOutputDTO = { token }; // Create the response object

        return res.status(200).json(response); // Send response as JSON
    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}


export const Register = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const createUserDto: CreateUserDTO = req.body;
        if (!createUserDto) {
            return res.sendStatus(400)
        }

        const user = await getUserByEmail(createUserDto.email);

        if (user) {
            return res.sendStatus(400)
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = await createUser({ ...createUserDto, password: hashedPassword });

        const payload = {
            sub: createdUser.id,
            email: createdUser.email,
            role: createdUser.roleId,
            name: createdUser.name,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY);

        return res.status(200).json({ token: token });

    } catch (error) {
        handleError(() => console.log(error));
        return res.sendStatus(400);
    }
}