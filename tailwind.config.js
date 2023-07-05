/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter"],
                bold: ["Inter"],
                semibold: ["Inter"],
                medium: ["Inter"],
                normal: ["Inter"],
            },
        },
    },
    plugins: [],
};
