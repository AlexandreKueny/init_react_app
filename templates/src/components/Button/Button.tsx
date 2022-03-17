import React, { FC } from 'react';
import styles from './Button.module.scss';
import Spinner from "../Spinner/Spinner";
import classNames from 'classnames';

interface ButtonProps {
    loading?: boolean;
    disabled?: boolean;
    outline?: boolean;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
                                     loading,
                                     disabled,
                                     outline,
                                     onClick,
                                     children
                                 }) => {
    const handleClick = () => {
        if (!(disabled || loading)) {
            onClick?.();
        }
    }
    return (
        <div
            className={classNames(
                styles.button,
                outline ? styles.outline : styles.plain,
                disabled && styles.disabled
            )}
            data-testid="button"
            onClick={handleClick}
        >
            {loading && <Spinner color={disabled ? 'gray' : 'blue'}/>}
            {!loading && children}
        </div>
    );
}

export default Button;