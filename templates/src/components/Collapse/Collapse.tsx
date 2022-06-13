import React, { FC, PropsWithChildren, useState } from 'react';
import styles from './Collapse.module.scss';
import AnimateHeight from 'react-animate-height';
import useRipple from "../../hooks/useRipple";

interface CollapseProps {
    title: string;
    subtitle?: string;
    ripple?: boolean;
}

const Collapse: FC<PropsWithChildren<CollapseProps>> = ({
                                                            title,
                                                            subtitle,
                                                            ripple = true,
                                                            children,
                                                        }) => {
    const [opened, setOpened] = useState(false);
    const rippleRef = useRipple<HTMLDivElement>(ripple, styles);

    return (
        <div className={styles.collapse} data-testid="collapse">
            <div className={styles.head} onClick={() => setOpened(!opened)} ref={rippleRef}>
                <span className="material-icons">{opened ? 'expand_less' : 'expand_more'}</span>
                <div className={styles.titles}>
                    <p className={styles.tile}>{title}</p>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            </div>
            <AnimateHeight
                height={opened ? 'auto' : 0}
            >
                <div className={styles.content}>{children}</div>
            </AnimateHeight>
        </div>
    );
}

export default Collapse;