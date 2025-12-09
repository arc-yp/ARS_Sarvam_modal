const AUTH_KEY = "review_admin_token";
const FIXED_CREDENTIALS = {
  mobile: import.meta.env.VITE_ADMIN_MOBILE || "9426479677",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "yash@123",
};

// Secret key for signing tokens (in production, this should be server-side)
const SECRET_KEY = "REVIEW_SYSTEM_2025_SECRET_KEY_DO_NOT_SHARE";

// Simple token generation with timestamp and signature
const generateToken = (mobile: string): string => {
  const timestamp = Date.now();
  const expiresAt = timestamp + 24 * 60 * 60 * 1000; // 24 hours
  const data = `${mobile}:${timestamp}:${expiresAt}`;

  // Create a simple hash/signature
  const signature = btoa(data + SECRET_KEY).slice(0, 32);

  return btoa(`${data}:${signature}`);
};

// Verify token validity
const verifyToken = (token: string): boolean => {
  try {
    const decoded = atob(token);
    const parts = decoded.split(":");

    if (parts.length !== 4) return false;

    const [mobile, timestamp, expiresAt, signature] = parts;
    const currentTime = Date.now();

    // Check expiration
    if (currentTime > parseInt(expiresAt)) {
      return false;
    }

    // Verify signature
    const data = `${mobile}:${timestamp}:${expiresAt}`;
    const expectedSignature = btoa(data + SECRET_KEY).slice(0, 32);

    if (signature !== expectedSignature) {
      return false;
    }

    // Verify mobile matches
    if (mobile !== FIXED_CREDENTIALS.mobile) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const auth = {
  login(mobile: string, password: string): boolean {
    if (
      mobile === FIXED_CREDENTIALS.mobile &&
      password === FIXED_CREDENTIALS.password
    ) {
      const token = generateToken(mobile);
      sessionStorage.setItem(AUTH_KEY, token);
      return true;
    }
    return false;
  },

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem(AUTH_KEY);
    if (!token) return false;

    return verifyToken(token);
  },
};
