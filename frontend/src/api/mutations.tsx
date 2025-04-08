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
    useDeleteArticle
} from "./articles/mutations"
import {
    useCreateConference,
    useDeleteConference
} from "./conferences/mutations"

import {
    useCreateSubmission,
    useDeleteSubmission
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
    useCreateConference,
    useDeleteConference,
    useCreateSubmission,
    useDeleteSubmission
}