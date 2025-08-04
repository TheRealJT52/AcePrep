
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-neutral-600 hover:text-primary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl text-neutral-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-neutral-600 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
          <div className="prose prose-neutral max-w-none">
            <div className="text-center text-neutral-500 py-12">
              <h2>AcePrep Privacy Policy</h2>

<p><strong>Effective Date:</strong> August 4, 2025</p>

<hr />

<h2>1. Introduction</h2>

<p>AcePrep (“we,” “us,” or “our”) is a not-for-profit educational platform dedicated to assisting students in succeeding in Advanced Placement courses. Although not currently a registered nonprofit, our mission is strictly educational and non-commercial.</p>

<hr />

<h2>2. Eligibility and Geographic Restrictions</h2>

<p>AcePrep is intended for use only by individuals who are at least thirteen (13) years of age. By creating an account and utilizing our services, you represent and warrant that you meet this minimum age requirement. We do not knowingly collect personal information from children under 13 years of age.</p>

<p>Additionally, in compliance with applicable data protection laws, including the General Data Protection Regulation (“GDPR”) and the UK Data Protection Act, AcePrep is intended solely for users located outside the European Union and the United Kingdom. By using our services, you confirm that you are not located within these jurisdictions. Should we become aware that we have collected personal data from residents of the EU or UK, we will take prompt action to delete such data.</p>

<hr />

<h2>3. Information We Collect</h2>

<p>We collect the following personal information directly from users:</p>

<ul>
  <li>Required information: name and email address (collected during account creation)</li>  
  <li>Optional information: grade level and state of residence (users may choose whether or not to provide this data)</li>  
  <li>Anonymous chat logs generated during use of the platform (which are not linked to any personally identifiable information)</li>
</ul>

<p>We do not collect IP addresses, location tracking data, cookies, uploaded files, or other demographic information beyond what is specified above.</p>

<hr />

<h2>4. Methods of Data Collection</h2>

<p>All personal data is provided voluntarily and manually by users. AcePrep does not employ cookies, tracking technologies, or third-party analytics tools for data collection.</p>

<hr />

<h2>5. Use of Personal Data</h2>

<p>We use personal data solely for the following purposes:</p>

<ul>
  <li>To manage user accounts and verify user identity</li>  
  <li>To enable password recovery and account access via email</li>  
  <li>To improve platform functionality through analysis of anonymized chat logs</li>  
  <li>To conduct internal research and aggregated demographic reporting based on optional grade level and state of residence data</li>
</ul>

<p>All demographic data is used strictly in aggregate form and without any personally identifiable information. Such aggregate data may be published in reports or summaries (e.g., number of users by state).</p>

<p>We do not use personal data for marketing, advertising, or any form of sale or sharing with third parties.</p>

<hr />

<h2>6. Data Sharing and Third-Party Access</h2>

<p>AcePrep does not share, sell, or disclose your personal data to third parties. We do not integrate any external services or APIs that have access to your personal information.</p>

<hr />

<h2>7. Data Storage and Security</h2>

<p>Your data is securely stored using Fillout’s database services, which employ industry-standard security measures to protect against unauthorized access or disclosure.</p>

<p>While emails and other personal data are stored in unencrypted form within this database, access is restricted and monitored. Data is retained indefinitely unless a deletion request is submitted.</p>

<hr />

<h2>8. User Rights</h2>

<p>You have the right to:</p>

<ul>
  <li>Request access to your personal data that we hold</li>  
  <li>Request correction or deletion of your personal data</li>  
  <li>Obtain a summary of your account data in a portable format</li>
</ul>

<p>To exercise any of these rights, please contact us at <a href="mailto:AcePrep.ai@gmail.com">AcePrep.ai@gmail.com</a>.</p>

<p>Since AcePrep does not use tracking cookies or similar technologies, there is no option to opt out of data collection beyond withholding optional information.</p>

<hr />

<h2>9. Changes to This Privacy Policy</h2>

<p>AcePrep reserves the right to update this Privacy Policy at any time. Significant changes will be communicated to users via email or posted prominently within the platform.</p>

<hr />

<h2>10. Contact Information</h2>

<p>If you have any questions, concerns, or requests regarding your privacy or this policy, please contact us at:</p>

<p><a href="mailto:AcePrep.ai@gmail.com">AcePrep.ai@gmail.com</a></p>

<hr />

<p>By using AcePrep, you acknowledge that you have read and agree to this Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
