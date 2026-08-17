import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github",
  ) => {
    if (loadingStrategy) return;

    setLoadingStrategy(strategy);

    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "grosifyapp",
        path: "(tabs)",
      });

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({
          session: createdSessionId,
        });
      }
    } catch (error) {
      console.error("Error during social auth:", error);

      Alert.alert(
        "Authentication Error",
        "An error occurred during social authentication. Please try again.",
      );
    } finally {
      setLoadingStrategy(null);
    }
  };

  return {
    handleSocialAuth,
    loadingStrategy,
  };
};
