import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
  locale: string;
  createdAt: string;
}

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
  setAuthed: (what: boolean) => set((state) => ({ authed: what })),
  setLoading: (what: boolean) => set((state) => ({ loading: what })),
  setUser: (what: any) => set((state) => ({ user: what })),
  setError: (what: any) => set((state) => ({ error: what }))
}));

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const user = useUser();

  useQuery({
    queryKey: ["fetching-user"],
    queryFn: async () => {
      return axios
        .get("http://localhost:8080/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })
        .catch((e) => {
          user.setLoading(false);
          user.setError(e.response.data.errors);
          user.setAuthed(false);
          user.setUser(null);
          return false;
        })
        .then((v: unknown) => {
          user.setAuthed(!!v.data.id);
          user.setError(null);
          user.setUser(v.data);
          user.setLoading(false);
          return true;
        });
    }
  });

  return children;
};
