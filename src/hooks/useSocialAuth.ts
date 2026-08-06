import { useSSO } from "@clerk/expo";
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
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        throw new Error("No session ID returned from SSO flow.");
      }
      await setActive({ session: createdSessionId });
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

  return { handleSocialAuth, loadingStrategy };
};
