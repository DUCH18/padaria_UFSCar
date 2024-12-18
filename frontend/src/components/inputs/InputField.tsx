import { ReactNode, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string,
  input: ReactNode,
  error?: FieldError,
  vertical?: boolean,
  loading?: boolean
}

export const InputField = ({ label, input, error, vertical, loading }: InputFieldProps) => {
  const [dots, setDots] = useState(""); // Estado para os pontos

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 200);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="w-full">
      <span className={`${vertical ? " flex-col" : "flex-row"} flex gap-2 rounded-md border border-black bg-white px-4 py-3`}>
        <label className='w-fit font-bold'>{label}:</label>
        {loading ? (
          <span className="flex items-center">
            <span className="animate-pulse text-gray-500">Carregando{dots}</span>
          </span>
        ) : (
          input
        )}
      </span>
      {error && <i>{error.message}</i>}
    </div>
  )
}