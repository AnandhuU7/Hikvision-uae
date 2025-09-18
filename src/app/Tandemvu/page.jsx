import Tandemvu from "./Tandemvu";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

export const metadata = {
  title: 'Hikvision UAE | TandemVu Security Solutions',
  description: 'Hikvision TandemVu Security Solutions for enhanced security and surveillance in UAE. Our advanced AI-powered system detects humans and vehicles with precision, reducing false alarms and improving response times.',
  keywords: [
    'Hikvision',
    'Hikvision UAE',
    'Security Solutions for uae',
    'Security Solutions in uae',
    'Security Solutions in dubai',
    'Security Solutions in abu dhabi',
    'Security Solutions in sharjah',
    'Security Solutions in ajman',
    'Security Solutions in uae',
    'TandemVu Security Solutions',
    'UAE Security Solutions',
    'AI-Powered Surveillance',
    'Hikvision TandemVu',
    'UAE Surveillance Systems',
    'Hikvision Middle East',
    'Hikvision Distributor UAE',
    'Hikvision Supplier UAE',
    'Hikvision Authorized Distributor in UAE',
    'Hikvision Support UAE',
    'hikvision uae',
    'hikvision dubai',
    'hikvision middle east',
    'hikvision distributor uae',
    'hikvision supplier uae',
    'hikvision authorized distributor in uae',
    'hikvision support uae',
    'hikvision tandemvu uae',
    'hikvision tandemvu dubai',
    'hikvision tandemvu middle east',
    'hikvision tandemvu distributor uae',
    'hikvision tandemvu supplier uae',
    'hikvision tandemvu authorized distributor in uae',
    
  ],
};


export default function TandemvuPage() {
  return (
    <div>
      <Navbar />
      <Tandemvu />
      <Footer />
    </div>
  );
}