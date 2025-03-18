"use client"
import Banner from '@/components/Banner'
import Card from "@/components/Card"
import Link from 'next/link';

import {useReducer} from "react"

export default function Home() {
    let defaultVenue = new Map<string,number> ([
        ["The Bloom Pavilion",0],
        ["Spark Space",0],
        ["The Grand Table",0],
    ]);
    const cardReducer = (
        venueList : Map<string,number>,
        action : {type:string; venueName:string;rating? : number}
    ) => {
        switch(action.type) {
            case 's' : {
                const newVenueList = new Map(venueList);
                newVenueList.set(action.venueName,action.rating??0);
                return newVenueList;
            }
            case 'a' : {
                const newVenueList = new Map(venueList);
                newVenueList.delete(action.venueName);
                return newVenueList;
            }
            default : return venueList;
        }
    }
    const [venueList,dispatchRating] = useReducer(cardReducer, defaultVenue);

    const mockVenueList = [
        {vid : "001" , name : "The Bloom Pavilion",image : "/img/bloom.jpg"},
        {vid : "002" , name : "Spark Space",image : "/img/sparkspace.jpg"},
        {vid : "003" , name : "The Grand Table",image : "/img/grandtable.jpg"},
    ]
    return (
        <div>
            <div style = {{margin : "20px",display : "flex",flexDirection : "row",flexWrap:"wrap",justifyContent:"space-around",alignContent : "space-around"}}>
                {
                    mockVenueList.map((venueItem)=> (
                        <Link href={`/venue/${venueItem.vid}`} className = 'w-1/5'>
                        <Card venueName = {venueItem.name} imgSrc = {venueItem.image} onRating = {(venueName:string,rating:number)=>dispatchRating({type:'s',venueName:venueName,rating:rating})}/>
                        </Link>
                    ))
                }
            </div>
            <div className = 'w-full text-2xl font-medium'>Venue List with Ratings : {venueList.size}</div>
            {Array.from(venueList).map(([venueName,rating])=> <div data-testid={venueName} key = {venueName} className = 'text-xl' onClick={()=>dispatchRating({type:'a',venueName:venueName,rating:0})}> {venueName} : {rating} </div>)}
        </div>
    );
}