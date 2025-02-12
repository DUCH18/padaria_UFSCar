type IconButtonProps = {
  type: "button" | "submit" | "reset",
  onClick: () => void,
  highlighted?: boolean
  children: React.ReactNode,
}

export const IconButton = ({
  type,
  onClick,
  highlighted,
  children,
}: IconButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 p-4 rounded-full border-2 border-white text-2xl outline outline-orange focus:outline-offset-[3px] outline-2 ${highlighted ? "bg-orange text-white" : "bg-white text-brown"}`}
    >
      {children}
    </button>
  )
}
