import { Response } from "express";

export function validateUsername(username: string) {
  if (!username) {
    return "Username is required";
  }
  if (username.length > 15) {
    return "Username must be less than 15 characters";
  }

  return null;
}

export function validatePassword(password: string) {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one digit";
  }
  if (password.length > 20) {
    return "Password must be at max 20 characters long";
  }

  return null;
}

export function createResponse(
  res: Response,
  status?: number,
  data?: string | object
) {
  res.status(status || 500);

  const finalResponse = {
    status,
    data,
  };

  return finalResponse ? res.send(finalResponse) : res.end();
}
