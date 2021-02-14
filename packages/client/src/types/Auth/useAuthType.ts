import firebase from 'firebase/app';

export interface IUseAuthType {
  user: Promise<firebase.User | null>;
  signIn: (email: string, password: string) => Promise<firebase.User | null>;
  signUp: (email: string, password: string) => Promise<firebase.User | null>;
  signOut: () => void;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  confirmPasswordReset: (code: string, password: string) => Promise<boolean>;
}
