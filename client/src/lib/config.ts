// Site-wide configuration options
export const siteConfig = {
  // Feature flags
  features: {
    // Set to true to show the announcement banner, false to hide it
    showAnnouncementBanner: true,
  },
  
  // Announcement configuration
  announcement: {
    // Text to display in the announcement banner
    message: "The AP World AND European History Tutors are now available!",
    // Link destination for the "Try it now" button
    link: "/courses",
    // Whether to show the secondary message on non-mobile
    showSecondaryMessage: true,
    // Secondary message text
    secondaryMessage: "Explore history with our intelligent AI tutors.",
  },
  
  // Password protection settings
  passwordProtection: {
    // Master password for accessing maintenance-mode courses
    masterPassword: "aceprep2024",
    
    // Course-specific settings - set maintenance: true to password protect
    courses: {
      APUSH: { maintenance: false },
      APWH: { maintenance: false },
      APEURO: { maintenance: false },
      APES: { maintenance: true },
      APMACRO: { maintenance: true },
      APMICRO: { maintenance: true },
      APGOV: { maintenance: true },
    }
  }
};