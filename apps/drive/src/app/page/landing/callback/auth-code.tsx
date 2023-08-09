import { Button } from '@things/ui';
import {useMutation} from '@tanstack/react-query'
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';
import axios from "axios";
/* eslint-disable-next-line */
export interface LandingProps {}

const checkIsLoggedIn = async () => {
  try {
    const result = await fetch('http://localhost:5000/oauth/current-user');
    const data = await result.json();
    return !(data?.no === 'no');
  } catch {
    console.log('eeror');
    return false;
  }
};

export function AuthCodeCallback(props: LandingProps) {
const [p] = useSearchParams();
const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn: async () => {
      let result;

      try {

       result = await axios.post(`http://localhost:8080/oauth/v1/token?${qs.stringify({code: p.get("code"), client_id: "test", client_secret: "testing", grant_type: "authorization_code"})}`, ).then(v => v.data);
      }
      catch(e: any) {
        result = e.response.data;
      }
      if (result.success) {
        sessionStorage.setItem("access-token", result.data.access_token);
        navigate("/protected")
        
      }
      // const data = await result.jso();
      // return !(data?.no === 'no');
    }
  })

useEffect(() => {
mutate();
}, [])





  return <>testing</>;

}


