"use server";

import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

import { SessionSchema } from "@/lib/schemas";

export type SessionPayload = {
  name: string;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const sessionExpirationTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return undefined;
  }
}

export async function createSession(name: string) {
  const expiresAt = new Date(Date.now() + sessionExpirationTime);
  const session = await encrypt({ name, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export const getSession = async (): Promise<SessionPayload | undefined> => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const validatedFields = SessionSchema.safeParse(session);

  return validatedFields.success ? validatedFields.data : undefined;
};

export const cachedGetSession = cache(getSession);

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + sessionExpirationTime);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
