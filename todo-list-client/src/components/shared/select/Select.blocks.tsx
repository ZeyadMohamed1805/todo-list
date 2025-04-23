import { TOptionsProps } from "./Select.types";

export const Options = ({ props }: TOptionsProps) => {
    return props.options.map((option, index) => (
        <option key={index} value={option.value}>
            {option.label}
        </option>
    ));
}