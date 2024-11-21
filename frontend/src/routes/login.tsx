import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H1, Muted, P } from '@/components/ui/typography'
import { Link1Icon } from '@radix-ui/react-icons'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FormInput } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: Login,
})



function Login() {
  return <div className='w-full h-[100vh] grid place-content-center'>
    <div className='bg-secondary p-10 rounded-md shadow-md ring-2'>
      <div className='mb-10'>
        <H1>
          Bourses V2
        </H1>
        <P>
          Please fill your information to login to your account.
        </P>
      </div>
      <form className='grid gap-y-10'>
        <div className='grid gap-y-1'>
          <label className=''>Email</label>
          <Input placeholder='Please enter your email' type='text' />
        </div>
        <div className='grid gap-y-1'>
          <label className=''>Password</label>
          <Input placeholder='Please enter your password' type='password' />
          <Link to='/' className='hover:underline'>
            <Muted>Forget password ?</Muted>
          </Link>
        </div>

        <div>
          <Button className='w-full'>
            Login
          </Button>
        </div>
      </form>
    </div>
  </div>
}