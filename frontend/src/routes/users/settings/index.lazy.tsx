import { useGrantAccess, useUserUpdate } from '@/api/auth/mutations'
import { authenticationContext } from '@/api/services'
import Sidebar from '@/components/global/sidebar'
import { TopBar } from '@/components/global/topBar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { H4 } from '@/components/ui/typography'
import { grantAccessSchema, TGrantAccess, TUpdateUserFormValues, updateUserFormValuesSchema } from '@/types/settings'
import { TUpdateUser } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/users/settings/')({
  component: Settings,
})

function Settings() {
  const { role, is_active, position, password_changed, research_gate, google_scholar } = authenticationContext()
  const { mutate: grantAccess, data: valid, isPending: isGrantPending, isSuccess: isGrantSuccess } = useGrantAccess();
  const { mutate: updateUser, isError: isUpdateError, isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useUserUpdate()
  const [changePassword, setChangePassword] = useState(!password_changed);

  const [t] = useTranslation("translation")

  const grantAccessForm = useForm<TGrantAccess>({
    resolver: zodResolver(grantAccessSchema),
  })

  const updateUserForm = useForm<TUpdateUserFormValues>({
    resolver: zodResolver(updateUserFormValuesSchema(position || "", password_changed!)),
    defaultValues: {
      googleScholar: google_scholar || "",
      researchGate: research_gate || "",
      changePassword: !password_changed, // required if password never changed
    },
  });

  const handleGrantAccessSubmit = async (data: TGrantAccess) => {
    try {
      grantAccess(data.currentPassword) // Your API call
    } catch (error) {
      throw new Error("Incorrect password");
    }
  }

  const handleUpdateUserSubmit = async (data: TUpdateUserFormValues) => {
    const updateUserData: TUpdateUser = {
      google_scholar: data.googleScholar,
      research_gate: data.researchGate,
      new_password: data.newPassword,
      password_changed: password_changed!,
      is_active: is_active!,
    }
    updateUser(updateUserData);
    if (isUpdateSuccess) {
      toast.success(t("user-update-success"))
    }
  }

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar role={role!} is_active={is_active ?? undefined} />
      <div className='flex-1 h-screen overflow-x-hidden'>
        <div className="content-container">
          <TopBar page_name="🔧settings" />
          <div className='p-2 overflow-y-auto w-full md:max-w-[1200px]'>

            {
              !is_active && (
                <>
                  <div className='p-4 rounded-sm shadow-sm min-h-16 space-y-4 border-2 border-orange-700 bg-orange-200 text-orange-950 dark:text-orange-400 dark:bg-orange-900/30'>
                    <div>
                      <H4>⚠️ {t("uncompelted-account")}</H4>
                      <div className='py-2 px-4'>{t("uncompelted-account-message")}</div>
                    </div>
                    <div>
                      {!password_changed && (<div>1️⃣ {t("ins1-change-password")}</div>)}
                      {(position !== "emp" && !google_scholar && !research_gate) && (<div>2️⃣ {t("ins2-add-google-scholar-or-research-gate")}</div>)}
                    </div>
                  </div>
                </>
              )
            }

            <div className='p-4 border rounded-sm shadow-sm mt-5 space-y-6'>
              <form onSubmit={grantAccessForm.handleSubmit(handleGrantAccessSubmit)} className='md:form md:grid-cols-6 items-center md:gap-4 space-y-3 md:space-y-0'>
                <div className='flex items-center gap-x-3 col-span-5'>
                  <Label className='shrink-0'>{t("password")}</Label>
                  <Input type='password' placeholder={t("enter-your-password")} {...grantAccessForm.register("currentPassword")} />
                </div>
                <Button className="w-full md:shrink-0 text-2xl" type='submit' variant={"outline"}>
                  {isGrantPending ? <Loader className='w-5 h-5 animate-spin' /> : "🔑"}
                </Button>
                {grantAccessForm.formState.errors.currentPassword && (
                  <p className="text-red-500 col-span-6">{grantAccessForm.formState.errors.currentPassword.message}</p>
                )}

              </form>
              {
                isGrantSuccess && !isGrantPending && !valid && (
                  <div className='p-4 rounded-sm shadow-sm space-y-4 border-2 border-red-700 bg-red-200 text-red-950 dark:text-red-400 dark:bg-red-900/30'>
                    <p>❌ {t("incorecct-password")}</p>
                  </div>)
              }
              {
                isGrantSuccess && valid && (<>
                  <Separator />

                  <form onSubmit={updateUserForm.handleSubmit(handleUpdateUserSubmit)} className="form space-y-4">
                    {password_changed && (
                      <div className="flex items-center gap-2 border w-fit p-2 rounded-sm ">
                        <Checkbox
                          checked={changePassword}
                          onCheckedChange={(value: boolean) => {
                            setChangePassword(value);
                            updateUserForm.setValue("changePassword", value);
                          }}

                        />
                        <span>{t("change-my-password")}</span>
                      </div>
                    )}

                    {(!password_changed || changePassword) && (
                      <div>
                        <div className='flex gap-4 w-full'>
                          <div className='form-group w-1/2'>
                            <Label>{t("new-password")}</Label>
                            <Input
                              type='password'
                              {...updateUserForm.register("newPassword")}
                            />
                          </div>
                          <div className='form-group w-1/2'>
                            <Label>{t("retype-new-password")}</Label>
                            <Input
                              type='password'
                              {...updateUserForm.register("confirmNewPassword")}
                            />
                          </div>
                        </div>

                        {(updateUserForm.formState.errors.newPassword ||
                          updateUserForm.formState.errors.confirmNewPassword) && (
                            <div>
                              {updateUserForm.formState.errors.newPassword && (
                                <p className='text-red-500 col-span-6'>
                                  {updateUserForm.formState.errors.newPassword.message}
                                </p>
                              )}
                              {updateUserForm.formState.errors.confirmNewPassword && (
                                <p className='text-red-500 col-span-6'>
                                  {updateUserForm.formState.errors.confirmNewPassword.message}
                                </p>
                              )}
                            </div>
                          )}
                      </div>
                    )}

                    {(position !== "emp") && (
                      <>
                        <div>
                          <div className='form-group'>
                            <Label>{t("google-scholar-account")}</Label>
                            <Input {...updateUserForm.register("googleScholar")} />
                          </div>
                          <div>
                            {
                              updateUserForm.formState.errors.googleScholar && (<p className="text-red-500 col-span-6">
                                {
                                  updateUserForm.formState.errors.googleScholar.message
                                }
                              </p>)
                            }
                          </div>
                        </div>
                        <div>
                          <div className='form-group'>
                            <Label>{t("research-gate-account")}</Label>
                            <Input {...updateUserForm.register("researchGate")} />
                          </div>
                          <div>
                            {
                              updateUserForm.formState.errors.researchGate && (<p className="text-red-500 col-span-6">
                                {
                                  updateUserForm.formState.errors.researchGate.message
                                }
                              </p>)
                            }
                          </div>
                        </div>

                      </>
                    )}

                    <Button type="submit">
                      {isUpdatePending ? <Loader className='w-5 h-5 animate-spin' /> : t("update")}
                    </Button>
                  </form>
                </>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}