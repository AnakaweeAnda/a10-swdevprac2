import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem'
import {getServerSession} from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import {Link} from '@mui/material'

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    return (
        <div className = {styles.menucontainer}>
            <TopMenuItem title = 'Booking' pageRef = '/booking'/>
            <Image src = {'/img/logo.png'} className = {styles.logoimg}
            alt = 'logo'
            width = {0}
            height = {0}
            sizes = "100vh"
            />
            {
                session ?
                <Link href='/api/auth/signout'>
                    <div className='flex items-center absolute left-0 h-full px-2 absolute left-0 text-cyan-600 text-sm margin-right-0'>
                        Sign-Out of {session.user?.name}
                    </div>
                </Link>
                : 
                <Link href='/api/auth/signin'>
                    <div className='flex items-center absolute left-0 h-full px-2 absolute left-0 text-cyan-600 text-sm margin-right-0'>
                        Sign-In
                    </div>
                </Link>
            }
            <div className='flex items-center absolute left-24 h-full px-2 absolute left-0 text-cyan-600 text-sm margin-right-0'><TopMenuItem title='My Booking' pageRef='/mybooking' /></div>
        </div>
    );
    
}