import { SetSidebarOpenFunction } from "src/pages/user/Home"

const Notification: React.FC<SetSidebarOpenFunction> = ({setSidebarOpen}) => {
   setSidebarOpen(true)
 return (
    <>
     <div>notification</div>
    
    </>
 )
}

export default Notification