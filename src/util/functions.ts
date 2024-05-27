import { SxProps } from "@mui/material";

const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export const stringAvatar = (name: string, extendSx?: SxProps) => ({
    sx: {
        bgcolor: stringToColor(name),
        ...extendSx
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase(),
})

export const formatISODate = (ISODate: string) => {
    const date = new Date(ISODate);
    const currentDate = new Date()

    const year = date.getFullYear()
    const currentYear = currentDate.getFullYear()
    if (year < currentYear)
        return currentYear - year + "y"

    const month = date.getMonth()
    const currentMonth = currentDate.getMonth()
    if (month < currentMonth)
        return currentMonth - month + "M"

    const day = date.getDate()
    const currentDay = currentDate.getDate()
    if (day < currentDay)
        return currentDay - day + "d"

    const hours = date.getHours()
    const currentHours = currentDate.getHours()
    if (hours < currentHours)
        return currentHours - hours + "h"

    const minutes = date.getMinutes()
    const currentMinutes = currentDate.getMinutes()
    if (minutes < currentMinutes)
        return currentMinutes - minutes + "m"

    return "now"
}