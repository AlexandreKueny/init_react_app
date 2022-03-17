import React, { FC } from 'react';
import styles from './Radio.module.scss';
import classnames from "classnames";

interface RadioProps<TValue> {
    options: { label: string; value: TValue }[];
    value: TValue
    onChange?: (value: TValue) => void
    labelPosition?: 'left' | 'right';
    disabled?: boolean;
    inline?: boolean;
}

function Radio<TValue>({
                           options,
                           value,
                           onChange,
                           labelPosition = 'right',
                           disabled,
                           inline
                       }: RadioProps<TValue>) {
    const handleClick = (value: TValue) => {
        if (disabled) return;
        onChange?.(value);
    }

    return (
        <div className={classnames(styles.radio, inline && styles.inline)} data-testid="radio">
            {options.map((option, i) => (
                <div key={i} className={classnames(styles.item, inline && styles.inline, disabled && styles.disabled)}
                     onClick={() => handleClick(option.value)}>
                    {labelPosition === 'left' && <p className={styles.label}>{option.label}</p>}
                    <span
                        className={classnames('material-icons', styles.box, labelPosition === 'left' && styles.reversed)}
                    >
                        {option.value === value ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                    {labelPosition === 'right' && <p className={styles.label}>{option.label}</p>}
                </div>
            ))}
        </div>
    );
}

export default Radio;