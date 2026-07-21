import type { LucideIcon } from "lucide-react";
import {
  Stethoscope,
  Syringe,
  Brain,
  HeartPulse,
  Pill,
  Users,
  Dna,
  Eye,
  Cross,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlighted?: boolean;
};

export const services: Service[] = [
  {
    icon: Stethoscope,
    title: "Dentistry",
    description: "Get consultation form our Dentistry team",
  },
  {
    icon: Syringe,
    title: "General Diagnosis",
    description: "Get consultation form our General Diagnosis team",
    
  },
  {
    icon: Brain,
    title: "Neuro Surgery",
    description: "Get consultation form our Neuro Surgery team",
  },
  {
    icon: HeartPulse,
    title: "Cardiology",
    description: "Get consultation form our Cardiology team",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "Get consultation form our Pharmacy team",
  },
  {
    icon: Users,
    title: "Trained Staff",
    description: "Get consultation form our Trained staff team",
  },
  {
    icon: Dna,
    title: "DNA Mapping",
    description: "Get consultation form our DNA Mapping team",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Get consultation form our Ophthalmology team",
  },
  {
    icon: Cross,
    title: "Medical Aid",
    description: "Get consultation form our Emergency Medical Aid Team",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Amazing team and amazing treatment from the best doctor in the world.",
    name: "Michael",
    role: "Patient",
  },
  {
    quote:
      "The staff made me feel comfortable from the moment I walked in. Truly professional care.",
    name: "Amina",
    role: "Patient",
  },
  {
    quote:
      "Booking online was effortless and my doctor followed up personally the next day.",
    name: "Julien",
    role: "Patient",
  },
  {
    quote:
      "I've never felt so well taken care of. The whole team treats you like family.",
    name: "Sofia",
    role: "Patient",
  },
  {
    quote:
      "Fast, clear communication and a genuinely caring medical team. Highly recommended.",
    name: "David",
    role: "Patient",
  },
  {
    quote:
      "From consultation to follow-up, everything was smooth and reassuring.",
    name: "Fatima",
    role: "Patient",
  },
];

export type Doctor = {
  name: string;
  specialty: string;
  photo: "female" | "male";
};

export const doctors: Doctor[] = [
  { name: "Dr. Sarah Mitchell", specialty: "Cardiology", photo: "female" },
  { name: "Dr. James Carter", specialty: "Neuro Surgery", photo: "male" },
  { name: "Dr. Amara Okoye", specialty: "Dentistry", photo: "female" },
  { name: "Dr. Daniel Reyes", specialty: "Ophthalmology", photo: "male" },
  { name: "Dr. Lina Haddad", specialty: "General Diagnosis", photo: "female" },
  { name: "Dr. Marcus Webb", specialty: "Pharmacy", photo: "male" },
];

export const opdSchedule = [
  { day: "Lundi – Vendredi", hours: "8h00 – 20h00" },
  { day: "Samedi", hours: "9h00 – 17h00" },
  { day: "Dimanche", hours: "Urgences uniquement" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Specialties", href: "/specialties" },
  { label: "Doctors", href: "/doctors" },
  { label: "OPO", href: "/opd" },
  { label: "Login", href: "/login" },
];

export const footerExplore = [
  { label: "Home", href: "/" },
  { label: "Surgery", href: "/specialties" },
  { label: "OPD", href: "/opd" },
  { label: "Speciality", href: "/specialties" },
  { label: "Consultation", href: "/book" },
];

export const footerAbout = [
  { label: "Who we are", href: "/#about" },
  { label: "Our Vision", href: "/#about" },
  { label: "Our Team", href: "/doctors" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "FAQs", href: "/faq" },
];
