// Assign initial State object here
interface initialState{
  loading:boolean;
  chat:any[];
  recording:any[];
  error:boolean;
}
export const initialState = {
  loading: false,
  chat: [],
  recording:[],
  error: false,
};

//complete the reducer function
export const reducer = (status=initialState, action:any) => {
  const {type,payload}=action;
  switch (type) {
    case "Preview_Record":{
      return {...status,recording:payload}
    }
    default: {
      throw new Error("invalid action type");
    }
  }
};
