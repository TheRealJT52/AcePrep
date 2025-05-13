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
    message: "The AP World History Tutor is now available!",
    // Link destination for the "Try it now" button
    link: "/apwh-tutor",
    // Whether to show the secondary message on non-mobile
    showSecondaryMessage: true,
    // Secondary message text
    secondaryMessage: "Explore global history with our intelligent AI assistant.",
  }
};