'use server';

import { getSession } from '@/lib/auth/helpers';
import { storefrontQuery } from '@/lib/shopify/storefront-client';
import { redirect } from 'next/navigation';

/**
 * Server Action: Login customer
 *
 * Usage with TanStack Query:
 * const mutation = useMutation({
 *   mutationFn: (credentials) => loginCustomer(credentials.email, credentials.password)
 * });
 */
export async function loginCustomer(email: string, password: string) {
  try {
    const query = `
      mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email,
        password,
      },
    };

    const result: any = await storefrontQuery(query, variables);

    if (result.customerAccessTokenCreate.customerUserErrors.length > 0) {
      return {
        success: false,
        error: result.customerAccessTokenCreate.customerUserErrors[0].message,
      };
    }

    const accessToken = result.customerAccessTokenCreate.customerAccessToken.accessToken;

    // Get customer details
    const customerQuery = `
      query GetCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          email
          firstName
          lastName
        }
      }
    `;

    const customerResult: any = await storefrontQuery(customerQuery, {
      customerAccessToken: accessToken,
    });

    // Save to session
    const session = await getSession();
    session.isLoggedIn = true;
    session.customerAccessToken = accessToken;
    session.email = customerResult.customer.email;
    session.customerId = customerResult.customer.id;
    await session.save();

    return { success: true, data: customerResult.customer };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: 'Failed to login' };
  }
}

/**
 * Server Action: Logout customer
 */
export async function logoutCustomer() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}

/**
 * Server Action: Register new customer
 */
export async function registerCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const query = `
      mutation CustomerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email,
        password,
        firstName,
        lastName,
      },
    };

    const result: any = await storefrontQuery(query, variables);

    if (result.customerCreate.customerUserErrors.length > 0) {
      return {
        success: false,
        error: result.customerCreate.customerUserErrors[0].message,
      };
    }

    // Auto-login after registration
    return await loginCustomer(email, password);
  } catch (error) {
    console.error('Error registering customer:', error);
    return { success: false, error: 'Failed to register' };
  }
}

/**
 * Server Action: Get current session
 */
export async function getCurrentSession() {
  const session = await getSession();
  return {
    isLoggedIn: session.isLoggedIn,
    email: session.email,
    customerId: session.customerId,
  };
}
