import { useArticlesForUser, useBooksForUser, useCertificatesForUser, useConferencesForUser, useThesesForUser } from "@/api/queries";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // ShadCN Dialog
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"; // ShadCN Command

interface SearchableInputProps {
    target?: "article" | "book" | "certificate" | "thesis" | "conference";
    mutipleSelect?: boolean;
    onChange: (id: number) => void; // Callback for when an item is selected
}

export function SearchableInput({ target = "article", mutipleSelect = false, onChange }: SearchableInputProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
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

    const handleSelect = (id: number) => {
        setSelectedId(id);
        onChange(id); // Pass selected id back to the form
        closeDialog();
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Select {target}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Select {target}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Command>
                            <CommandInput placeholder={`Search ${target}s...`} />
                            <CommandList>
                                {data.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
                                {data.map((item) => (
                                    <CommandItem key={item.id} onSelect={() => handleSelect(item.id)}>
                                        {item.title}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDialog}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Display selected document */}
            {selectedId && <div>Selected {target} ID: {selectedId}</div>}
        </div>
    );
}
