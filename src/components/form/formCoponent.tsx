import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface formComponetProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
}

const FormCoponent = ({ register, name, label }: formComponetProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" className="border" id={name} {...register(name)} />
    </div>
  );
};

export default FormCoponent;
