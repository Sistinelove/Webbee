// tailwind.config.js
module.exports = {
    content: [
        "./**/*.{html,js}",
        "*.{html,js}",
    ],
    theme: {
        extend: {
            screens: {
                'desktop': '1440px',
                'main-container': '1080px',
                'main-container-info': '1016px',
                'main-container-time': '1376px',
                'main-container-aside-info': '264px',
            },
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                inter: ["Inter", "sans-serif"],
                "vtb-group-ui": ["VTB Group UI", "sans-serif"],
                'text-sm': ['Roboto', 'sans-serif'],
            },
            fontSize: {
                "65": "4.0625rem",
                "14": "0.875rem",
                "7": "0.4375rem",
                "4": "0.25rem",
                "sm": ["0.875rem", {lineHeight: '1.41', fontWeight: '400'}],
                "base": ["16px", {lineHeight: '18.75px', fontWeight: '400'}],
                "lg": ["18px", {lineHeight: '21.09px', fontWeight: '500', fontFamily: 'Roboto'}],
            },
            fontStyle: {
                italic: "italic",
            },
            colors: {
                black: "#505050",
                blue: "#5095EC",
                secondGrey: "#8F8F8F",
                grey: "#D3D8DE",
                bg: "#F1F1F1",
                bg2: "#FAFAFA",
            },
            boxShadow: {
                'customShadow': '0px 1px 1px 0px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [],
};
