import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {create} from "zustand"


interface UserStore {
  authed: boolean | null;
  loading: boolean;
  user: any;
  error: any;
  setAuthed: (what: boolean) => void;
  setLoading: (what: boolean) => void;
  setUser: (what: any) => void;
  setError: (what: any) => void;
}


export const useUser = create<UserStore>((set) => ({
  authed: null,
  loading: true,
  user: null,
  error: null,
  setAuthed: (what: boolean) => set(state => ({authed: what})),
  setLoading: (what: boolean) => set(state => ({loading: what})),
  setUser: (what: any) => set(state => ({user: what})),
  setError: (what: any) => set(state => ({error: what})),
  
}))


export const UserProvider = ({children}: {children: JSX.Element}) => {
  const user = useUser();

  useQuery({
      queryKey: ["fetching-user"],
      queryFn: async () => {
        return axios.get("http://localhost:8080/oauth/v1/current-user", {headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access-token")
        }}).catch(e => {
          user.setLoading(false)
          user.setError(e.response.data.errors);
          user.setAuthed(false);
          user.setUser(null);
          return false;
        }).then((v: any) => {
          user.setAuthed(v.data.success);
          user.setError(null);
          user.setUser(v.data.data);
          user.setLoading(false)
          return true;
        })
      }
  })

  return children;
}
