// src/components/login/InputField.tsx
'use client';

import React from 'react';
import styles from '@/styles/Login.module.css';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  iconClass: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  iconClass,
}) => (
  <div className={styles.login__box}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={styles.login__input}
    />
    <i className={iconClass}></i>
  </div>
);

export default InputField;