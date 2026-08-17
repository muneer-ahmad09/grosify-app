import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import * as Sentry from "@sentry/react-native";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Text, useColorScheme, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../../global.css";

WebBrowser.maybeCompleteAuthSession();

function RootNavigator() {
  let colorScheme = useColorScheme();

  const { isLoaded, isSignedIn } = useAuth();

  Sentry.init({
    dsn: "https://fbcabba512970dd795d6c5124ecd1952@o4511925344665600.ingest.us.sentry.io/4511925349974016",

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Enable Logs
    enableLogs: false,
    integrations: [Sentry.feedbackIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
  });

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading Clerk...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default Sentry.wrap(function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <KeyboardProvider>
        <RootNavigator />
      </KeyboardProvider>
    </ClerkProvider>
  );
});
