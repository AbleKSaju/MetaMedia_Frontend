import { SetSidebarOpenFunction } from "src/pages/user/Home"

const Post: React.FC<SetSidebarOpenFunction> = ({setSidebarOpen}) => {

    setSidebarOpen(true)
    return (
        <>
        
        <div>post</div>
        </>
    )
}

export default Post

