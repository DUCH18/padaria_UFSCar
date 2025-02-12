type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  bgColor?: string;
  children: React.ReactNode;
}

export const Button = ({
  type,
  onClick,
  bgColor,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColor ? bgColor + " focus:outline-brown" : "bg-orange focus:outline-orange"} text-white text-lg font-bold rounded-md border-2 border-black focus:outline focus:outline-[3px] px-4 py-2 min-w-[200px] sm:min-w-[300px] transition-all active:scale-90 active:shadow-none active:outline-none`}
    >
      {children}
    </button>
  )
}
