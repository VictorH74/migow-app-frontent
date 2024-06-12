import React from "react";

export default function useDebounce() {
    const debouncedFunction = React.useRef<ReturnType<typeof setTimeout>>()

    const debounce = (func: () => void, delay: number) => {
        if (debouncedFunction.current) {
            clearTimeout(debouncedFunction.current);
        }

        debouncedFunction.current = setTimeout(func, delay);
    };

    return debounce
}