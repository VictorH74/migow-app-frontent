import { SxProps } from "@mui/material"
import { formatISODate } from "@/util/functions";
// import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import usePopup from "@/hooks/usePopup";
import Avatar from "@/components/Avatar";
import { twMerge } from "tailwind-merge";
import DisplayISODate from "@/components/DisplayDate";

type MenuItemType = {
    onClick(): void,
    label: string
}

interface CardHeaderProps {
    className?: string
    avatarImage?: string,
    heading: string
    avatarSxProps?: SxProps
    href?: string
    headingClassName?: string
    ISODate?: string
    showDate?: boolean
    leftComponents?: React.ReactNode
    rightComponents?: React.ReactNode
    showMenuButton?: boolean
    menuItemObjs?: MenuItemType[]
}

export default function CardHeader(props: CardHeaderProps) {
    const popup = usePopup()
    const menuBtnId = React.useId()
    const menuId = React.useId()

    return (
        <div className={twMerge('flex px-4 justify-between items-center', props.className)}>
            <div className='flex items-center mb-2'>
                {props.avatarImage && (
                    <Avatar
                        image={props.avatarImage}
                        avatarSxProps={props.avatarSxProps}
                    />
                )}

                {props.href ? (
                    <Link className={props.headingClassName} href={props.href}>{props.heading}</Link>
                ) : (
                    <p className={props.headingClassName}>{props.heading}</p>
                )}

                {props.leftComponents}

                {props.showDate && props.ISODate && (
                    <DisplayISODate ISODate={props.ISODate} />
                )}
            </div>

            <div className="flex gap-2">
                {props.rightComponents}
                {props.showMenuButton && props.menuItemObjs && (
                    <>
                        <button
                            id={menuBtnId}
                            aria-controls={popup.open ? menuId : undefined}
                            aria-haspopup="true"
                            aria-expanded={popup.open ? 'true' : undefined}
                            onClick={popup.handleClick}
                        >
                            <div className='flex flex-row gap-[3px]'>
                                {Array(3).fill(null).map((_, i) => (<span key={i} className='bg-gray-700 size-[6px] rounded' />))}
                            </div>
                        </button>

                        <Menu
                            id={menuId}
                            anchorEl={popup.anchorEl}
                            open={popup.open}
                            onClose={popup.handleClose}
                            MenuListProps={{
                                'aria-labelledby': menuBtnId,
                            }}
                        >
                            {
                                props.menuItemObjs.map(obj => (
                                    <MenuItem key={obj.label} onClick={obj.onClick}>
                                        {obj.label}
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </>
                )}
            </div>


        </div>
    )
}