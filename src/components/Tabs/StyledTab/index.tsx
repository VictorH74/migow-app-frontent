import { styled, Tab } from "@mui/material";


interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)({
    '&.Mui-selected': {
        background: "linear-gradient(90deg, #fecaca 0%, #3b82f6 50%, #22d3ee 100%)",
        "WebkitTextFillColor": "transparent",
        backgroundClip: "text",
    },
});

export default StyledTab;