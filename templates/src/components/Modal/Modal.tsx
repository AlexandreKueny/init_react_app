import React, {
    forwardRef,
    PropsWithChildren, useEffect,
} from 'react';
import styles from './Modal.module.scss';
import classnames from "classnames";
import useForwardedRef from "../../hooks/useForwardedRef";
import { ModalContext } from "./Modal.context";

interface ModalProps {
    title?: string;
    onClose?: (returnValue?: string) => void;
}

interface ModalRefInterface {
    showModal: () => void;
    close: (returnValue?: string) => void;
}

export type ModalRef = ModalRefInterface & HTMLDialogElement

const Modal = forwardRef<ModalRef, PropsWithChildren<ModalProps>>(({
                                                                       title,
                                                                       onClose,
                                                                       children
                                                                   }, ref) => {
    const usableRef = useForwardedRef(ref);

    useEffect(() => {
        const currentRef = usableRef.current;
        currentRef.addEventListener('close', (e: any) => {
            onClose?.(e.target.returnValue);
        })
        return () => {
            currentRef.removeEventListener('close', (e: any) => {
                onClose?.(e.target.returnValue);
            })
        }
    })

    return (
        <dialog ref={usableRef as any} className={styles.modal}>
            <div className={styles.header}>
                {title ? <h3>{title}</h3> : <div/>}
                <span
                    className={classnames("material-icons", styles.close)}
                    onClick={() => {
                        usableRef.current.close('cross')
                    }}
                >
                    close
                </span>
            </div>
            <div className={styles.content}>
                <ModalContext.Provider value={usableRef}>
                    {children}
                </ModalContext.Provider>
            </div>
        </dialog>
    );
})

export default Modal;