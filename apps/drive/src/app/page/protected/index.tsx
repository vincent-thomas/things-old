import axios from "axios"
import { useEffect, useState } from "react"
import { useUser } from "../../providers/user";

const Protected = () => {
const [result, setResult] = useState<any>({});
  const value = useUser()

console.log(value.authed)


  if (value.loading) {
    return <>loading..</>
  }

  if (value.authed) {
    return <>not authed</>
  }

  return <>Hello {result?.fullName}<br />{JSON.stringify(value.user)}</>
}

export default Protected;