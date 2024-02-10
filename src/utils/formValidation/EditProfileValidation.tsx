import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormSetValue, useForm } from "react-hook-form";
import { ZodType, z } from "zod";


export type EditProfileFormData = {
    username: string;
    fullname: string;
    mobile: string;
    bio: string;
    gender: string;
}


export const schema: ZodType<EditProfileFormData> = z.object({
    username: z
      .string()
      .min(2, {
        message: "must contain at least 2 characters",
      })
      .max(20, { message: " name cannot exceed 20 characters" })
      .regex(/^[A-Za-z][A-Za-z\s]*$/, {
        message: "name must contain only alphabetic characters",
      }),
    fullname: z
      .string()
      .min(2, {
        message: "must contain at least 2 characters",
      })
      .max(20, { message: " name cannot exceed 20 characters" })
      .regex(/^[A-Za-z][A-Za-z\s]*$/, {
        message: "name must contain only alphabetic characters",
      }),
    mobile: z.string().refine((value) => value.length === 10, {
      message: "number must have exactly 10 numbers",
    }),
    bio: z.string()  .min(1, {
      message: "bio is empty",
    }).max(50, { message: " name cannot exceed 30 characters" }),
    gender: z.string().refine((value) => (value), {
      message: "Please select a gender",
    }),
  });

  export const useEditProfileValidate = (
    initialValues: EditProfileFormData
  ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      // setValue,
    } = useForm<EditProfileFormData>({
      resolver: zodResolver(schema),
      defaultValues: initialValues,
    });
  
    // const setFieldValue: UseFormSetValue<EditProfileFormData> = (
    //   field: keyof EditProfileFormData,
    //   value: string
    // ) => {
    //   const sanitizedValue = value ?? "";
    //   setValue(field, sanitizedValue);
    // };
    
    return {
      register,
      handleSubmit,
      errors,
      // setFieldValue,
    };
  };
  