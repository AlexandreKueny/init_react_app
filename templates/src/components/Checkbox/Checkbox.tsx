import React, { FC } from 'react';
import styles from './Checkbox.module.scss';
import classnames from 'classnames';

interface CheckboxProps {
    checked?: boolean;
    onChange?: (value: boolean) => void
    label?: string;
    labelPosition?: 'left' | 'right';
    disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
                                         checked,
                                         onChange,
                                         label,
                                         labelPosition = 'right',
                                         disabled,
                                     }) => {
    const handleClick = () => {
        if (disabled) return;
        onChange?.(!checked);
    }

    return (
        <div className={classnames(styles.checkbox, disabled && styles.disabled)} data-testid="checkbox" onClick={handleClick}>
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