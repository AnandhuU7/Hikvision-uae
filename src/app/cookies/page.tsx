import Navbar from "../Components/navbar";
import Cookies from "./cookies";
import Footer from "../Components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Hikvision UAE",
  description: "Learn about how Hikvision UAE uses cookies and similar technologies on our website. Understand your choices and how to manage cookie preferences.",
  keywords: [
    "Hikvision",
    "Hikvision UAE",
    "Security Solutions for uae",
    "Security Solutions in uae",
    "Security Solutions in dubai",
    "Security Solutions in abu dhabi",
    "Security Solutions in sharjah",
    "Security Solutions in ajman",
    "Security Solutions in uae",
    "cookie policy UAE",
    "Hikvision cookies",
    "privacy policy Dubai",
    "website cookies UAE",
    "Hikvision UAE privacy",
    "cookie preferences Dubai",
    "hikvision uae",
    "hikvision dubai",
    "hikvision privacy policy",
    "hikvision cookie policy",
    "hikvision uae",
    "hikvision dubai",
    "hikvision privacy policy",
    "hikvision cookie policy",
    "hikvision uae",
    "hikvision dubai",
    "hikvision privacy policy",
  ]
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <Cookies />
      <Footer />
    </>
  );
}
