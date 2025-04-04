import { useState, useEffect } from "react";
import keycloak, { initKeycloak } from "../../config/keycloak";

// Tuple: [isLogin, token, keycloakInstance, isLoading]
const useAuth = (): [boolean, string | null, typeof keycloak | null, boolean] => {
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setLogin] = useState<boolean>(false);
  const [kcInstance, setKcInstance] = useState<typeof keycloak | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ✅ new loading state

  useEffect(() => {
    const runInit = async () => {
      try {
        const kc = await initKeycloak();
        setLogin(kc.authenticated ?? false);
        setToken(kc.token ?? null);
        setKcInstance(kc);
      } catch (err) {
        console.error("Keycloak init error:", err);
      } finally {
        setLoading(false); 
      }
    };

    runInit();
  }, []);

  return [isLogin, token, kcInstance, loading];
};

export default useAuth;
