import { useState } from "react";

/**
 * Custom hook
 * @returns retorna um conjunto de métodos e estados úteis para exibir alertas e mensagens de erro
 */
export const useWarnings = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return {
    openAlert,
    setOpenAlert,
    openConfirm,
    setOpenConfirm,
    openError,
    setOpenError,
    errorMessage,
    setErrorMessage,
  }
}