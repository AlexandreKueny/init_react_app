import React, { FC } from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
    color?: string;
    trackColor?: string;
}

const Spinner: FC<SpinnerProps> = ({ color, trackColor }) => (
    <div
        className={styles.spinner}
        style={{ borderColor: trackColor, borderTopColor: color }}
        data-testid="spinner"
    />
);

export default Spinner;