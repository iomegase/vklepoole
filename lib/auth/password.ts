import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SCRYPT_KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString(
    "hex",
  );

  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, currentHash] = storedHash.split(":");

  if (!salt || !currentHash) {
    return false;
  }

  const currentBuffer = Buffer.from(currentHash, "hex");
  const candidateBuffer = scryptSync(password, salt, SCRYPT_KEY_LENGTH);

  if (currentBuffer.length !== candidateBuffer.length) {
    return false;
  }

  return timingSafeEqual(currentBuffer, candidateBuffer);
}
