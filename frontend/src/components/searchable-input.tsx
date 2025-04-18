import { useArticlesForUser, useBooksForUser, useCertificatesForUser, useConferencesForUser, useThesesForUser } from "@/api/queries";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // ShadCN Dialog
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"; // ShadCN Command
import { sourceableFieldsEnum } from "@/enums";
import { useTranslation } from "react-i18next";

interface SearchableInputProps {
    target?: sourceableFieldsEnum;
    value?: string | number; // Add value prop
    onChange: (idWithTarget: string) => void;
    "aria-invalid"?: boolean;
}

export function SearchableInput({ target = "article",
    value,
    onChange,
    "aria-invalid": ariaInvalid }: SearchableInputProps) {
    const [t, i18n] = useTranslation("translation");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [data, setData] = useState<any[]>([]);

    // Fetch data based on the target
    // Fetch data based on the target
    const { data: articles } = useArticlesForUser({
        enabled: target === "article"
    });
    const { data: books } = useBooksForUser({
        enabled: target === "book"
    });
    const { data: certificates } = useCertificatesForUser({
        enabled: target === "certificate"
    });
    const { data: conferences } = useConferencesForUser({
        enabled: target === "conference"
    });
    const { data: theses } = useThesesForUser({
        enabled: target === "thesis"
    });

    useEffect(() => {
        if (value) {
            // Assuming value is in format "123 article" or similar
            const [id, itemType] = String(value).split(' ');
            if (id && itemType) {
                // Find the matching item and set as selected
                const items = data.find(item => item.id === Number(id));
                if (items) {
                    setSelectedItem(items.title);
                }
            }
        }
    }, [value, data]);

    // Set the appropriate data based on the target prop using useEffect
    useEffect(() => {
        switch (target) {
            case 'article':
                setData(articles || []);
                break;
            case 'book':
                setData(books || []);
                break;
            case 'certificate':
                setData(certificates || []);
                break;
            case 'conference':
                setData(conferences || []);
                break;
            case 'thesis':
                setData(theses || []);
                break;
            default:
                setData([]);
                break;
        }
    }, [target, articles, books, certificates, conferences, theses]); // Re-run when target or data changes

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    const handleSelect = (id: number, title: string) => {
        setSelectedItem(title);
        onChange(`${id} ${target}`); // Pass selected id back to the form
        closeDialog();
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                        Select {target}
                    </Button>
                </DialogTrigger>
                <DialogContent dir={i18n.dir()} className="sm:max-w-[500px] p-0">
                    <DialogHeader className="bg-slate-200 dark:bg-zinc-800 p-5 rounded-sm rounded-b-none">
                        <DialogTitle>Select {target}</DialogTitle>
                    </DialogHeader>
                    <div className="p-5">
                        <Command>
                            <CommandInput placeholder={`Search ${target}s...`} />
                            <CommandList className="p-2 max-h-[500px] overflow-y-auto">
                                {data.length === 0 && <CommandEmpty>{t("no-results")}</CommandEmpty>}
                                {data.map((item) => (
                                    <CommandItem className="transition-all cursor-pointer bg-slate-100 dark:bg-zinc-900  dark:hover:outline-zinc-800 hover:outline-300 min-h-[60px] my-3 truncate" key={item.id} onSelect={() => handleSelect(item.id, item.title)}>
                                        {item.title}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </div>
                    <DialogFooter className="p-5">
                        <Button variant="outline" onClick={closeDialog}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Display selected document */}
            {<div>{t("selected")} {t(target)}: {selectedItem}</div>}
        </div>
    );
}
