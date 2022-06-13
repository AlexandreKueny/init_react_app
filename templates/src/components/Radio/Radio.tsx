import React from 'react';
import styles from './Radio.module.scss';
import classnames from "classnames";
import useRipple from "../../hooks/useRipple";

interface RadioProps<TValue> {
    options: { label: string; value: TValue }[];
    value: TValue
    onChange?: (value: TValue) => void
    labelPosition?: 'left' | 'right';
    disabled?: boolean;
    inline?: boolean;
    ripple?: boolean;
}

interface RadioItemProps<TValue> {
    option: { label: string; value: TValue };
    value: TValue
    labelPosition?: 'left' | 'right';
    disabled?: boolean;
    inline?: boolean;
    onClick?: (value: TValue) => void;
    ripple: boolean;
}

function RadioItem<TValue>({
                               option,
                               value,
                               labelPosition,
                               disabled,
                               inline,
                               onClick,
                               ripple,
                           }: RadioItemProps<TValue>) {
    const rippleRef = useRipple<HTMLDivElement>(ripple, styles);

    return (
        <div className={classnames(styles.item, inline && styles.inline, disabled && styles.disabled)}
             onClick={() => onClick?.(option.value)} ref={rippleRef}>
            {labelPosition === 'left' && <p className={styles.label}>{option.label}</p>}
            <span
                className={classnames('material-icons', styles.box, labelPosition === 'left' && styles.reversed)}
            >
                        {option.value === value ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
            {labelPosition === 'right' && <p className={styles.label}>{option.label}</p>}
        </div>
    )
}

function Radio<TValue>({
                           options,
                           value,
                           onChange,
                           labelPosition = 'right',
                           disabled,
                           inline,
                           ripple = true,
                       }: RadioProps<TValue>) {
    const handleClick = (val: TValue) => {
        if (disabled) return;
        onChange?.(val);
    }

    return (
        <div className={classnames(styles.radio, inline && styles.inline)} data-testid="radio">
            {options.map((option, i) => (
                <RadioItem key={i} option={option} value={value} {...{ labelPosition, disabled, inline, ripple }}
                           onClick={handleClick}/>
            ))}
        </div>
    );
}

export default Radio;