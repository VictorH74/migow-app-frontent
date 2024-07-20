import React from "react"
import useTabComponent, { TabPanelProps } from "../useTabComponent"
import Image from "next/image";
import circleImg from "@/assets/gradient-circle-img.png"

export default function TabComponent(props: TabPanelProps) {
    const hook = useTabComponent(props);

    return (
        <div
            role="tabpanel"
            hidden={props.currentTabIndex !== props.tabIndex}
            id={`simple-tabpanel-${props.tabIndex}`}
            aria-labelledby={`simple-tab-${props.tabIndex}`}
            className="w-full grow"
        >
            <input
                className="p-2 border border-gray-500 outline-none rounded-full w-full"
                type="text"
                placeholder="Search username"
                value={hook.inputValue}
                onChange={hook.handleInputValueChange}
                disabled={hook.loading}
            />

            {
                hook.loading
                    ? (
                        <div className="size-full grid place-items-center">
                            <Image className=" animate-spin" width={50} height={50} alt="loading circle image" src={circleImg} />
                        </div>
                    )
                    : hook.users.length === 0 ?
                        (
                            <div className="grid place-items-center h-full">
                                <p className="text-gray-500 font-semibold text-lg">No users found</p>
                            </div>
                        )
                        :
                        (
                            <ul className="flex flex-col gap-2 w-full overflow-auto h-full">
                                {
                                    hook.users.map(user => props.children(user))
                                }
                            </ul>
                        )
            }

        </div>
    )
}