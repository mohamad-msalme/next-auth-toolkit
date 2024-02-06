import { LoginBtn } from '@/components/auth/login-button'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'

export default async function Page() {
  return (
    <main className="flex h-full flec-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className=" text-center text-6xl font-semibold text-white drop-shadow-md">
          🔐Auth
        </h1>
        <p className={cn('text-white text-lg font-poppins')}>
          A simple authinication service
        </p>
        <LoginBtn size="lg">Sign in</LoginBtn>
      </div>
    </main>
  )
}
