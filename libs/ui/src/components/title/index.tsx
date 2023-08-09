import { ReactNode } from "react"
import { title } from "./title.css"


export const Title = ({children, className}: {children: ReactNode, className: string}) => {
  return <h1 className={`${title} ${className}`}>{children}</h1>
}