import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className,
    ...props
}) => {
    const variantClass = styles[variant];
    const widthClass = fullWidth ? styles.fullWidth : '';

    return (
        <button
            className={`${styles.button} ${variantClass} ${widthClass} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};
