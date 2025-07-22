
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/config";

type CourseCode = keyof typeof siteConfig.passwordProtection.courses;

export function usePasswordProtection(courseCode: CourseCode) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const courseConfig = siteConfig.passwordProtection.courses[courseCode];
      
      if (!courseConfig?.maintenance) {
        // Course is not in maintenance mode
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Check if already authenticated in this session
      const isAuth = sessionStorage.getItem(`aceprep_auth_${courseCode}`) === "true";
      setIsAuthenticated(isAuth);
      
      if (!isAuth) {
        setShowPasswordDialog(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [courseCode]);

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowPasswordDialog(false);
  };

  const handlePasswordClose = () => {
    setShowPasswordDialog(false);
    // Redirect to courses page if they cancel
    window.location.href = "/courses";
  };

  return {
    isAuthenticated,
    isLoading,
    showPasswordDialog,
    handlePasswordSuccess,
    handlePasswordClose
  };
}
