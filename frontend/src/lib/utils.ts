import { TFullForm } from "@/types/forms";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, ZodTypeAny } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fullFormObjectToZodSchem(
  form: TFullForm
): z.ZodObject<Record<string, ZodTypeAny>> {
  const shape: Record<string, ZodTypeAny> = {};

  for (const block of form.blocks!) {
    for (const fieldGroup of block.fields) {
      for (const field of Array.isArray(fieldGroup)
        ? fieldGroup
        : [fieldGroup]) {
        const key = field.id.toString();
        if (shape[key]) continue; // in case the same field appears more than once

        let baseSchema: ZodTypeAny;

        switch (field.type) {
          case "text":
            baseSchema = z.string();
            break;
          case "email":
            baseSchema = z.string().email("invalid-email");
            break;
          case "article":
          case "thesis":
          case "conference":
          case "book":
          case "certificate":
            baseSchema = z.string().min(1, "sourceable-empty-error");
            break;
          default:
            baseSchema = z.any(); // fallback
            break;
        }

        if (field.required) {
          shape[key] = baseSchema;
        } else {
          shape[key] = baseSchema.optional();
        }
      }
    }
  }

  return z.object(shape);
}
