import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

export type TUploadIconProps = {
    props: {
        getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
        getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    }
}