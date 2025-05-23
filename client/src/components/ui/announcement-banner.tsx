import { CircleAlert } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function AnnouncementBanner() {
  // If banner is disabled in config, don't render anything
  if (!siteConfig.features.showAnnouncementBanner) {
    return null;
  }
  
  const { message, secondaryMessage, showSecondaryMessage, link } = siteConfig.announcement;
  
  return (
    <div className="w-full bg-gradient-to-r from-secondary/80 to-secondary py-3 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 -translate-y-12 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16 blur-xl"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <CircleAlert className="h-5 w-5 text-white animate-pulse" />
          <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white mr-2">
            New!
          </span>
          <p className="text-white text-sm sm:text-base font-medium">
            {message}
            {showSecondaryMessage && (
              <span className="hidden sm:inline"> {secondaryMessage}</span>
            )}
          </p>
          <a href={link} className="ml-2 hidden sm:block text-white text-sm font-semibold underline underline-offset-2 hover:text-white/80 transition-colors">
            Try it now →
          </a>
        </div>
      </div>
    </div>
  );
}