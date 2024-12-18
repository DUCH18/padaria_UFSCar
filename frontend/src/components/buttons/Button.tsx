type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
}

export const Button = ({ type, children, onClick, bgColor }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColor ? bgColor : "bg-orange"} text-white text-lg font-bold rounded-full px-4 py-2 min-w-[300px] transition-all active:scale-90 active:shadow-none`}
    >
      {children}
    </button>
  )
}
