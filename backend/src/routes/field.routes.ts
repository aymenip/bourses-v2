import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { CreateField, UpdateField } from "../field/controller/field.controller";
import { CreateTypedField, UpdateTypedField } from "../field/controller/typedField.controller";
import { CreateSourceableField, UpdateSourceableField } from "../field/controller/sourceableField.controller";



export default (router: express.Router) => {
    router.post("/field/create", verifyToken, CreateField);
    router.post("/field/update", verifyToken, UpdateField);

    // typedFields
    router.post("/field/typed/create", verifyToken, CreateTypedField);
    router.post("/field/typed/update", verifyToken, UpdateTypedField);


    // sourceablFields
    router.post("/field/sourceable/create", verifyToken, CreateSourceableField);
    router.post("/field/sourceable/update", verifyToken, UpdateSourceableField);

}