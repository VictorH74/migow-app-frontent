import React from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps {
    value: string;
    placeholder?: string;
    onChange(value: string): void;
    className?: string
}

export default function TextArea(props: TextAreaProps) {
    const ref = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        const textarea = ref.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight + 2}px`;
        }
    }, [props.value]);

    return (
        <textarea
            ref={ref}
            className={twMerge("border-2 p-2 rounded-md outline-gray-400 autofill:none resize-none overflow-hidden", props.className)}
            rows={1}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => {
                let value = e.currentTarget.value
                props.onChange(value);
            }}
        />
    );
}