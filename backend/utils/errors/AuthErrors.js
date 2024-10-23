import { CustomError } from "./CustomError.js";

export class AuthenticationError extends CustomError {
  constructor(message = 'Authentication Failed') {
    super(message, 401, 'AUTH_EN_001');
  }
}

export class InvalidCredentialsError extends CustomError {
  constructor(message = 'Invalid Credentials (Email/Password)') {
    super(message, 400, 'AUTH_EN_002');
  }
}

export class AccountLockedError extends CustomError {
  constructor(message = 'Account Locked. Too Many Login Attempts') {
    super(message, 403, 'AUTH_EN_003');
  }
}

export class TokenExpiredError extends CustomError {
  constructor(message = 'Auth. Token Expired') {
    super(message, 401, 'AUTH_EN_005');
  }
}

export class InvlidTokenError extends CustomError {
  constructor(message = 'Invalid Auth token') {
    super(message, 402, 'AUTH_EN_006');
  }
}

