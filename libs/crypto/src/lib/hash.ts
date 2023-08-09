import {hash, Algorithm, verify} from '@node-rs/argon2'


const ALGORITHM = Algorithm.Argon2id


export const createPasswordHash = (password: string) =>
  hash(password, {
    algorithm: ALGORITHM
  })

export const verifyPasswordHash = (hash: string, password: string) =>
  verify(hash, password, {
    algorithm: ALGORITHM
  })
