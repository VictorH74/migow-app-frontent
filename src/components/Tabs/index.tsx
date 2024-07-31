/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import TabComponent from "./TabComponent";
import StyledTabs from "./StyledTabs";
import StyledTab from "./StyledTab";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabsProps<UserT> {
    initialTabIndex?: number,
    generateChildren(user: UserT, currentTabIndex: number, setUsers: React.Dispatch<React.SetStateAction<UserT[]>>): React.ReactElement
    tabGenerateArray: { label: string, queryFunc(inputValue: string): Promise<ResponsePageInterface<UserT>> }[]

}

export default function Tabs<UserT>(props: TabsProps<UserT>) {
    const [tabIndex, setTabIndex] = React.useState(0);

    React.useEffect(() => {
        if (props.initialTabIndex)
            setTabIndex(props.initialTabIndex)
    }, [])

    const handleTabIndexChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div
            className="px-4 flex flex-col items-center gap-3 size-full"
        >
            <StyledTabs value={tabIndex} onChange={handleTabIndexChange} aria-label="basic tabs example">
                {props.tabGenerateArray.map((data, index) => (
                    <StyledTab key={data.label} label={data.label} {...a11yProps(index)} />
                ))}
            </StyledTabs>

            {props.tabGenerateArray.map((data, index) => (
                <TabComponent<UserT>
                    key={data.label}
                    tabIndex={index}
                    currentTabIndex={tabIndex}
                    queryFunc={data.queryFunc}
                >
                    {(user, setUsers) => props.generateChildren(user, index, setUsers)}
                </TabComponent>
            ))}
        </div>
    )
}
