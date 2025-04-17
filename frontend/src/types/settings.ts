import { z } from "zod";

const googleScholarRegex =
  /^https:\/\/(scholar\.google\.[a-z.]+)\/citations\?user=[\w-]+$/;
const researchGateRegex =
  /^https:\/\/(www\.)?researchgate\.net\/profile\/[\w-]+\/?$/;

export const updateUserFormValuesSchema = (
  position: string,
  password_changed: boolean
) =>
  z
    .object({
      changePassword: z.boolean().optional(),
      newPassword: z.string().min(8, "at-least-8").optional(),
      confirmNewPassword: z.string().optional(),
      googleScholar: z
        .string()
        .regex(googleScholarRegex, "invalid-google-scholar-url")
        .optional()
        .or(z.literal("")),
      researchGate: z
        .string()
        .regex(researchGateRegex, "invalid-research-gate-url")
        .optional()
        .or(z.literal("")),
      positionId: z.number().optional(),
    })
    .superRefine((data, ctx) => {
      const shouldValidatePassword = !password_changed || data.changePassword;

      if (shouldValidatePassword) {
        if (!data.newPassword || data.newPassword.length < 8) {
          ctx.addIssue({
            path: ["newPassword"],
            code: "custom",
            message: "password-at-least-8",
          });
        }
        if (!data.confirmNewPassword) {
          ctx.addIssue({
            path: ["confirmNewPassword"],
            code: "custom",
            message: "confirm-password-required",
          });
        }
        if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
          ctx.addIssue({
            path: ["confirmNewPassword"],
            code: "custom",
            message: "passwords-not-match",
          });
        }
      }

      if (position !== "emp") {
        const scholarEmpty = !data.googleScholar || data.googleScholar === "";
        const gateEmpty = !data.researchGate || data.researchGate === "";

        if (scholarEmpty && gateEmpty) {
          ctx.addIssue({
            path: ["googleScholar"],
            code: "custom",
            message: "at-least-one-required-scholar-or-gate",
          });
          ctx.addIssue({
            path: ["researchGate"],
            code: "custom",
            message: "at-least-one-required-scholar-or-gate",
          });
        }
      }
    });

export const grantAccessSchema = z.object({
  currentPassword: z.string().min(8, "input-required"),
});

export type TUpdateUserFormValues = z.infer<
  ReturnType<typeof updateUserFormValuesSchema>
>;
export type TGrantAccess = z.infer<typeof grantAccessSchema>;
