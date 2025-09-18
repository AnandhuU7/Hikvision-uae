import Retail from "./Retail";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

export const metadata = {
  title: 'Hikvision UAE | Retail Security Solutions',
  description: 'Hikvision Retail Security Solutions for enhanced security and customer safety. Our comprehensive range of cameras, NVRs, and access control solutions ensure a safe and secure shopping environment.',
  keywords: [
    'Hikvision UAE',
    'Retail Security Solutions',
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
    'retail security uae',
    'retail security dubai',
    'retail security middle east',
    'retail security distributor uae',
    'retail security supplier uae',
    'retail security authorized distributor in uae',
    'retail security support uae',
  ],

};

export default function RetailPage() {
  return (
    <div>
      <Navbar />
      <Retail />
      <Footer />
    </div>
  );
}