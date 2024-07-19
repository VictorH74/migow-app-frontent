/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from "react"
import UserTile from "./UserTile";
import ModalContainer from "@/components/ModalContainer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { PeoplesModalStatus, RetrievedUserType } from "@/types";
import { styled } from '@mui/material/styles';
import TabComponent from "./TabComponent";
import useClientHTTP from "@/hooks/useClientHTTP";

interface PeoplesModalProps {
    onClose(): void
    peoplesModalStatus: PeoplesModalStatus
}

export interface TabPanelProps {
    children(user: RetrievedUserType): React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 2,
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        background: "linear-gradient(90deg, #fecaca 0%, #3b82f6 50%, #22d3ee 100%)",
    },
});



export default function PeoplesModal(props: PeoplesModalProps) {
    const [tabIndex, setTabIndex] = React.useState(() => props.peoplesModalStatus === "inPeoples" ? 0 : 1);
    const clientHTTP = useClientHTTP()

    const handleTabIndexChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const findPeoples = React.useCallback(async (inputValue: string) => {
        // TODO: get current user id
        // WITH CLIENTHTTP
        return clientHTTP.getAllUserByUsernamePrefix("fc7dc70e-067b-414d-8a9d-35a2bb5c8736", inputValue);
    }, [])

    const findFollowers = React.useCallback(async (inputValue: string) => {
        // TODO: get current user id
        // WITH CLIENTHTTP
        return clientHTTP.getAllFriendByUsernamePrefix("fc7dc70e-067b-414d-8a9d-35a2bb5c8736", inputValue)
    }, [])

    return (
        <ModalContainer
            onClose={props.onClose}
        >
            <div
                className="px-4 flex flex-col items-center gap-3 size-full"
            >
                <StyledTabs value={tabIndex} onChange={handleTabIndexChange} aria-label="basic tabs example">
                    <StyledTab label="Peoples" {...a11yProps(0)} />
                    <StyledTab label="Followers" {...a11yProps(1)} />
                </StyledTabs>

                {/* Peoples list */}
                <TabComponent
                    tabIndex={0}
                    currentTabIndex={tabIndex}
                    queryFunc={findPeoples}
                >
                    {(user) => <UserTile key={user.id} {...user} />}
                </TabComponent>

                {/* Followers list */}
                <TabComponent
                    tabIndex={1}
                    currentTabIndex={tabIndex}
                    queryFunc={findFollowers}
                >
                    {(user) => <UserTile key={user.id} {...user} />}
                </TabComponent>
            </div>
        </ModalContainer>
    )

}