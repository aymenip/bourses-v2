
import html2pdf from 'html2pdf.js';
import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/global/topBar";
import { Loader } from "@/components/global/loader";
import { useTranslation } from "react-i18next";
import { useSubmission } from "@/api/submissions/queries";
import { Muted } from "@/components/ui/typography";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
  "/users/_usersLayout/submissions/receipt/$id"
)({
  component: ReceiptPage,
});

function ReceiptPage() {
  const { id } = Route.useParams();
  const { formTitle } = Route.useSearch();
  const { data: submission, isLoading, isPending } = useSubmission(
    parseInt(id)
  );
  const [t] = useTranslation("translation");
  const receiptRef = useRef<HTMLDivElement>(null);
  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    if (!element) return;
    const options = {
      marging: 2,
      filename: `${formTitle}-${id}.pdf`,
      image: {
        type: "jpeg",
        quality: 1
      },
      html2canvas: {
        scale: 2
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    }

    document.documentElement.classList.remove("dark");

    setTimeout(() => {
      html2pdf()
        .from(element)
        .set(options)
        .save()
        .then(() => {

          document.documentElement.classList.add("dark");
        });
    }, 100);
  };
  if (isLoading || isPending) return <Loader />;


  return (
    <div className="content-container">
      <TopBar page_name="submissionReceipt" />
      <div className="grid  place-content-center">
        <div
          className="mt-5 mx-auto shadow-sm border w-fit min-w-[500px] print:!bg-white print:!text-black"
          ref={receiptRef}
        >
          <div className="px-2 py-4 bg-slate-100 dark:bg-zinc-900 print:!bg-white print:!text-black">
            <h3>{t("registration-receipt")}</h3>
            <Muted className="print:!text-black">{formTitle}</Muted>
          </div>
          <div className="p-2">
            <Table>
              <TableBody>
                {Object.entries(
                  JSON.parse(submission?.data as unknown as string)
                ).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{String(value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption className="mb-3">
                {format(
                  submission?.createdAt || 0,
                  "yyyy-MM-dd | hh:mm:ss a"
                )}
              </TableCaption>
            </Table>
          </div>
        </div>
        <div className="mt-2">
          <Button
            size={"sm"}
            onClick={handleDownloadPDF}
          >
            {t("download-receipt")}
          </Button>
        </div>
      </div>
    </div>
  );
}
