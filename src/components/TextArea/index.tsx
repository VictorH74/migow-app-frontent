import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps {
    value: string;
    placeholder?: string;
    onChange(value: string): void;
    className?: string;
    autoFocus?: boolean;
}

export default React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    function TextArea(props, ref) {
        const innerRef = React.useRef<HTMLTextAreaElement>(null);

        React.useImperativeHandle(ref, () => innerRef.current!);

        React.useEffect(() => {
            const textarea = innerRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight + 2}px`;
            }
        }, [props.value]);

        return (
            <textarea
                ref={innerRef}
                className={twMerge(
                    'border-2 p-2 rounded-md outline-gray-400 autofill:none resize-none overflow-hidden',
                    props.className
                )}
                rows={1}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    let value = e.currentTarget.value;
                    props.onChange(value);
                }}
            />
        );
    }
);
