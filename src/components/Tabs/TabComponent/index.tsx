import useTabComponent, { TabComponentProps } from "./useTabComponent"
import Loading from "@/components/Loading"


export default function TabComponent<UserT>(props: TabComponentProps<UserT>) {
    const tabComponent = useTabComponent(props)

    return (
        <div
            role="tabpanel"
            hidden={props.currentTabIndex !== props.tabIndex}
            id={`simple-tabpanel-${props.tabIndex}`}
            aria-labelledby={`simple-tab-${props.tabIndex}`}
            className="w-full overflow-y-auto"
        >
            <input
                className="p-2 border border-gray-500 outline-none rounded-full w-full mb-3"
                type="text"
                placeholder="Search username"
                value={tabComponent.inputValue}
                onChange={tabComponent.handleInputValueChange}
                disabled={tabComponent.loadingUsers}
            />
            {
                tabComponent.loadingUsers
                    ? (<LoadingComp />)
                    : tabComponent.users.length === 0 ?
                        (<NoUsersFound />)
                        :
                        (
                            // TODO: move li element to this component
                            <ul className="w-full space-y-4">
                                {
                                    tabComponent.users.map(
                                        user => props.children(user, tabComponent.setUsers)
                                    )
                                }
                            </ul>
                        )
            }
        </div>
    )
}

const LoadingComp = () => (
    <div className="size-full grid place-items-center">
        <Loading height={50} width={50} />
    </div>
)

const NoUsersFound = () => (
    <div className="grid place-items-center h-full">
        <p className="text-gray-500 font-semibold text-lg">No users found</p>
    </div>
)