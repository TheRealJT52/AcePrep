
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
            {/* Placeholder content - user will replace this */}
            <div className="text-center text-neutral-500 py-12">
              <p className="text-lg mb-4">Privacy policy content will be added here.</p>
              <p className="text-sm">Please replace this placeholder with your privacy policy content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
