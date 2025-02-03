import React from "react";

type Props = {
  isLogin: boolean;
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  required: boolean;
};

export const TextInput: React.FC<Props> = ({ isLogin, id, label, type, name, value, setState, placeholder, required }) => {
  return (
    <>
      <div className="mb-3">
        {!isLogin && (
          <label htmlFor={id} className="sky-form-label fw-bold ms-1">
            {label}
          </label>
        )}
        <input type={type} className="form-control sky-input" id={id} name={name} value={value} placeholder={placeholder} onChange={(e) => setState(e.target.value)} required={required} />
      </div>
    </>
  );
};
