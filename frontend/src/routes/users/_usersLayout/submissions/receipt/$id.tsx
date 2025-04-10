import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { cairoFont } from "@/fonts/cairo-base64"; // adjust path if needed


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

  if (isLoading || isPending) return <Loader />;

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    // Register custom font
    pdf.addFileToVFS("Cairo-Regular.ttf", cairoFont);
    pdf.addFont("Cairo-Regular.ttf", "Cairo", "normal");
    pdf.setFont("Cairo");

    // Optional: reverse layout for RTL
    pdf.setLanguage("ar");
    pdf.setFontSize(12);

    // Draw the image
    const pageWidth = pdf.internal.pageSize.getWidth();
    const ratio = canvas.height / canvas.width;
    const imgHeight = pageWidth * ratio;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save(`${formTitle ?? "receipt"}-${id}.pdf`);
  };


  return (
    <div className="content-container">
      <TopBar page_name="submissionReceipt" />
      <div className="grid  place-content-center">
        <div
          className="mt-5 mx-auto shadow-sm border w-fit min-w-[500px]"
          ref={receiptRef}
        >
          <div className="px-2 py-4 bg-slate-100 dark:bg-zinc-900">
            <h3>{t("registration-receipt")}</h3>
            <Muted>{formTitle}</Muted>
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
