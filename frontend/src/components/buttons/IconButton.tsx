type IconButtonProps = {
  children: React.ReactNode,
  type: "button" | "submit" | "reset",
  onClick: () => void,
  highlighted?: boolean
}

export const IconButton = ({ children, type, onClick, highlighted }: IconButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`flex items-center gap-2 p-4 rounded-full border-2 border-white text-2xl outline outline-orange outline-2 ${highlighted ? "bg-orange text-white" : "bg-white text-brown"}`}>
      {children}
    </button>
  )
}
