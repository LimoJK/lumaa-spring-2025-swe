export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed'); 
    }

    return { success: true, token: data.token, message: data.message || 'Login successful' };
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};


export const registerUser = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed'); 
    }

    return { success: true, message: data.message || 'Registration successful' }; 
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
