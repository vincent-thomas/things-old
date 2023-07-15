export interface User {
  id: string;
  email: string;
  password: string;
  encryptionKey: Buffer;
}

export interface UserSession {
  userId: string;
  sessionId: string;
  createdAt: Date;
}
