import {usePageView} from "@/hooks/use-page-view";
import React, {Suspense, useCallback, useContext, useEffect} from "react";
import {Layout as DashboardLayout} from "@/layouts/dashboard";
import {Container} from "@mui/material";
import {Toaster} from "@/Components/toaster";
import {SettingsConsumer, SettingsProvider} from "@/contexts/settings-context";
import {createTheme} from "@/theme";
import {ThemeProvider, useTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {SplashScreen} from "@/Components/splash-screen";
import BackgroundWrapper from "@/Components/Wrappers/BackgroundWrapper";
import {Seo} from "@/Components/Wrappers/Seo";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, selectEmailVerified, selectTfaPassed, selectUser} from "@/slices/userSlice";
import {Outlet} from "react-router";
import {AuthWrapper} from "@/Components/Wrappers/AuthWrapper";

export default function PageWrapper({children}) {
    usePageView();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectAuth);

    return <>
        <SettingsProvider>
            <SettingsConsumer>
                {(settings) => {
                    // Prevent theme flicker when restoring custom settings from browser storage
                    // if (!settings.isInitialized) {
                    //     return null;
                    // }

                    const theme = createTheme({
                        colorPreset: 'orange', contrast: settings.contrast, direction: settings.direction, // paletteMode: settings.paletteMode,
                        paletteMode: settings.isInitialized ? settings.paletteMode : (document.body.classList.contains('dark') ? 'dark' : 'light'), // paletteMode: settings.paletteMode, responsiveFontSizes: settings.responsiveFontSizes
                    });

                    // Prevent guards from redirecting
                    // const showSlashScreen = !auth.isInitialized;
                    // const showSlashScreen = !settings.isInitialized;
                    const showSlashScreen = false;
                    // TODO: resolve auth frontend

                    return (<ThemeProvider theme={theme}>
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
                        {showSlashScreen ? <SplashScreen/> : (<>
                            {/*{element}*/}
                            <BackgroundWrapper>
                                <AuthWrapper>
                                    {isAuth !== true ? children : <DashboardLayout>
                                        <Suspense>
                                            <Container
                                                sx={{
                                                    paddingTop: '20px',
                                                }}
                                                maxWidth={settings.stretch ? false : 'xl'}>
                                                <Outlet/>
                                                {children}
                                            </Container>
                                        </Suspense>
                                    </DashboardLayout>}
                                </AuthWrapper>
                            </BackgroundWrapper>
                            <Toaster/>
                        </>)}
                    </ThemeProvider>);
                }}
            </SettingsConsumer>
        </SettingsProvider>

    </>;

}
