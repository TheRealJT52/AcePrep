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
    
    // Course-specific settings
    courses: {
      APUSH: { maintenance: false, development: false },
      APWH: { maintenance: false, development: false },
      APEURO: { maintenance: false, development: false },
      APES: { maintenance: true, development: false },
      APMACRO: { maintenance: true, development: false },
      APMICRO: { maintenance: true, development: false },
      APGOV: { maintenance: true, development: false },
      APBIO: { maintenance: false, development: true },
    }
  }
};