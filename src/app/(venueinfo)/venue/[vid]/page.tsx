import Image from 'next/image'
import getVenue from '@/libs/getVenue'
export default async function CardDetailPage({params} : {params : {vid : string}}) {
    
    const venueDetail = await getVenue(params.vid)
    return (
        <main className = 'text-center p-5'>
            <h1 className = 'text-lg font-medium'>Venue ID {params.vid}</h1>
            <div className = 'flex flex-row my-5'>
                <Image src = {venueDetail.data.picture}
                alt = 'Venue Picture'
                width={0} height = {0} sizes = "100vw"
                className = 'rounded-lg w-[30%] bg-black'
                />
                <div className='text-md mx-5'>{venueDetail.data.name}
                <div>Full Address : {venueDetail.data.address} , {venueDetail.data.district} , {venueDetail.data.province} , {venueDetail.data.postalcode}</div>
                <div>Telephone No. : {venueDetail.data.tel} </div>

                </div>
            </div>
        </main>
    )
}
