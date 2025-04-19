import { useFormContext } from "react-hook-form";
import styles from "./Input.module.scss";
import { TInputProps } from "./Input.types";

const Input = ({ props }: TInputProps) => {
    const formContext = useFormContext();
    const registeredInput = formContext?.register(props.name) || {};
    const errorMessage = formContext?.formState?.errors[props.name]?.message;

    return (
        <div className={styles.inputGroup}>
            <input
                {...registeredInput}
                {...props}
                className={errorMessage ? styles.errorInput : ""}
                autoComplete="on"
            />
            {errorMessage && (
                <p className={styles.errorMessage}>{`${errorMessage}`}</p>
            )}
        </div>
    );
};

export default Input;