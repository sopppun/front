import React from "react";
import FormCoponent from "./formCoponent";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormMakerComponent {
  formData: { name: string; label: string }[];
  register: UseFormRegister<FieldValues>;
}

const FormMakerComponent = ({ formData, register }: FormMakerComponent) => {
  return (
    <div>
      {formData.map((item, index) => (
        <FormCoponent
          key={index}
          register={register}
          name={item.name}
          label={item.label}
        />
      ))}
    </div>
  );
};

export default FormMakerComponent;

