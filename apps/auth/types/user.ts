export interface User {
  id: string;
  email: string;
  key: string;
  encryptionKey: Buffer;
}

export interface UserSession {
  userId: string;
  sessionId: string;
}
