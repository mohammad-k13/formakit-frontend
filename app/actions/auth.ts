'use server';

interface LoginResponse {
      success: boolean;
      message?: string;
      user?: {
            userId: number;
            email: string;
            role: string;
      };
      session?: {
            id: number;
            expire_at: string;
            session_token: string;
      };
}

interface SignupResponse {
      success: boolean;
      message?: string;
}

export async function login(credentials: { email: string; password: string }): Promise<LoginResponse> {
      try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                  return {
                        success: false,
                        message: data.message || 'Login failed',
                  };
            }

            // Store session token in cookies
            document.cookie = `session_token=${data.session.session_token}; path=/; max-age=${15 * 24 * 60 * 60}`;

            return {
                  success: true,
                  user: data.user,
                  session: data.session,
            };
      } catch (error) {
            console.error('Login error:', error);
            return {
                  success: false,
                  message: 'An error occurred during login',
            };
      }
}

export async function signup(userData: {
      email: string;
      password: string;
      username: string;
}): Promise<SignupResponse> {
      try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                  return {
                        success: false,
                        message: data.message || 'Signup failed',
                  };
            }

            return {
                  success: true,
            };
      } catch (error) {
            console.error('Signup error:', error);
            return {
                  success: false,
                  message: 'An error occurred during signup',
            };
      }
} 