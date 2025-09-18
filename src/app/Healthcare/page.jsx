import Healthcare from "./Healthcare";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

export const metadata = {
  title: 'Hikvision UAE | Healthcare Security Solutions',
  description: 'Hikvision Healthcare Security Solutions for enhanced patient safety and operational efficiency. Our comprehensive range of cameras, NVRs, and access control solutions ensure a secure and comfortable environment for patients and staff.',
  keywords: [
    'Hikvision UAE',
    'Hikvision',
    'Security Solutions for uae',
    'Security Solutions in uae',
    'Security Solutions in dubai',
    'Security Solutions in abu dhabi',
    'Security Solutions in sharjah',
    'Security Solutions in ajman',
    'Security Solutions in uae',
    'Healthcare Security Solutions',
    'Security Cameras',
    'NVR Systems',
    'Access Control',
    'Hikvision Dubai',
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
    'hikvision healthcare solutions uae',
    'hikvision healthcare solutions dubai',
    'hikvision healthcare solutions UAE',
    'hikvision healthcare solutions Dubai',
    'hikvision healthcare solutions UAE',
  ],
};


export default function HealthcarePage() {
  return (
    <div>
      <Navbar />
      <Healthcare />
      <Footer />
    </div>
  );
}