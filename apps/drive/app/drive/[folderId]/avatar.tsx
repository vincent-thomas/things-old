'use client';
import { Avatar } from '@things/ui';
const A = ({ userId }: { userId?: string }) => (
  <Avatar
    src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${userId}`}
    alt="User generated profile picture"
    fallbackText="User generated profile picture"
  />
);

export { A as Avatar };
