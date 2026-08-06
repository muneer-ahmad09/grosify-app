import { useSocialAuth } from "@/hooks/useSocialAuth";
import { AuthView } from "@clerk/expo/native";

const signIn = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();
  return <AuthView />;
};

export default signIn;
