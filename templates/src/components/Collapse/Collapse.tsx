import React, { FC, useState } from 'react';
import styles from './Collapse.module.scss';
import AnimateHeight from 'react-animate-height';

interface CollapseProps {
    title: string;
    subtitle?: string;
}

const Collapse: FC<CollapseProps> = ({
                                         title,
                                         subtitle,
                                         children,
                                     }) => {
    const [opened, setOpened] = useState(false);

    return (
        <div className={styles.collapse} data-testid="collapse">
            <div className={styles.head} onClick={() => setOpened(!opened)}>
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