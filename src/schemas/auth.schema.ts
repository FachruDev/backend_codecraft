import { z } from 'zod';

// Schema for user login
export const loginSchema = z.object({
  email: z.email({ message: "Format email tidak valid" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

// Schema for user registration
export const registerSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.email({ message: "Format email tidak valid" }),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  profile: z.string().optional(),
  bio: z.string().optional(),
  role: z.string().optional(),
  groupIds: z.array(z.number().int()).optional(),
});

// Schema for refresh token
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token harus diisi'),
});

// Schema for change password
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Password saat ini harus diisi'),
  newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Password baru dan konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

// Schema for forgot password
export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Format email tidak valid" }),
});

// Schema for reset password
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token harus diisi'),
  newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Password baru dan konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

// Export types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>; 