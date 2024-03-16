import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState: any = {
    title:'',
    description:'',
    file:null,
    members:[],
    admin:''
};
const newGroupSlice = createSlice({
    name:"newGroup",
    initialState,
    reducers: {
        addTitle: (state, action: PayloadAction<any>) => {
            state.title='',
            state.title=action.payload
        },
        addDescription:(state,action: PayloadAction<any>)=>{
            state.description='',
            state.description=action.payload
        },
        addMembers:(state,action: PayloadAction<any>)=>{
          state.members.push(action.payload)
        },
        removeMember: (state, action: PayloadAction<string>) => {
            state.members = state.members.filter((member: string) => member != action.payload);
        },
        clearAllMembers:(state)=>{
          state.members=[]
        },
        addAdmin:(state,action:PayloadAction<any>)=>{
            state.admin='',
            state.admin=action.payload

        },
        addFile:(state,action:PayloadAction<any>)=>{
            state.file=null,
            state.file=action.payload
        },

        
    }
})

export const { addTitle, addDescription, addMembers, removeMember, clearAllMembers, addAdmin, addFile } = newGroupSlice.actions;
export default newGroupSlice.reducer