import Terms from "./terms";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Hikvision UAE",
  description: "Read our terms and conditions for Hikvision UAE. Understand your rights and responsibilities as a customer.",
  keywords: [
    "Hikvision",
    "Hikvision UAE",
    "Hikvision Dubai",
    "Hikvision Abu Dhabi",
    "Hikvision Sharjah",
    "Hikvision Ajman",
    "terms and conditions UAE",
    "Hikvision terms",
    "Hikvision conditions",
    "Hikvision UAE terms",
    "Hikvision UAE conditions",
    "hikvision uae",
    "hikvision dubai",
    "hikvision middle east",
    "hikvision distributor uae",
    "hikvision supplier uae",
    "hikvision authorized distributor in uae",
    "hikvision support uae",
    "hikvision dealer dubai",
    "hikvision uae",
    "hikvision dubai",
    "hikvision middle east",
    "hikvision distributor uae",
    "hikvision supplier uae",
    "hikvision authorized distributor in uae",
    "hikvision terms and conditions",
    "security solutions for uae",
    "security solutions in uae",
    "security solutions in dubai",
    "security solutions in abu dhabi",
    "security solutions in sharjah",
    "security solutions in ajman",
    "security solutions in uae",
  ]
};


export default function TermsPage() {
  return (
    <>
      <Navbar />
      <Terms />
      <Footer />
    </>
  );
}



