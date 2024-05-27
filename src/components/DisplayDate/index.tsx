import { formatISODate } from "@/util/functions"

interface DisplayISODateProps {
    ISODate: string
}

export default function DisplayISODate(props: DisplayISODateProps) {
    return (
        <>
            <div className='bg-gray-700 rounded size-[6px] mx-2' />
            <p>{formatISODate(props.ISODate)}</p>
        </>
    )
}