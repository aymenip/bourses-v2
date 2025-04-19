import { Download, LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useDocument } from "@/api/documents/queries";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const DocumentDownloadButton = ({ documentId }: { documentId: number }) => {
    const [fetchDocument, setFetchDocument] = useState(false);
    const [t] = useTranslation("translation")
    const { data: document, refetch, isPending } = useDocument(documentId, {
        enabled: false, // Disable auto-fetching
    });

    const handleDownloadClick = async () => {
        setFetchDocument(true);
        await refetch(); // Fetch document only when clicked
    };
    return (
        <Button variant="outline" onClick={handleDownloadClick}>
            {fetchDocument && document?.path ? (
                <a href={`${document.path}`} target="_blank">
                    {isPending ? <LoaderIcon className="animate-spin" /> : <Download />}
                </a>
            ) : (
                t("download")
            )}
        </Button>
    );
};