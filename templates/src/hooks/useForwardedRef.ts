import { ForwardedRef, MutableRefObject, useEffect, useRef } from "react";

function useForwardedRef<TRef>(ref: ForwardedRef<TRef>): MutableRefObject<TRef> {
    const innerRef = useRef<TRef>(null);
    useEffect(() => {
        if (!ref) return;
        if (typeof ref === 'function') {
            ref(innerRef.current);
        } else {
            ref.current = innerRef.current;
        }
    });

    return innerRef as MutableRefObject<TRef>;
}

export default useForwardedRef;