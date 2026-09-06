import axiosInstance from "../lib/axios"

export const session={
    createSession:async=(data)=>{  //here data is the question for which session will be
        const response=axiosInstance.post("/session",data);
        return response.data;
    },

    getActiveSession:async=(data)=>{  //here data is the question for which session will be
        const response=axiosInstance.post("/session/active",data);
        return response.data;
    }
    
}