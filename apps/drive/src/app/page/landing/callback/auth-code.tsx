import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';
import axios from "axios";
import { Routes } from '../../../routes';


function AuthCodeCallback() {
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
        console.log(result)
        sessionStorage.setItem("access-token", result.data.access_token);
        navigate(Routes.browse())
      }
      else {
        throw {ERROR: "ERROR"}
      }
    }
  })

  useEffect(() => {
    mutate();
  }, [])

  return <>loading...</>;
}

export default AuthCodeCallback
