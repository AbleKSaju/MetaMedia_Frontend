import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";


export type ChangePasswordFormData = {
    password: string;
    confirmpassword: string; 
  };
  
  export const schema: ZodType<ChangePasswordFormData> = z.object({
    password: z
    .string()
    .min(4, {
      message: "password must contain at least 4 character(s)",
    })
    .max(20, {
      message: "password cannot exceed 20 characters",
    }),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password do not match",
    path: ["confirmpassword"],
  });

  export const useChangePasswordValidation = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ChangePasswordFormData>({ resolver: zodResolver(schema) });
  
    return {
      register,
      handleSubmit,
      errors,
    };
  };