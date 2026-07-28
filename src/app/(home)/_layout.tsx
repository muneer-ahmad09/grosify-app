import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";

export default function HomeLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href="./(auth)/sign-in" />;
  }

  return <Slot />;
}
