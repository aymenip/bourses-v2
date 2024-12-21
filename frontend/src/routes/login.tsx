import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H1, Muted, P } from '@/components/ui/typography'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form';
import { TLogin } from '@/types'
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '@/types/login'
import { Cross1Icon, Cross2Icon, CrossCircledIcon } from '@radix-ui/react-icons'

export const Route = createFileRoute('/login')({
  component: Login,
})



function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(LoginSchema)
  });

  const formSubmit = () => { };

  const [t, _] = useTranslation('translation');

  return <div className='w-full h-[100vh] grid  grid-cols-2 place-content-center'>
    <div className='p-10 ltr:rounded-tr-3xl ltr:rounded-br-3xl rtl:rounded-tl-3xl rtl:rounded-bl-3xl  h-svh place-content-center z-50 bg-background w-svw md:max-w-screen-md'>
      <div className='mb-10 pb-2 border-b-4 border-b-primary/50'>
        <H1>
          Bourses V2
        </H1>
        <P>
          {t('login-message')}
        </P>
      </div>
      <form className='form' onSubmit={handleSubmit(formSubmit)}>
        <div className='form-group'>
          <label className=''>{t("email")}</label>
          <Input {...register('email')} placeholder={t("request-email")} type='text' />
          <div className='form-error'>
            {errors?.email && <><CrossCircledIcon /> <span className='flex items-center gap-x-1'>{t(errors.email?.message || "")}</span> </>}
          </div>
        </div>
        <div className='form-group'>
          <label className=''>{t("password")}</label>
          <Input {...register('password')} placeholder={t("request-password")} type='password' />
          <div className='form-error'>
            {errors?.password && <><CrossCircledIcon /> <span className='flex items-center gap-x-1'>{t(errors.password?.message || "")}</span> </>}
          </div>
          <Link to='/' className='hover:underline'>
            <Muted>{t('forget-password')}</Muted>
          </Link>
        </div>
        <div>
          <Button type='submit' className='w-full'>
            {t('login')}
          </Button>
        </div>
      </form>
    </div>
    <div className='h-svh bg-primary/5 absolute w-full '>

    </div>
  </div >
}