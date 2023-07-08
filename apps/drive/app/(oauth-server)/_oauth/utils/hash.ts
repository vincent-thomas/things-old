import { argon2id, hash, verify } from "argon2"

export const createHash = (text: string) => hash(text, {
  type: argon2id
})

export const verifyHash = (hash: string, text: string) => {
return verify(hash, text)
}
