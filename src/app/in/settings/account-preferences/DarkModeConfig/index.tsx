"use client"

import React from "react"
import ConfigTile from "../../components/ConfigTile"
import { twMerge } from "tailwind-merge"

// interface DarkModeConfigProps {
//     currentValues: 
// }

export default function DarkModeConfig() {
    const [value, setValue] = React.useState(0)
    const deviceOpButtonRef = React.useRef<HTMLButtonElement>(null);
    const onOpButtonRef = React.useRef<HTMLButtonElement>(null);
    const offOpButtonRef = React.useRef<HTMLButtonElement>(null);

    const btnData = React.useMemo(() => [
        {
            ref: deviceOpButtonRef,
            label: "Device",
            onClick: () => setValue(0),
            selected: value === 0
        },
        {
            ref: onOpButtonRef,
            label: "On",
            onClick: () => setValue(1),
            selected: value === 1
        },
        {
            ref: offOpButtonRef,
            label: "Off",
            onClick: () => setValue(2),
            selected: value === 2
        },
    ], [value])

    return (
        <ConfigTile
            label='Dark Mode'
            formContent={
                <div className="my-3 flex gap-1 min-w-[300px] rounded-md overflow-hidden">
                    {
                        btnData.map(btn => (
                            <button type="button" key={btn.label} className={twMerge("grow py-1 bg-gray-400 text-white duration-200", btn.selected ? "bg-gray-300" : "")} onClick={btn.onClick}>{btn.label}</button>

                        ))
                    }
                </div>
            }
            onSubmit={async () => { }}
        />
    )
}