import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormStore } from '@/store/formStore';
import { H3 } from '@/components/ui/typography';
import { TPosition } from '@/types/positions';
import { useForm } from 'react-hook-form';
import { CreateFormAccessSchema, TCreateFormAccess } from '@/types/form-acess';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { usePositions } from '@/api/positions/queries';
import { usePositionStore } from '@/store/positionStore'; // Import Zustand store
import { useChangeFormAccess } from '@/api/forms/mutations';
import { toast } from 'sonner';

export const FormAcess: React.FC = () => {
    const { t } = useTranslation("translation");

    const currentForm = useFormStore((state) => state.currentForm);

    //form access
    const { data: createdFormAccess, mutate: createFormAccess, isError, isPending, isSuccess } = useChangeFormAccess()

    // Zustand store
    const { positions, setPositions } = usePositionStore();

    // Fetch positions only if Zustand store is empty
    const { data: fetchedPositions, isError: isErrorFetchPositions, isPending: isPendingFetchPositions } = usePositions({
        enabled: positions.length === 0, // Fetch only if store is empty
    });



    // Sync fetched positions with Zustand store
    useEffect(() => {
        if (fetchedPositions && positions.length === 0) {
            setPositions(fetchedPositions);
        }
    }, [fetchedPositions, positions.length, setPositions]);


    // Form Hook
    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TCreateFormAccess>({
        resolver: zodResolver(CreateFormAccessSchema),
        defaultValues: {
            formId: currentForm?.id || 0,
            positionId: [],
        },
    });

    const selectedPositions = watch("positionId");

    // Checkbox Rendering Function
    const renderPosition = (position: TPosition) => (
        <div key={position.id} className="flex items-center gap-2">
            <Checkbox
                id={`position-${position.id}`}
                checked={selectedPositions.includes(position.id)}
                onCheckedChange={(checked) => {
                    setValue(
                        "positionId",
                        checked
                            ? [...selectedPositions, position.id]
                            : selectedPositions.filter((id) => id !== position.id)
                    );
                }}
            />
            <label htmlFor={`position-${position.id}`} className="cursor-pointer">
                {t(position.name)}
            </label>
        </div>
    );

    // Form Submit Handler
    const onFormSubmit = (data: TCreateFormAccess) => {
        createFormAccess(data)
    };

    const changeCurrentFormAccess = useFormStore((state) => state.changeCurrentFormAccess);
    
    useEffect(() => {
        if (isSuccess) {
            toast.success(t("form-access-change-success"));
            changeCurrentFormAccess(createdFormAccess);
        } else if (isPending) {
            toast.info(t("form-access-change-pending"))
        } else if (isError) {
            toast.error(t("form-access-change-error"))
        }
    }, [isError, isPending, isSuccess])

    return (
        <div className="flex">
            <form id="form-access-form" className="w-full grid gap-4" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="border dark:border-zinc-800 shadow-sm">
                    <div className="bg-zinc-100 dark:bg-zinc-800 py-6 px-2 border-b">
                        <H3>{t("form-to")}</H3>
                    </div>
                    <div className="bg-zinc-100/40 dark:bg-zinc-800/40 p-2 space-y-2">
                        {isPendingFetchPositions ? (
                            <LoaderIcon className="animate-spin mx-auto" />
                        ) : isErrorFetchPositions ? (
                            <p className="text-red-500">{t("error-loading-positions")}</p>
                        ) : positions.length ? (
                            positions.map((position) => renderPosition(position))
                        ) : (
                            <p className="text-gray-500">{t("no-positions-available")}</p>
                        )}
                    </div>
                </div>

                {errors.positionId && <p className="text-red-500">{t(errors.positionId.message || "")}</p>}

                <Button type="submit" className="w-full text-md font-bold" disabled={isSubmitting || isPending}>
                    {isSubmitting ? <LoaderIcon className="animate-spin" /> : t("save")}
                </Button>
            </form>
        </div>
    );
};
