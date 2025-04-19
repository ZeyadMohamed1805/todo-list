import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RegisterSchema from "./Register.schema";

export const useRegister = () => {
    const formData = useForm({
        resolver: yupResolver(RegisterSchema),
        mode: "all",
    });

    const onSubmit = formData.handleSubmit((data) => {
        console.log(data);
    });

    return { formData, onSubmit };
};