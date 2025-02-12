import { Button } from "../buttons/Button"
import { FaXmark } from "react-icons/fa6"
import { IoWarningOutline } from "react-icons/io5"

type WarningProps = {
  open: boolean,
  type: "confirm" | "alert",
  icon?: JSX.Element,
  warningMessage: string,
  denyButtonMessage: string,
  onDenyClose: () => void,
  confirmButtonMessage?: string,
  onConfirmClose?: () => void,
}

export const Warning = ({
  open,
  type,
  icon,
  warningMessage,
  denyButtonMessage,
  onDenyClose,
  confirmButtonMessage,
  onConfirmClose,
}: WarningProps) => {
  return (
    <>
      {open && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-20 flex justify-center items-center">
          <div className="relative w-[90vw] lg:w-[30vw] z-50 bg-white text-black text-center p-10 rounded-xl flex flex-col items-center gap-4 shadow-custom-01">
            <FaXmark onClick={onDenyClose} className="absolute top-[20px] right-[20px] text-3xl text-black cursor-pointer" />
            {icon ? (
              <div className="text-9xl text-orange">
                {icon}
              </div>
            ) : (
              <IoWarningOutline className="text-9xl text-orange" />
            )}
            <p className="font-bold text-lg">{warningMessage}</p>
            <Button type="button" onClick={onDenyClose}>
              {denyButtonMessage}
            </Button>
            {type === "confirm" && (
              <Button type="button" onClick={onConfirmClose} bgColor="bg-brown">
                {confirmButtonMessage}
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}