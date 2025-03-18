import DateReserve from "@/components/DateReserve"
import { FormControl, MenuItem, Select, TextField } from "@mui/material"
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import {getServerSession} from 'next-auth'
import getUserProfile from '@/libs/getUserProfile'
export default async function Booking() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null

    const profile = await  getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);
    return (
        <div>
        <div className="flex flex-col items-center ">
        <div className = 'text-2xl'> {profile.data.name}</div>
        <table className='table-auto border-seperate border-spaceing-2'>
            <tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody>
        </table>
        </div>
        <FormControl variant="standard" className = "w-[100%] flex flex-col items-center space-y-4">
            <div className = "text-xl font-medium">New Reservation</div>
            <div className = "w-fit space-y-2">
                <div className = "text-md text-left text-gray-600">
                    Name and Contacts
                </div>
                <div className = 'bg-slate-100 rounded-lg space-x-5 w-fit px-10 py-5 flex flex-row justfy-center'>
                    <TextField variant = "standard" name = "Name-Lastname" label = "Name-Lastname"/>
                    <TextField variant = "standard" name = "Contact-Number" label = "Contact-Number"/>
                </div>
                <div className = "text-md text-left text-gray-600">
                    Venue
                </div>
                <div>
                <Select variant = 'standard' name = 'venue' id ='venue' className = 'h-[2em] w-[250px] bg-slate-100 rounded-lg px-10  flex flex-row justfy-center'>
                    <MenuItem value = "Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value = "Spark">Spark Space</MenuItem>
                    <MenuItem value = "GrandTable"> The Grand Table</MenuItem>
                </Select>
                </div>
                <div className = "text-md text-left text-gray-600">
                    Booking Date
                </div>
                <DateReserve/>
            </div>
            <button className = "block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white" name = "Book Venue">Book Venue</button>
        </FormControl>
        </div>
    );
}