import Education from "./Education";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

export const metadata = {
  title: 'Hikvision UAE | Education Security Solutions',
  description: 'Hikvision Education Security Solutions for enhanced safety and operational efficiency. Our comprehensive range of cameras, NVRs, and access control solutions ensure a secure and comfortable environment for students and staff.',
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
    'Education Security Solutions',
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
  ],
};


export default function EducationPage() {
  return (
    <div>
      <Navbar />
      <Education />
      <Footer />
    </div>
  );
}