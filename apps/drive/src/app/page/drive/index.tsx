import { Suspense, lazy } from "react"



const Page = lazy(() => import('./page'));

const Protected = () => {
  return <Suspense fallback={<div>loading...</div>}><Page /></Suspense>
}

export default Protected;