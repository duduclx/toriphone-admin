const isVersionGreaterOrEqual = (currentVersion, minVersion) => {
    const current = currentVersion.split(".").map(Number);
    const min = minVersion.split(".").map(Number);
  
    for (let i = 0; i < Math.max(current.length, min.length); i++) {
      const currentPart = current[i] || 0; // Assure 0 si la version est plus courte
      const minPart = min[i] || 0;
      
      if (currentPart > minPart) return true;
      if (currentPart < minPart) return false;
    }
    return true; // Les versions sont égales si aucune des conditions n'est remplie
  };

  export default isVersionGreaterOrEqual