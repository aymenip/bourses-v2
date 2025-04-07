import { TCreateForm, TForm } from "@/types";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";
import { TCreateFormBlock, TFormBlock, TFullForm, TSourceableField, TTypedField } from "@/types/forms";
import { TCreateFormAccess } from "@/types/form-acess";

export async function forms(): Promise<TForm[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TForm[]>("form/all", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}

export async function form(id: number): Promise<TForm> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TForm>(`form/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}

export async function createAForm(createForm: TCreateForm): Promise<TForm> {

    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TForm>("form/create", createForm, {
        headers: {
            Authorization: token,
        },
    })

    return response.data;
}

export async function deleteForm(id: number): Promise<void> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.delete<void>(`form/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}

export async function createAFormBlock(createFormBlock: TCreateFormBlock): Promise<TFormBlock> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TFormBlock>("field/create", createFormBlock, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}



export async function createTypedField(typedField: TTypedField): Promise<TTypedField> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TTypedField>(`field/typed/create`, { ...typedField, fieldId: typedField.blockId }, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}
export async function createSourceableField(sourceableField: TSourceableField): Promise<TSourceableField> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TSourceableField>(`field/sourceable/create`, { ...sourceableField, fieldId: sourceableField.blockId }, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}

export async function changeFormAccess(createFormAccess: TCreateFormAccess): Promise<TCreateFormAccess> {

    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TCreateFormAccess>("form/access/change", createFormAccess, {
        headers: {
            Authorization: token,
        },
    })
    return response.data;
}


export async function getFormsForUser(positionId: number): Promise<TForm[]> {
    const token = authenticationContext().token;
    
    if (!token) {
        throw new Error();
    }

    const response = await axiosInstance.get<TForm[]>(`form/user/${positionId}`, {
        headers: {
            Authorization: token,
        },
    });

    return response.data || [];
}


export async function getFullForm(id: number): Promise<TFullForm> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TFullForm>(`form/full/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}