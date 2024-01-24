import {useForm} from 'react-hook-form'
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
  };

  //  Zod validation  
export const schema: ZodType<RegisterFormData> = z
.object({
  name: z
    .string()
    .min(2, {
      message: "name must contain at least 2 character(s)",
    })
    .max(30, { message: " name cannot exceed 30 characters" })
    .regex(/^[A-Za-z][A-Za-z\s]*$/, {
      message: "name must contain only alphabetic characters",
    }),
  email: z.string().email({
    message: "Please provide a valid email address",
  }),
  password: z
    .string()
    .min(4, {
      message: "password must contain at least 4 character(s)",
    })
    .max(20, {
      message: "password cannot exceed 20 characters",
    }),
})



export const useRegisterValidate = () => {
    console.log("ENTE TO FORM");
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });
    console.log("ALOOO I AMM REGISTTTRR");
    
    return {
      register,
      handleSubmit,
      errors,
    };
  };
  