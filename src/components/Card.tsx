'use client'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import {Rating} from '@mui/material'
import {useState} from "react"

export default function Card({venueName,imgSrc,onRating} : {venueName : string, imgSrc : string,onRating?:Function}) {

    const [value,setValue] = useState<number | null>(0);
    
    return (
        <InteractiveCard>
                <div className = "w-full h-[70%] relative rounded-t-lg">
                    <Image src={imgSrc} 
                    alt = 'Venue Picture'
                    fill = {true}
                    className = 'object-cover rounded-t-lg'
                    />
                </div>
                <div className = "w-full h-[30%] p-[10px] flex flex-col">
                    {venueName}
                    {onRating? 
                    (<Rating 
                    name = {venueName+" Rating"} 
                    id = {venueName + " Rating"} 
                    data-testid = {venueName + " Rating"} 
                    value={value}
                    onChange={(event, newValue) => {
                        event.stopPropagation();
                        setValue(newValue);
                        onRating(venueName,newValue);
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}/>) : ""
                    
                    }
                </div>
        </InteractiveCard>
    )
}