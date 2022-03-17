import { createContext, MutableRefObject, useContext } from "react";
import { ModalRef } from "./Modal";

export const ModalContext = createContext<MutableRefObject<ModalRef> | undefined>(undefined);

export const useModalContext = () => {
    return useContext(ModalContext);
}