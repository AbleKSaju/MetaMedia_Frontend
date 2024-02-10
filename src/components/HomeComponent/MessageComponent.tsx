import { SetSidebarOpenFunction } from "src/pages/user/Home"

const Message: React.FC<SetSidebarOpenFunction> = ({setSidebarOpen}) => {

    setSidebarOpen(true)
    return (
        <>
        <div>message</div>
        </>
    )
}

export default Message