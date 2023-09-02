import * as A from "@radix-ui/react-avatar";

interface AvatarProps {
  src: string;
  alt: string;
  fallbackText: string;
}

export const Avatar = (props: AvatarProps) => (
  <A.Root
    {...props}
    className={
      "inline-flex items-center justify-center align-middle overflow-hidden select-none w-[45px] height-[45px] rounded-[100%] bg-gray-600"
    }
  >
    <A.Image
      src={props.src}
      alt={props.alt}
      className={"w-[100%] h-[100%] object-cover rounded-[inherit]"}
    />
    <A.Fallback
      delayMs={600}
      className={
        "w-[100%] h-[100%] flex items-center justify-center bg-white text-red-600 text-[15px] leading-none font-[500]"
      }
    >
      {props.fallbackText}
    </A.Fallback>
  </A.Root>
);
