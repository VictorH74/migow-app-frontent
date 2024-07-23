import Avatar from "@/components/Avatar";
import ModalContainer from "@/components/ModalContainer";
import { UserInterface } from "@/interfaces/User";

interface EditProfileModalProps {
    onClose(): void
    ownerUser: UserInterface.ProfileType
}

const userBio = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci dolor necessitatibus dicta esse pariatur cupiditate veritatis possimus ab iure quae! Consequuntur incidunt animi a voluptates illum fuga sunt tempore voluptatem."

export default function EditProfileModal(props: EditProfileModalProps) {
    return (
        <ModalContainer onClose={props.onClose} >
            <div>
                <div>
                    <Avatar image={props.ownerUser.profileImageUrl || props.ownerUser.name} avatarSxProps={{ width: 165, height: 165, fontSize: 40 }} />
                    <div>
                        <input type="text" value={props.ownerUser.name} />
                        <input type="text" value={userBio} />
                    </div>
                </div>
                <div>
                    <input type="password" placeholder="previous password" />
                    <input type="password" placeholder="new password" />
                </div>
            </div>
        </ModalContainer>
    )
}