import Image from "next/image"
import useTabComponent, { TabComponentProps } from "./useTabComponent"
import circleImg from "@/assets/gradient-circle-img.png"


export default function TabComponent<UserT>(props: TabComponentProps<UserT>) {
    const tabComponent = useTabComponent(props)

    return (
        <div
            role="tabpanel"
            hidden={props.currentTabIndex !== props.tabIndex}
            id={`simple-tabpanel-${props.tabIndex}`}
            aria-labelledby={`simple-tab-${props.tabIndex}`}
            className="w-full grow"
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
                    ? (<Loading />)
                    : tabComponent.users.length === 0 ?
                        (<NoUsersFound />)
                        :
                        (
                            // TODO: move li element to this component
                            <ul className="flex flex-col gap-2 w-full overflow-y-auto h-full border-2">
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

const Loading = () => (
    <div className="size-full grid place-items-center">
        <Image
            className=" animate-spin"
            width={50} height={50}
            alt="loading circle image"
            src={circleImg}
        />
    </div>
)

const NoUsersFound = () => (
    <div className="grid place-items-center h-full">
        <p className="text-gray-500 font-semibold text-lg">No users found</p>
    </div>
)