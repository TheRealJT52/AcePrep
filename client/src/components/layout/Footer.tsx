import { Link } from "wouter";
import { Rocket, Mail, HelpCircle, ShieldCheck, Facebook, Twitter, Instagram, GraduationCap, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-neutral-400 py-12 border-t border-neutral-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Site Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-primary/20 p-2 rounded-md mr-3">
                <Rocket className="text-primary h-5 w-5" />
              </div>
              <div className="flex items-center">
                <span className="font-heading font-bold text-xl text-primary glow-primary mr-1">Ace</span>
                <span className="font-heading font-bold text-xl text-neutral-400">Prep</span>
                <Sparkles className="h-4 w-4 text-accent ml-1" />
              </div>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              Supercharge your AP exam preparation with advanced AI tutoring. Get personalized help for your specific needs, anytime.
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="bg-neutral-200/10 hover:bg-neutral-200/20 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="bg-neutral-200/10 hover:bg-neutral-200/20 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="bg-neutral-200/10 hover:bg-neutral-200/20 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg text-neutral-500 mb-4 flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-neutral-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/courses" className="text-neutral-400 hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg text-neutral-500 mb-4 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center group">
                <a href="mailto:info@aceprep.com" className="text-neutral-400 group-hover:text-primary transition-colors">info@aceprep.com</a>
              </li>
              <li className="flex items-center group">
                <a href="#" className="text-neutral-400 group-hover:text-primary transition-colors">Help Center</a>
              </li>
              <li className="flex items-center group">
                <a href="#" className="text-neutral-400 group-hover:text-primary transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-neutral-200/20" />
        
        <div className="text-center text-neutral-400/80">
          <p>&copy; {new Date().getFullYear()} AcePrep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
