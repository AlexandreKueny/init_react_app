import React, { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import Spinner from "../Spinner/Spinner";
import classNames from 'classnames';
import useRipple from "../../hooks/useRipple";

interface ButtonProps {
    loading?: boolean;
    disabled?: boolean;
    outline?: boolean;
    onClick?: () => void;
    ripple?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
                                                        loading,
                                                        disabled,
                                                        outline,
                                                        onClick,
                                                        ripple = true,
                                                        children
                                                    }) => {
    const rippleRef = useRipple<HTMLButtonElement>(ripple, styles)

    const handleClick = () => {
        if (!(disabled || loading)) {
            onClick?.();
        }
    }
    return (
        <button
            className={classNames(
                styles.button,
                outline ? styles.outline : styles.plain,
                disabled && styles.disabled,
            )}
            data-testid="button"
            onClick={handleClick}
            disabled={disabled}
            ref={rippleRef}
        >
            {loading && <Spinner color={disabled ? 'gray' : 'blue'}/>}
            {!loading && children}
        </button>
    );
}

export default Button;