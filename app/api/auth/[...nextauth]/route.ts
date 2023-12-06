import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma"
import { GOOGLE_SECRET, GOOGLE_CLIENT_ID } from "@/app/utils/constants";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              throw Error("Enter login credentials")
            }
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })
             if (!user) {
               throw new Error("This user does not exist");
             }
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword as string)
            if (!isPasswordCorrect) {
                throw Error('Wrong email and password combination')
            }
            return user;
            
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };