import {hash, argon2id, verify} from 'argon2'

export const createPasswordHash = (password: string) =>
  hash(password, {
    type: argon2id,
  })

export const verifyPasswordHash = (hash: string, password: string) =>
  verify(hash, password, {
    type: argon2id
  })
