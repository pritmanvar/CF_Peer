/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "main-bg": "#131517",
                "nav-bg": "#1E1F25",
                "main-font": "#EDEDED",
                "secondary-font": "#828282",
                "my-yellow": "#fcb711",
                "my-yellow-gradient": "#fcb71166",
                "my-green": "#00b14b",
                "my-green-gradient": "#00b14b66",
                "my-purple": "#6460aa",
                "my-purple-gradient": "#6460aa66",
                "my-light-blue": "#0089d0",
                "my-light-blue-gradient": "#0089d066",
                "my-pink": "#cc004c",
                "my-pink-gradient": "#cc004c66",
                "my-orange": "#f37021",
                "my-orange-gradient": "#f3702166",
            },
            spacing: {
                "1/5": "20%",
            },
        },
    },
    plugins: [],
};
