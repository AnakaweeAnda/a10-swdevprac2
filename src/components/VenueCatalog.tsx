import Link from "next/link";
import Card from "./Card";

export default async function VenueCatalog({venuesJson} : {venuesJson:Promise<VenueJson>}) {
    const venueJsonReady = await venuesJson;
    return (
        <>
        Explore {venueJsonReady.count} venues in our catalog
        <div style = {{margin : "20px",display : "flex",flexDirection : "row",flexWrap:"wrap",justifyContent:"space-around",alignContent : "space-around"}}>
                {
                    venueJsonReady.data.map((venueItem:VenueItem)=> (
                        <Link key = {venueItem.id} href={`/venue/${venueItem.id}`} className = 'w-1/5'>
                        <Card key = {venueItem.id} venueName = {venueItem.name} imgSrc = {venueItem.picture}/>
                        </Link>
                    ))
                }
        </div>
        </>
    )
}