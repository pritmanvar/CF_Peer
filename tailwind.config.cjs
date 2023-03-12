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
                "my-red": "#bf5158",
                "my-red-gradient": "#bf515866",
                "my-yellow": "#fcb711",
                "my-yellow-gradient": "#fcb71166",
                "my-green": "#00b14b",
                "my-green-gradient": "#00b14b66",
                "my-purple": "#4083F6",
                "my-purple-gradient": "#4083F666",
                "my-light-blue": "#78C3FC",
                "my-light-blue-gradient": "#78C3FC66",
                "my-pink": "#cc004c",
                "my-pink-gradient": "#cc004c66",
                "my-orange": "#f37021",
                "my-orange-gradient": "#f3702166",
                "my-light-green": "#BEE8BC",
                "my-light-green-gradient": "#BEE8BC66",
            },
            spacing: {
                "1/5": "20%",
            },
            gridTemplateColumns: {
                13: "repeat(13, minmax(0, 1fr))",
            },
        },
    },
    plugins: [],
};
