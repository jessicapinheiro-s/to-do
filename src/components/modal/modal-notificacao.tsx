import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface propsModalNotificacao {
    title: string;
    text: string;
    open: boolean;
    onClose: () => void;
}

export default function ModalNotificacao(props: propsModalNotificacao) {
    const { title, text, open, onClose } = props;

    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 1500)
    }, [open]);
    return (
        open && (
            <div className="w-1/6 absolute bottom-10 right-10 bg-white border border-[#e0e0e0] gap-4 flex flex-col rounded-lg py-4 px-8">
                <div className="text-center flex flex-row items-center justify-start gap-x-2.5">
                    <FaCheckCircle className="text-[16px] text-green-600"/>
                    <div>
                        <h1 className="text-[16px] font-semibold">{title}</h1>
                    </div>
                </div>
                {
                    text && (
                        <div className="text-center">
                            <p>{text}</p>
                        </div>
                    )
                }

            </div>
        )
    )

}