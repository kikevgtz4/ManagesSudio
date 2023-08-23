"use client"

import React from 'react';
import { Auth } from '@supabase/auth-ui-react'; 
import { ThemeSupa, darkThemes } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <p className="text-gray-600 mb-8">Create an account to get started.</p>
        {/* Render the AuthModal component */}
        <Auth
         supabaseClient={supabase}
         providers={['google']}
         appearance={{
          // If you want to extend the default styles instead of overriding it, set this to true
      extend: true,
      // Your custom classes
      className: {
        anchor: 'text-white',
        button: 'my-awesome-button',
        //..
      },
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'navy',
                brandAccent: 'blue',
                inputBorder:'darkgray',
                dividerBackground: 'lightgray',
                anchorTextColor:'gray',
                anchorTextHoverColor:'black'
              },
            },
          },
        }}
        />
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
