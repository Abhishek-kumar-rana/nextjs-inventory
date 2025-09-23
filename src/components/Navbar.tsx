import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Ghost, HomeIcon, LogIn, LogInIcon, LogOutIcon, Sprout } from 'lucide-react'
import ModeToggle from './ModeToggle'
import { stackServerApp } from '@/stack/server'
import { getUserDetails } from '@/actions/user.action'
import { UserButton } from '@stackframe/stack'

async function Navbar() {

    const user = await stackServerApp.getUser();

    const app = stackServerApp.urls;

     const userProfile = await getUserDetails(user?.id);


  return (
    <nav className=' sticky top-0 z-50 w-full bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
        <div className=' max-w-7xl mx-auto px-4'>

            <div className=' h-16 flex items-center justify-between '>

            {/* logo */}

            <div className=' flex items-center'>
                <Link href={'/'} className=' text-xl font-bold text-primary front-mono tracking-wider '>
                    PlantVentry
                </Link>
            </div>

            {userProfile?.name && <span className="text-[14px] text-gray-600 dark:text-gray-300">
            {`Hello, ${userProfile?.name.split(' ')[0]}`}
          </span>}

            {/* navbar components */}

            <div className=' hidden md:flex items-center  space-x-4 '>

                <Button variant="ghost"  className=' flex items-center gap-2 ' asChild>
                    <Link href={'/plants'}>
                        <Sprout className=' h-4 w-4 '/>
                        <span className=' hidden lg:inline'> Plants</span>
                    </Link>
                    

                </Button>

                <Button variant="ghost"  className=' flex items-center gap-2  'asChild>
                    <Link href={'/'}>
                        <HomeIcon className=' h-4 w-4 '/>
                        <span className=' hidden lg:inline'> Home</span>
                    </Link>
                    

                </Button>

                <ModeToggle />

                

                {user? (
                    <>
                    {/* sign out  button  */}
                <Button variant="ghost"  className=' flex items-center gap-2  'asChild>
                    <Link href={app.signOut}>
                        {/* <LogIn className=' h-4 w-4 '/> */}
                        <LogOutIcon className=' h-4 w-4 '/>
                        <span className=' hidden lg:inline'> Sign Out</span>
                    </Link>
                    

                </Button>

                <UserButton/>
                    </>
                ):(
                    <>
                    {/* sign In  button  */}
                <Button variant="ghost"  className=' flex items-center gap-2  'asChild>
                    <Link href={app.signIn}>
                        {/* <LogIn className=' h-4 w-4 '/> */}
                        <LogInIcon className=' h-4 w-4 '/>
                        <span className=' hidden lg:inline'> Sign In</span>
                    </Link>
                    

                </Button>
                    </>
                )}

            


            


                
            </div>

            </div>

        </div>
    </nav>
  )
}

export default Navbar