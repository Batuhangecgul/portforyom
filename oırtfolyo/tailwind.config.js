/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#a855f7", // Purple-500
                secondary: "#d8b4fe", // Purple-300
                tertiary: "#151030", // Deep dark purple
                "black-100": "#100d25",
                "black-200": "#090325",
                "white-100": "#f3f3f3",
            },
            boxShadow: {
                card: "0px 35px 120px -15px #211e35",
            },
            screens: {
                xs: "450px",
            },
            fontFamily: {
                sans: ["Space Grotesk", "sans-serif"],
            },
        },
    },
    plugins: [],
}
