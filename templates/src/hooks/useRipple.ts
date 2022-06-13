import { RefObject, useEffect, useRef } from "react";

function useRipple<TRef extends HTMLElement>(enabled: boolean, styles: any): RefObject<TRef> {
    const ref = useRef<TRef>(null);

    const onClickListener = (e: MouseEvent) => {
        let posX = e.offsetX;
        let posY = e.offsetY;
        ref.current?.style.setProperty('--x', posX + 'px');
        ref.current?.style.setProperty('--y', posY + 'px');
        ref.current?.classList.add(styles.pulse);
        ref.current?.addEventListener(
            "animationend",
            () => {
                ref.current?.classList.remove(styles.pulse);
            },
            { once: true }
        );
    }

    useEffect(() => {
        const currentRef = ref.current;
        if (enabled) {
            currentRef?.addEventListener('click', onClickListener);
        } else {
            currentRef?.removeEventListener('click', onClickListener);
        }
        return () => {
            currentRef?.removeEventListener('click', onClickListener);
        }
    }, [ref, enabled]);

    return ref;
}

export default useRipple;