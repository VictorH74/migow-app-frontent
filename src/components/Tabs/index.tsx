/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ResponsePageInterface } from '@/interfaces/ResponsePage';
import TabComponent from './TabComponent';
import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabsProps {
    initialTabIndex?: number;
    tabGenerateArray: {
        label: string;
        queryFunc(inputValue: string): Promise<ResponsePageInterface<any>>;
        children(
            pageContentItem: any,
            currentTabIndex: number,
            setUsers: React.Dispatch<React.SetStateAction<any[]>>
        ): React.ReactElement;
    }[];
}

export default function Tabs(props: TabsProps) {
    const [tabIndex, setTabIndex] = React.useState(0);

    React.useEffect(() => {
        if (props.initialTabIndex) setTabIndex(props.initialTabIndex);
    }, []);

    const handleTabIndexChange = (
        _: React.SyntheticEvent,
        newValue: number
    ) => {
        setTabIndex(newValue);
    };

    return (
        <div className="px-4 flex flex-col items-center gap-3 size-full">
            <StyledTabs
                value={tabIndex}
                onChange={handleTabIndexChange}
                aria-label="basic tabs example"
            >
                {props.tabGenerateArray.map((data, index) => (
                    <StyledTab
                        key={data.label}
                        label={data.label}
                        {...a11yProps(index)}
                    />
                ))}
            </StyledTabs>

            {props.tabGenerateArray.map((data, index) => (
                <TabComponent
                    key={data.label}
                    tabIndex={index}
                    currentTabIndex={tabIndex}
                    queryFunc={data.queryFunc}
                >
                    {(pageContentItem, setState) =>
                        props.tabGenerateArray[tabIndex].children(
                            pageContentItem,
                            index,
                            setState
                        )
                    }
                </TabComponent>
            ))}
        </div>
    );
}
