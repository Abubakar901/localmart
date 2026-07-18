  import NextAuth from "next-auth";
  import Google from "next-auth/providers/google";
  import Credentials from "next-auth/providers/credentials";
  import bcrypt from "bcryptjs";

  import { connectDB } from "@/lib/database";
  import { User } from "@/models/User";

  export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
      Google,
      Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          await connectDB();

          const user = await User.findOne({ email: credentials?.email });
          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials!.password as string,
            user.password,
          );
          if (!isValid) return null;

          return { id: user._id.toString(), email: user.email };
        },
      }),
    ],
    session: { strategy: "jwt" },
  });