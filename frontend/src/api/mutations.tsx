import {
    useAuth,
    useUserUpdate
} from "./auth/mutations"
import {
    useCreateForm,
    useDeleteForm,
    useCreateTypedField
} from "./forms/mutations";
import {
    useCreateBook,
    useUpdateBook,
    useDeleteBook,
} from "./books/mutations";
import {
    useCreateCertificate,
    useUpdateCertificate,
    useDeleteCertificate
} from "./certificates/mutations"
import {
    useCreateArticle,
    useDeleteArticle,
    useUpdateArticle
} from "./articles/mutations"
import {
    useCreateConference,
    useUpdateConference,
    useDeleteConference
} from "./conferences/mutations"

import {
    useCreateSubmission,
    useDeleteSubmission,
    useUpdateSubmission
} from "./submissions/mutations"


export {
    useAuth,
    useUserUpdate,
    useCreateForm,
    useDeleteForm,
    useCreateTypedField,
    useCreateBook,
    useUpdateBook,
    useDeleteBook,
    useCreateCertificate,
    useUpdateCertificate,
    useDeleteCertificate,
    useCreateArticle,
    useDeleteArticle,
    useUpdateArticle,
    useCreateConference,
    useUpdateConference,
    useDeleteConference,
    useCreateSubmission,
    useDeleteSubmission,
    useUpdateSubmission
}