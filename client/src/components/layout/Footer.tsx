import { Link } from "wouter";
import { School, Mail, HelpCircle, ShieldCheck, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <School className="text-white h-6 w-6 mr-2" />
              <span className="font-heading font-medium text-lg">AP Scholar AI</span>
            </div>
            <p className="text-neutral-200 mb-4">Advanced Placement exam preparation powered by AI. Get the help you need, when you need it.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-200 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/courses" className="text-neutral-200 hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/about" className="text-neutral-200 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-neutral-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-heading font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@apscholarai.com" className="text-neutral-200 hover:text-white transition-colors">info@apscholarai.com</a>
              </li>
              <li className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                <a href="#" className="text-neutral-200 hover:text-white transition-colors">Help Center</a>
              </li>
              <li className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2" />
                <a href="#" className="text-neutral-200 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-400 mt-8 pt-8 text-center text-neutral-300">
          <p>&copy; {new Date().getFullYear()} AP Scholar AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
