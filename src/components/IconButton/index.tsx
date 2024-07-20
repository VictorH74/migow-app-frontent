import React from 'react';
import useIconButton from "./useIconButton"
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps {
  label?: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  rest?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  onClick(e?: React.MouseEvent<HTMLButtonElement>): void
  isActive?: boolean
  transparentBg?: boolean
  labelClassName?: string
  direction?: "vertical" | "horizontal"
  iconSize?: number
}


export default function IconButton(props: IconButtonProps) {
  const hook = useIconButton();

  return (
    <button
      key={props.label}
      {...props.rest}
      className={twMerge(
        'text-center group hover:text-cyan-400 duration-200 text-gray-500 p-2 rounded-md relative',
        !props.transparentBg ? "bg-gray-200 hover:bg-gray-100" : "",
        props.direction === "horizontal" ? "flex gap-2 items-center" : undefined
      )}
      onClick={props.onClick}
    >
      <props.Icon sx={{ width: props.iconSize || 30, height: props.iconSize || 30 }} className={twMerge('', props.isActive ? "text-cyan-400" : "")} />
      {props.label && (
        <p
          className={twMerge(`
                group-hover:bg-gradient-to-r 
                group-hover:from-red-200 
                group-hover:from-10% 
                group-hover:via-blue-500 
                group-hover:via-50% 
                group-hover:to-cyan-400 
                group-hover:to-100% 
                group-hover:bg-clip-text 
                group-hover:text-transparent 
                duration-150`, props.isActive ? "text-gradient" : "", props.labelClassName)}
        >{props.label}</p>
      )}
    </button>
  );
}