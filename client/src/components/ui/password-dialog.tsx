
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { Button } from "./button";
import { Lock, AlertCircle } from "lucide-react";

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  courseName: string;
}

export function PasswordDialog({ isOpen, onClose, onSuccess, courseName }: PasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Import the config to check password
    const { siteConfig } = await import("@/lib/config");
    
    const isValidPassword = siteConfig.passwordProtection.validPasswords.includes(password) || 
                           password === siteConfig.passwordProtection.masterPassword;
    
    if (isValidPassword) {
      // Store authentication in sessionStorage
      sessionStorage.setItem(`aceprep_auth_${courseName}`, "true");
      setPassword("");
      onSuccess();
      onClose();
    } else {
      setError("Incorrect password. Please try again.");
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-yellow-500" />
            Enter Password Here to Access {courseName}
          </DialogTitle>
          <DialogDescription>
            Please enter the access password to continue to {courseName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter staff password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!password || isLoading}>
              {isLoading ? "Verifying..." : "Access Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
