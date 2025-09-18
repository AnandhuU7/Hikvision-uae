import Navbar from "../Components/navbar";
import Contact from "./Contact";
import Footer from "../Components/footer";
import Head from "next/head";

export const metadata = {
  title: "Contact Us | Hikvision Official Distributor & Supplier in UAE - Security Solutions",
  description:
    "Contact Hikvision UAE for CCTV cameras, security systems & support in Dubai. Authorized dealer for Hikvision products, pricing & technical support.",
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
      'Retail Security S   olutions',
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

export default function ContactPage() {
  return (
    <div>
      <Navbar />

      <Contact />
      <Footer />
    </div>
  );
}