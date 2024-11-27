import { atom, useAtom } from "jotai";

export const flashMassageAtom = atom({
  "message": "",
  "type": "info"
});

export const useFlashMessage = () => {
  const [flashMessage, setFlashMessage] = useAtom(flashMassageAtom);

  const showMessage = (message, type) => {
    setFlashMessage({
      "message": message,
      "type": type
    });
  }

  const clearMessage = () => {
    setFlashMessage({
      "message": "",
      "type": "info"
    });
  };

  const getMessage = () => flashMessage;
  return { showMessage, clearMessage, getMessage };
};
