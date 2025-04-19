import { ReactNode } from "@tanstack/react-router";

function Detail({ label, value }: { label: string; value: string | number | ReactNode }) {
    const isEmpty = value === "—" || value === "N/A" || value === "" || value === null;

    return (
        <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p
                className={`text-base font-medium ${isEmpty ? "text-zinc-400 italic" : "text-foreground"
                    } break-words`}
            >
                {value || "—"}
            </p>
        </div>
    );
}

export default Detail;