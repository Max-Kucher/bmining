import {SettingsConsumer, SettingsProvider} from "@/contexts/settings-context";
import {createTheme} from "@/theme";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {SplashScreen} from "@/Components/splash-screen";
import {Seo} from "@/Components/seo";
import {Outlet} from "react-router";
import React, {Suspense} from "react";
import {Toaster} from "@/Components/toaster";

export default function LightWrapper({children}) {
    return (
        <SettingsProvider>
            <SettingsConsumer>
                {(settings) => {
                    // Prevent theme flicker when restoring custom settings from browser storage
                    if (!settings.isInitialized) {
                        // return null;
                    }


                    const theme = createTheme({
                        // colorPreset: settings.colorPreset,
                        colorPreset: 'orange',
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: 'light',
                        responsiveFontSizes: settings.responsiveFontSizes
                    });

                    const showSlashScreen = false;

                    return (
                        <ThemeProvider theme={theme}>
                            <Seo>
                                <meta
                                    name="color-scheme"
                                    content={'orange'}
                                />
                                <meta
                                    name="theme-color"
                                    content={theme.palette.neutral[1000]}
                                />
                            </Seo>
                            <CssBaseline/>
                            {showSlashScreen
                                ? <SplashScreen/>
                                : (
                                    <Suspense>
                                        <Outlet/>
                                        {children}
                                    </Suspense>
                                )}
                            <Toaster/>
                            {/*</RTL>*/}
                        </ThemeProvider>
                    );
                }}
            </SettingsConsumer>
        </SettingsProvider>
    );
}
