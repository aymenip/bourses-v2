import {
    useAuth
} from "./auth/mutations"
import {
    useCreateForm,
    useDeleteForm,
    useCreateTypedField
} from "./forms/mutations";
import {
    useCreateBook
} from "./books/mutations";
import {
    useCreateCertificate,
    useDeleteCertificate
} from "./certificates/mutations"
import {
    useCreateArticle,
    useDeleteArticle,
    useUpdateArticle
} from "./articles/mutations"
import {
    useCreateConference,
    useDeleteConference
} from "./conferences/mutations"

import {
    useCreateSubmission,
    useDeleteSubmission,
    useUpdateSubmission
} from "./submissions/mutations"


export {
    useAuth,
    useCreateForm,
    useDeleteForm,
    useCreateTypedField,
    useCreateBook,
    useCreateCertificate,
    useDeleteCertificate,
    useCreateArticle,
    useDeleteArticle,
    useUpdateArticle,
    useCreateConference,
    useDeleteConference,
    useCreateSubmission,
    useDeleteSubmission,
    useUpdateSubmission
}