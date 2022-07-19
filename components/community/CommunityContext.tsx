import axios from "axios";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

export type CommunityContextProps = {
    show: boolean
    setShow: Dispatch<SetStateAction<Boolean>>
    getCommunity: Function;
}

export const CommunityContext = createContext<CommunityContextProps | {}>({});

export function CommunityContextProvider({children}:any) {
    const [show,setShow] = useState(false);
    const [communityInfo,setCommunityInfo] = useState({});
    const [loading,setLoading] = useState(true);
    
    const getCommunity = async (community:string) => {
        try {
            setLoading(true)
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const res = await axios.get(server+'/communities/'+community, {withCredentials:true})
                setCommunityInfo(res.data);
                setLoading(false)
        } catch (err) {
            setLoading(true)
        }
    }

    return (
        <CommunityContext.Provider value={{show,setShow,loading, getCommunity, ...communityInfo}}>
            {children}
        </CommunityContext.Provider>
    );
}