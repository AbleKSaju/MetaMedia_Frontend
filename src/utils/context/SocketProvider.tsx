// import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
// import { io } from "socket.io-client";

// const SocketContext:any = createContext(null)

// export const useSocket = () => {
//   const socket = useContext(SocketContext);
//   return socket;
// };


// const SocketProvider = (props:any) => {
//   console.log("I AM SocketProvider");
//   const [socket,setSocket]=useState<any>()
//       useEffect(() => {
//         setSocket(io("http://localhost:8081"));
//       }, []);

// console.log(socket,"socket");

//     return (
//       <SocketContext.Provider value={socket}>
//         {props.children}
//       </SocketContext.Provider>
//     );
// }

// export default SocketProvider