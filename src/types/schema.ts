import { z } from "zod";

export const validationSchema = z.object({
  email: z
    .string({
      required_error: "البريد الإلكتروني يجب أن لا يكون فارغًا",
    })
    .email("البريد الإلكتروني غير صالح"),
  password: z
    .string({
      required_error: "كلمة المرور يجب أن لا تكون فارغة",
    })
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type ValidationSchemaType = z.infer<typeof validationSchema>;

export interface IUser {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: [
    {
      displayName?: string;
      email: string;
      phoneNumber?: string;
      photoURL?: string;
      providerId: string;
      uid: string;
    }
  ];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  uid: string;
}
