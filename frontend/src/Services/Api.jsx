const BASE_URL=import.meta.env.VITE_API_URL;

export const AuthApi={
    VOTER_LOGIN_API:BASE_URL+"/voter/login",
    VOTER_REGISTER_API:BASE_URL+"/voter/register",
    SEND_OTP:BASE_URL+"/voter/sendOtp",
    ADMIN_LOGIN_API:BASE_URL+"/admin/login",
    ADMIN_REGISTER_API:BASE_URL+"/admin/register"
}