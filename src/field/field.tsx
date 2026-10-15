import type { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";
import "./field.scss";

type FieldProps = {
  id: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  value: string | number | null;
  disabled?: boolean;
  autoFocus?: boolean;
  errorMsg?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  className?: string;
  transform?: string;
};

export default function Field({
  id,
  label,
  type = "text",
  value,
  disabled,
  autoFocus,
  errorMsg,
  onChange,
  placeholder,
  required,
  min,
  max,
  className = "",
  transform,
}: FieldProps) {
  const labelContent = label?.includes("*") ? (
    <>
      {label.replace("*", "")} <span className="star">*</span>
    </>
  ) : (
    label || <span>&nbsp;</span>
  );
  const inputClassName = [className, transform].filter(Boolean).join(" ");

  return (
    <div className="field">
      <div className={`text-field ${inputClassName}`}>
        <label htmlFor={id}>{labelContent}</label>
        <input
          id={id}
          type={type}
          required={required}
          disabled={disabled}
          onChange={onChange}
          value={value ?? ""}
          aria-label={label}
          autoFocus={autoFocus}
          placeholder={placeholder}
          min={min}
          max={max}
        />
        <div className="form-error" role="alert">
          {errorMsg}
        </div>
      </div>
    </div>
  );
}
