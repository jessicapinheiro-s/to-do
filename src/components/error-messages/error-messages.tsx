import { PiWarningCircle } from "react-icons/pi";

export default function ErrorMessages(props: { message: string }) {
    const { message } = props;
    return (
        <span className='text-center text-sm flex flex-row items-center justify-start gap-2'>
            <PiWarningCircle className='text-red-600' />
            <p className="text-red-600">
                {message}
            </p>
        </span>
    )
}