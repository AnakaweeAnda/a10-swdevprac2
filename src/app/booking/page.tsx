"use client"
import DateReserve from "@/components/DateReserve"
import { FormControl, MenuItem, Select, TextField } from "@mui/material"
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import {getServerSession} from 'next-auth'
import getUserProfile from '@/libs/getUserProfile'
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
export default function Booking() {
    const [date,setDate] = useState<Dayjs|null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [nameLastname,setNameLastname]=useState<string>('');
    const [tel,setTel] = useState<string>('');
    const [venue,setVenue] = useState<string>('');
    const makeBooking=() => {
        if(date?.isValid() && nameLastname!=''&&tel!=''&&venue!='') {
            const item :BookingItem={
                nameLastname : nameLastname,
                tel : tel,
                venue : venue,
                bookDate : dayjs(date).format("DD/MM/YYYY")
            }
            dispatch(addBooking(item))
            window.alert("The booking was successfully")
        }
        else {
            let txt = '';
            if(!date?.isValid()) {
                txt += 'Invalid date. \n';
            }
            if(nameLastname === '') {
                txt += 'Name-Lastname is required \n';
            }
            if(tel === '') {
                txt += 'Telephone number is required \n';
            }
            if(venue === '') {
                txt += 'Venue is required \n';
            }
            window.alert(txt);
        }
    }
    
    return (
        <div>
        <FormControl variant="standard" className = "w-[100%] flex flex-col items-center space-y-4">
            <div className = "text-xl font-medium">New Reservation</div>
            <div className = "w-fit space-y-2">
                <div className = "text-md text-left text-gray-600">
                    Name and Contacts
                </div>
                <div className = 'bg-slate-100 rounded-lg space-x-5 w-fit px-10 py-5 flex flex-row justfy-center'>
                    <TextField variant = "standard" name = "Name-Lastname" label = "Name-Lastname" onChange={(e)=>{setNameLastname(e.target.value)}}/>
                    <TextField variant = "standard" name = "Contact-Number" label = "Contact-Number"onChange={(e)=>{setTel(e.target.value)}}/>
                </div>
                <div className = "text-md text-left text-gray-600">
                    Venue
                </div>
                <div>
                <Select variant = 'standard' name = 'venue' id ='venue' className = 'h-[2em] w-[250px] bg-slate-100 rounded-lg px-10  flex flex-row justfy-center' value={venue} onChange={(e)=>{setVenue(e.target.value)}}>
                    <MenuItem value = "Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value = "Spark">Spark Space</MenuItem>
                    <MenuItem value = "GrandTable"> The Grand Table</MenuItem>
                </Select>
                </div>
                <div className = "text-md text-left text-gray-600">
                    Booking Date
                </div>
                <DateReserve onDateChange={(value:Dayjs)=>setDate(value)}/>
            </div>
            <button onClick={makeBooking} className = "block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white" name = "Book Venue">Book Venue</button>
        </FormControl>
        </div>
    );
}