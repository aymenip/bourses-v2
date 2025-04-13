import { create } from "zustand";
import { TFullFormBlock, TFullForm, TField } from "@/types/forms";
import { TCreateFormAccess } from "@/types/form-acess";

interface FormState {
  currentForm?: TFullForm;
  lastChange?: string;
  formAccess?: TCreateFormAccess;
  setCurrentForm: (newForm: TFullForm) => void;
  setCurrentFormTitle: (newTitle: string) => void;
  addBlockToCurrentForm: (newBlock: TFullFormBlock) => void;
  addFieldToBlock: (newField: TField, blockId: number) => void;
  changeCurrentFormAccess: (newFormAccess: TCreateFormAccess) => void;
}

export const useFormStore = create<FormState>((set) => ({
  currentForm: undefined,
  lastChange: undefined,
  formAccess: undefined,
  setCurrentForm: (newForm) =>
    set({
      currentForm: { ...newForm, blocks: newForm.blocks ?? [] },
      lastChange: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }),
  setCurrentFormTitle: (newTitle) =>
    set((state) => ({
      currentForm: {
        ...state.currentForm!,
        title: newTitle,
      },
      lastChange: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    })),
  addBlockToCurrentForm: (newBlock) =>
    set((state) => {
      if (!state.currentForm) return state;

      const blockExists = state.currentForm.blocks?.some(
        (block) => block.id === newBlock.id
      );
      if (blockExists) return state;

      return {
        currentForm: {
          ...state.currentForm,
          blocks: [...state.currentForm.blocks!, newBlock],
        },
      };
    }),
  addFieldToBlock: (newField, blockId) =>
    set((state) => {
      if (!state.currentForm) return state;

      return {
        currentForm: {
          ...state.currentForm,
          blocks: state.currentForm.blocks?.map((block) =>
            block.id === blockId
              ? {
                  ...block,
                  fields: block.fields.some((field) => field.id === newField.id)
                    ? block.fields
                    : [...block.fields, newField],
                }
              : block
          ),
        },
      };
    }),
  changeCurrentFormAccess: (newFormAccess) =>
    set({
      formAccess: newFormAccess,
    }),
}));
