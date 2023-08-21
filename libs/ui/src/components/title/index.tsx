import { forwardRef } from "react"
import { title } from "./title.css"
import {cn} from "../../utils"
import { BaseChildrenProps } from "../../types/baseProps";


interface TitleProps extends BaseChildrenProps {
  removeStyles?: boolean;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(({children, UNSAFE_className = "", removeStyles = false}, ref) => {
  return <h1 className={cn({[title]: !removeStyles, [UNSAFE_className]: true})} ref={ref}>{children}</h1>
})

Title.displayName = 'Title';