export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
}

export interface AdminAuthResponse {
    jwt: string
    expiresIn: string
}

export interface OrderCreateResponse {
    name: string
}