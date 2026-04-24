import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                indigo: {
                    50: '#F4FAFF',
                    100: '#C1E8FF',
                    200: '#9FCBEA',
                    300: '#7DA0CA',
                    400: '#6892BD',
                    500: '#5483B3',
                    600: '#052659',
                    700: '#021024',
                    800: '#010B18',
                    900: '#00050D',
                },
                teal: {
                    50: '#F4FAFF',
                    100: '#C1E8FF',
                    200: '#9FCBEA',
                    300: '#7DA0CA',
                    400: '#6892BD',
                    500: '#5483B3',
                    600: '#052659',
                    700: '#021024',
                    800: '#010B18',
                    900: '#00050D',
                }
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
