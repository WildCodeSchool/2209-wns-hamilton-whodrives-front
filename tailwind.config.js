/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        layoutBlue: "#0258A5",
        validBlue: "#1195C3",
        lightBlue: "#8AE9FF",
        whodrivesGreen: "#02EF92",
        whodrivesPink: "#EE5588",
        whodrivesGrey: "#909090",
      },
      fontFamily: {
        pressStart2p: ["/public/assets/fonts/PressStart2P-Regular.ttf"],
        roboto: ["/public/assets/fonts/Roboto-Regular.ttf"],
      },
      backgroundImage: {
        "whodrives-bg": "url('/public/assets/images/whodrives.gif')",
        "whodrives-bg-sm": "url('/public/assets/images/whodrives-sm.gif')",
      },
      fontSize: {
        xxs: ".5rem",
      },
      height: {
        header: "5rem",
        body: 'calc(100vh - theme("height.header"))',
      },
      minHeight: {
        body: 'calc(100vh - theme("height.header"))',
      },
    },
  },
  plugins: [],
};
