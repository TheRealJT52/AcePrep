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
    message: "The AP Bio Tutor is now available!",
    // Link destination for the "Try it now" button
    link: "/apbio-tutor",
    // Whether to show the secondary message on non-mobile
    showSecondaryMessage: true,
    // Secondary message text
    secondaryMessage: "Explore biology with our intelligent AI tutor.",
  },
  
  // Password protection settings
  passwordProtection: {
    // Master password for accessing maintenance-mode courses
    masterPassword: "aceprep2025",
    
    // Course-specific settings
    courses: {
      APUSH: { maintenance: false, development: false },
      APWH: { maintenance: false, development: false },
      APEURO: { maintenance: false, development: false },
      APES: { maintenance: true, development: false },
      APMACRO: { maintenance: true, development: false },
      APMICRO: { maintenance: true, development: false },
      APGOV: { maintenance: true, development: false },
      APBIO: { maintenance: false, development: false },
    }
  }
};