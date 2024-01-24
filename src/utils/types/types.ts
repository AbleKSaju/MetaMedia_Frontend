import { FieldErrors } from "react-hook-form";
import {RegisterFormData} from '../formValidation/common/register'


export interface propsType {
    errors: FieldErrors<RegisterFormData>;
  }

