// components/AutosaveIndicator.tsx
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { formatDistanceToNow } from 'date-fns';
import { arDZ, enUS } from 'date-fns/locale';
import { Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';


export function AutosaveIndicator({ formKey }: { formKey: string }) {
    const [t, i18n] = useTranslation("translation");
    const { watch, getValues, reset } = useFormContext();
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isDraftAvailable, setIsDraftAvailable] = useState(false);

    // Load draft on mount
    useEffect(() => {
        const saved = localStorage.getItem(formKey);
        if (saved) {
            try {
                const { values } = JSON.parse(saved);
                reset(values);
                setIsDraftAvailable(true);
            } catch (e) {
                console.error('Failed to parse saved draft', e);
            }
        }
    }, [formKey, reset]);

    // Save on changes
    useEffect(() => {
        const subscription = watch((values) => {
            const timer = setTimeout(() => {
                const saveData = {
                    values,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem(formKey, JSON.stringify(saveData));
                setLastSaved(new Date());
            }, 5000); // Debounce 5 seconds

            return () => clearTimeout(timer);
        });

        return () => subscription.unsubscribe();
    }, [watch, formKey]);

    const clearDraft = () => {
        localStorage.removeItem(formKey);
        setIsDraftAvailable(false);
    };

    if (!isDraftAvailable) return null;

    return (
        <div className="flex justify-between items-center gap-2 text-sm  p-2 bg-accent/90 rounded text-white/90">
            <div className='flex items-centers gap-x-1'>
                <span>
                    <Clock className="h-4 w-4 text-yellow-500" />
                </span>
                {lastSaved ? (
                    <>
                        <span>
                            {
                                i18n.dir() === "rtl" ? <>
                                    {t("autosaved")} {t("ago")} {formatDistanceToNow(lastSaved, { locale: arDZ })}
                                </> : <>
                                    {t("autosaved")}  {formatDistanceToNow(lastSaved, { locale: enUS })} {t("ago")}
                                </>
                            }

                        </span>
                    </>
                ) : (
                    <>
                        <span> {t("recovered-unsaved-progress")}</span>
                    </>
                )}
            </div>
            <div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={clearDraft}
                >
                    <Trash2 className="h-4 w-4 mx-1" />
                    {t("clear-draft")}
                </Button>
            </div>
        </div>
    );
}