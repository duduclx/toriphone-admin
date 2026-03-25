import { useState } from "react"

export const useAuthdStatus = () => {
    // values
    const [authdStatus, setAuthdStatus] = useState({
        name: "authd",
    });

    const authdStatusGet = async () => {
        // head qui retourne uniquement 200
        try {
          const res = await apiClient.client.head(`auth/0.1/status`);
          const withName = { ...res, name: "plugind" };
          setPlugindStatus(withName);
          return withName;
        } catch (e) {
          return e;
        }
      };

      return { authdStatus, setAuthdStatus, authdStatusGet }
}