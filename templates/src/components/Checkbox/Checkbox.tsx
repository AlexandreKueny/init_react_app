import React, { FC } from 'react';
import styles from './Checkbox.module.scss';
import classnames from 'classnames';
import useRipple from "../../hooks/useRipple";

interface CheckboxProps {
    checked?: boolean;
    onChange?: (value: boolean) => void
    label?: string;
    labelPosition?: 'left' | 'right';
    disabled?: boolean;
    ripple?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
                                         checked,
                                         onChange,
                                         label,
                                         labelPosition = 'right',
    ripple = true,
                                         disabled,
                                     }) => {
    const rippleRef = useRipple<HTMLDivElement>(ripple, styles);

    const handleClick = () => {
        if (disabled) return;
        onChange?.(!checked);
    }

    return (
        <div className={classnames(styles.checkbox, disabled && styles.disabled)} data-testid="checkbox" onClick={handleClick} ref={rippleRef}>
            {label && labelPosition === 'left' && <p className={styles.label}>{label}</p>}
            <span
                className={classnames('material-icons', styles.box, labelPosition === 'left' && styles.reversed)}
            >
                        {checked ? 'check_box' : 'check_box_outline_blank'}
                    </span>
            {label && labelPosition === 'right' && <p className={styles.label}>{label}</p>}
        </div>
    );
}

export default Checkbox;