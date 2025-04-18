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
  deleteBlockFromCurrentForm: (id: number) => void;
  addFieldToBlock: (newField: TField, blockId: number) => void;
  deleteFieldFromBlock: (fieldId: number, blockId: number) => void;
  changeCurrentFormAccess: (newFormAccess: TCreateFormAccess) => void;
}

export const useFormStore = create<FormState>((set) => ({
  currentForm: undefined,
  lastChange: undefined,
  formAccess: undefined,
  setCurrentForm: (newForm) =>
    set(() => {
      const normalizedBlocks =
        newForm.blocks?.map((block) => ({
          ...block,
          fields: block.fields.flat(), // Flatten nested arrays
        })) ?? [];

      return {
        currentForm: { ...newForm, blocks: normalizedBlocks },
        lastChange: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
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
  deleteBlockFromCurrentForm: (id) =>
    set((state) => {
      if (!state.currentForm) return state;

      const updatedBlocks =
        state.currentForm.blocks?.filter((block) => block.id !== id) ?? [];

      return {
        currentForm: {
          ...state.currentForm,
          blocks: updatedBlocks,
        },
        lastChange: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
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
  deleteFieldFromBlock: (fieldId, blockId) =>
    set((state) => {
      if (!state.currentForm) return state;

      return {
        currentForm: {
          ...state.currentForm,
          blocks: state.currentForm.blocks?.map((block) =>
            block.id === blockId
              ? {
                  ...block,
                  fields: block.fields.filter((field) => field.id !== fieldId),
                }
              : block
          ),
        },
        lastChange: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
    }),
  changeCurrentFormAccess: (newFormAccess) =>
    set({
      formAccess: newFormAccess,
    }),
}));
