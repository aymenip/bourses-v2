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
        <div className="flex items-center gap-2 text-sm  p-2 bg-accent/90 rounded text-white/90">
            {lastSaved ? (
                <>
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span>{t("autosaved")} {formatDistanceToNow(lastSaved, { locale: i18n.dir() === "rtl" ? arDZ : enUS })} {t("ago")}</span>
                </>
            ) : (
                <>
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span>{t("recovered-unsaved-progress")}</span>
                </>
            )}
            <Button
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={clearDraft}
            >
                <Trash2 className="h-4 w-4 mr-1" />
                {t("clear-draft")}
            </Button>
        </div>
    );
}