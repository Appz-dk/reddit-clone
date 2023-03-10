// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
// 1.a Import fonts used in the app
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"
import { Button } from "./button";

// 2. Extend the theme to include custom colors, fonts, etc
// Can be done seperatly like below or directly inside of 'extendTheme'
const colors = {
    brand: {
        100: "#FF3C00"
    },
};

const fonts = {
    body: "Open Sans, sans-serif"
}

const styles = {
    global: () => ({
        body: {
            bg: "gray.200",
        }
    })
}

const components = {
    Button
}

export const theme = extendTheme({ colors, fonts, styles, components });