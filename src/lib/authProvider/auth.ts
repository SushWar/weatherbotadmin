import axios from "axios"
import NextAuth, { NextAuthOptions, User as UserAuth } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name:'Portal SignIN',
            credentials:{
                email:{
                    label:'Email Address',
                    type:'email',
                    placeholder:'Enter your email address',
                    autoComplete:'off'
                },
                password:{
                    label:'password',
                    type:'password',
                    placeholder:'Enter your password',
                    autoComplete:'off'
                }
            },
            async authorize(credentials, req) {
                try {
                    const body = {
                        email:credentials?.email,
                        password:credentials?.password
                    }
                    const url = process.env.BACKEND_PATH!;
                    const login = await axios.post(`${url}/admin/portal`,body)
                    return login.data
                } catch (error) {
                    return null
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_SIGN_IN_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SIGN_IN_CLIENT_SECRET as string,
        })
    ]
}