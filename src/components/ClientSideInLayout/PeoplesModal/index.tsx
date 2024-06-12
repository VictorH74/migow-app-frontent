/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from "react"
import UserTile from "./UserTile";
import ModalContainer from "@/components/ModalContainer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { PeoplesModalStatus, RetrievedUserType } from "@/types";
import { styled } from '@mui/material/styles';
import { peoplesModalUserMock } from "@/mockData";
import TabComponent from "./TabComponent";

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

// TODO: fetch users from users service
const findPeoples = async (inputValue: string) => {
    // WITH CLIENTHTTP
    // return clientHTTP.findUsersByUsernamePrefix(inputValue)
    return new Promise<RetrievedUserType[]>((resolve) => {
        setTimeout(() => {
            resolve(
                peoplesModalUserMock.filter(user => user.username.startsWith(inputValue))
            )
        }, 700)
    })
}
// TODO: fetch users from users service
const findFollowers = async (inputValue: string) => {
    // WITH CLIENTHTTP
    // return clientHTTP.findFollowersByUsernamePrefix(inputValue)
    return new Promise<RetrievedUserType[]>((resolve) => {
        setTimeout(() => {
            resolve(
                peoplesModalUserMock.filter(user => user.username.startsWith(inputValue) && user.isFollowed)
            )
        }, 700)
    })
}

export default function PeoplesModal(props: PeoplesModalProps) {
    const [tabIndex, setTabIndex] = React.useState(() => props.peoplesModalStatus === "inPeoples" ? 0 : 1);

    const handleTabIndexChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

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