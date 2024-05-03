import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type AddProfileFormData = {
  username: string;
  mobile: string;
  dob: string;
  bio: string;
  location: string;
  gender?: string;
  profile?: string;
};

// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   " image/png",
//   "image/webp",
// ];
const isDateOfBirthValid = (value:any) => {
  // Parse the date of birth string into a Date object
  const dob = new Date(value);
  
  // Calculate the age by subtracting the year of birth from the current year
  const age = new Date().getFullYear() - dob.getFullYear();
  
  // Check if the calculated age is greater than or equal to 16
  return age >= 16;
};
export const schema: ZodType<AddProfileFormData> = z.object({
  username: z
    .string()
    .min(2, {
      message: "must contain at least 2 characters",
    })
    .max(30, { message: " name cannot exceed 30 characters" })
    .regex(/^[A-Za-z][A-Za-z\s]*$/, {
      message: "name must contain only alphabetic characters",
    }),
  mobile: z.string().refine((value) => value.length === 10, {
    message: "number must have exactly 10 numbers",
  }),
  bio: z.string()  .min(1, {
    message: "bio is empty",
  }).max(50, { message: " name cannot exceed 30 characters" }),
  dob: z.string()
    .refine(isDateOfBirthValid, {
      message: "At least 16 years old",
  }),
  location: z.string().min(2, {
    message: "location not match",
  }),
  gender: z.string().refine((value) => ["male", "female"].includes(value), {
    message: "Please select a valid gender",
  }),
});

export const useAddProfleValidate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProfileFormData>({ resolver: zodResolver(schema) });
  console.log("ooyaaa");
  
  return {
    register,
    handleSubmit,
    errors,
  };
};
