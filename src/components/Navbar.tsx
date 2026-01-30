import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music2, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PricingCategory {
  id: string;
  name: string;
  slug: string;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingHover, setPricingHover] = useState(false);
  const [pricingCategories, setPricingCategories] = useState<PricingCategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('pricing_categories')
      .select('id, name, slug')
      .order('sort_order');
    setPricingCategories(data || []);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Katalog", path: "/katalog" },
    { name: "Store Partner", path: "/store-partner" },
    { name: "Services", path: "/services" },
    { name: "Harga", path: "/pricing", hasDropdown: true },
    { name: "Kolaborasi", path: "/kolaborasi" },
    { name: "Blog", path: "/blog" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg
              viewBox="0 0 239.7 42.2"
              className="h-10 w-auto" // Atur tinggi di sini (h-10 = 40px)
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1=".1"
                  y1="918.54"
                  x2="35.9"
                  y2="918.54"
                  gradientTransform="translate(0 -900.49)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#ee6723" />
                  <stop offset="1" stopColor="#6f4b9d" />
                </linearGradient>
              </defs>
              
              {/* Huruf/Teks Soundub (Warna Oranye) */}
              <g fill="#ee6723">
                <path d="M44.7,28.6c-1.4-.6-2.6-1.5-3.4-2.6s-1.3-2.3-1.4-3.7h3.6c1,0,1.9.4,2.4,1.2s.5.6.8.9c.7.6,1.6.8,2.7.8s1.9-.2,2.5-.6.9-1,.9-1.6-.4-1.2-1.1-1.6-1.9-.7-3.5-1.2c-1.6-.4-3-.8-4-1.2s-1.9-1.1-2.7-1.9c-.8-.9-1.1-2-1.1-3.5s.3-2.3,1-3.3,1.7-1.8,3-2.4,2.8-.9,4.6-.9c2.6,0,4.7.7,6.2,2h0c2.1,1.8.6,5.2-2.1,5.2h-.7c0-.9-.4-1.6-1.1-2.1-.6-.5-1.5-.8-2.6-.8s-1.8.2-2.3.6-.8.9-.8,1.5.4,1.3,1.1,1.7,1.9.8,3.4,1.2c1.6.4,2.9.8,3.9,1.2s1.9,1.1,2.7,2,1.1,2.1,1.2,3.5c0,1.3-.3,2.4-1,3.4s-1.7,1.8-3,2.4-2.8.9-4.6.9-3.4-.3-4.8-1h.2v-.1Z"/>
                <path d="M67.6,28.2c-1.7-.9-3-2.3-4-4s-1.4-3.7-1.4-5.9.5-4.2,1.5-5.9,2.3-3,4.1-4c1.7-.9,3.6-1.4,5.7-1.4s4,.5,5.7,1.4,3.1,2.3,4.1,4,1.5,3.7,1.5,5.9-.5,4.2-1.5,5.9-2.4,3-4.1,4-3.7,1.4-5.8,1.4-4-.5-5.7-1.4h-.1ZM76.1,24c.9-.5,1.6-1.2,2.1-2.2s.8-2.2.8-3.6c0-2.1-.5-3.7-1.6-4.8s-2.4-1.7-4-1.7-2.9.6-4,1.7-1.6,2.7-1.6,4.8.5,3.7,1.6,4.8c1,1.1,2.4,1.7,3.9,1.7s1.9-.2,2.8-.7Z"/>
                <path d="M109.6,10.4v15.8c0,1.7-1.4,3-3,3h-2.5v-2.8c-.7.9-1.6,1.7-2.8,2.2-1.1.5-2.4.8-3.7.8s-3.2-.4-4.5-1.1-2.4-1.8-3.1-3.2c-.8-1.4-1.1-3.1-1.1-5V7.2h2.5c1.7,0,3,1.4,3,3v9c0,1.7.4,3.1,1.3,4s2.1,1.4,3.6,1.4,2.7-.5,3.6-1.4,1.3-2.3,1.3-4V7.1h2.5c1.7,0,3,1.4,3,3v.3h-.1Z"/>
                <path d="M132,9.5c1.6,1.6,2.4,3.9,2.4,6.9v9.8c0,1.7-1.4,3-3,3h-2.5v-12.1c0-1.7-.4-3.1-1.3-4-.9-.9-2.1-1.4-3.6-1.4s-2.7.5-3.6,1.4-1.3,2.3-1.3,4v9.1c0,1.7-1.4,3-3,3h-2.5V7.3h2.9c1.4,0,2.6,1.2,2.6,2.6h0c.7-.8,1.7-1.6,2.8-2.1,1.1-.5,2.4-.8,3.8-.8,2.6,0,4.7.8,6.3,2.5h0Z"/>
                <path d="M139.8,12.3c.9-1.7,2.1-3,3.6-4,1.5-.9,3.2-1.4,5.1-1.4s2.8.3,4.1.9,2.3,1.4,3.1,2.5V0h2.6c1.7,0,3,1.4,3,3v23.2c0,1.7-1.4,3-3,3h-2.6v-3.2c-.7,1.1-1.6,2-2.9,2.6-1.2.7-2.7,1-4.3,1s-3.5-.5-5.1-1.4c-1.5-.9-2.7-2.3-3.6-4s-1.3-3.7-1.3-6,.4-4.2,1.3-5.9h0ZM154.9,14.8c-.5-1-1.2-1.7-2.1-2.2-.9-.5-1.9-.8-2.9-.8s-2,.2-2.8.7c-.9.5-1.6,1.2-2.1,2.2s-.8,2.1-.8,3.4.3,2.5.8,3.5,1.3,1.7,2.1,2.3c.9.5,1.8.8,2.8.8s2-.3,2.9-.8,1.6-1.3,2.1-2.2c.5-1,.8-2.1.8-3.5s-.3-2.5-.8-3.5h0v.1Z"/>
                <path d="M173.7,8c1.3-.7,2.7-1,4.3-1s3.6.5,5.1,1.4,2.7,2.2,3.6,3.9,1.3,3.7,1.3,5.9-.4,4.2-1.3,6c-.9,1.7-2.1,3.1-3.6,4s-3.2,1.4-5.1,1.4-3-.3-4.3-1c-1.2-.7-2.2-1.5-3-2.5v10.5c0,1.7-1.4,3-3,3h-2.5V7.3h2.5c1.7,0,3,1.4,3,3h0c.7-.9,1.7-1.7,2.9-2.4h.1v.1ZM181.6,14.8c-.5-1-1.3-1.7-2.1-2.2-.9-.5-1.8-.7-2.9-.7s-1.9.3-2.8.8c-.9.5-1.6,1.3-2.1,2.2-.5,1-.8,2.1-.8,3.4s.3,2.5.8,3.4c.5,1,1.3,1.7,2.1,2.2.9.5,1.8.8,2.8.8s2-.3,2.9-.8,1.6-1.3,2.1-2.3.8-2.1.8-3.5-.3-2.5-.8-3.4h0v.1Z"/>
                <path d="M212.9,10.4v15.8c0,1.7-1.4,3-3,3h-2.5v-2.8c-.7.9-1.6,1.7-2.8,2.2-1.1.5-2.4.8-3.7.8s-3.2-.4-4.5-1.1-2.4-1.8-3.1-3.2c-.8-1.4-1.1-3.1-1.1-5V7.2h2.5c1.7,0,3,1.4,3,3v9c0,1.7.4,3.1,1.3,4s2.1,1.4,3.6,1.4,2.7-.5,3.6-1.4,1.3-2.3,1.3-4V7.1h2.5c1.7,0,3,1.4,3,3v.3h-.1Z"/>
                <path d="M225.4,8c1.3-.7,2.7-1,4.3-1s3.6.5,5.1,1.4,2.7,2.2,3.6,3.9,1.3,3.7,1.3,5.9-.4,4.2-1.3,6c-.9,1.7-2.1,3.1-3.6,4s-3.2,1.4-5.1,1.4-3.1-.3-4.3-1c-1.2-.6-2.2-1.5-2.9-2.5h0c0,1.8-1.4,3.1-3,3.1h-2.5V0h2.5c1.7,0,3,1.4,3,3v7.5c.7-1.1,1.7-1.9,2.9-2.6h0v.1ZM233.2,14.8c-.5-1-1.3-1.7-2.1-2.2-.9-.5-1.8-.7-2.9-.7s-1.9.3-2.8.8-1.6,1.3-2.1,2.2c-.5,1-.8,2.1-.8,3.4s.3,2.5.8,3.4c.5,1,1.3,1.7,2.1,2.2.9.5,1.8.8,2.8.8s2-.3,2.9-.8,1.6-1.3,2.1-2.3.8-2.1.8-3.5-.3-2.5-.8-3.4h0v.1Z"/>
              </g>

              {/* Kotak Background Ikon (Gradient) */}
              <path fill="url(#logo-gradient)" d="M35.9,5.8v24.5c0,3.1-2.5,5.6-5.6,5.6H5.8c-3.1,0-5.6-2.5-5.6-5.6V5.8C.2,2.7,2.7.2,5.8.2h24.6c3.1,0,5.6,2.5,5.6,5.6h-.1Z"/>

              {/* Gelombang/Ikon Putih & Teks Kecil Putih */}
              <g fill="#fff">
                <path d="M35.9,15.8v1.3h-3.3c-1.7,0-3.1-.8-4.1-2.3-1-1.6-1.8-3.3-2.7-4.9-.4-.7-.7-1.4-1.1-2.1-.2-.3-.3-.6-.5-.9-.3-.6-.6-1.2-.9-1.8-.7-1.1-1.7-1.7-2.7-1.7s-1.9.6-2.6,1.7c-.9,1.5-1.7,3.2-2.4,4.8-1.5,3.7-3.8,5.8-6.8,6.5-1.9.5-3.9.5-5.7.4H0v-1.3h5.2c1.1,0,2.3-.2,3.4-.4,2.3-.5,4-2,5.3-4.5.2-.4.4-.8.6-1.3v-.2c.7-1.6,1.4-3.3,2.4-4.9.9-1.4,2.2-2.2,3.7-2.3h0c1.5,0,2.9.8,3.8,2.3.4.6.7,1.3,1,1.9.1.3.3.6.4.9.4.7.7,1.4,1.1,2.1.8,1.6,1.7,3.3,2.6,4.8.8,1.3,1.9,1.8,3.4,1.7h3s0,.2,0,.2Z"/>
                <path d="M3.8,16.8l-.6-1.1c1.4-.8,2.8-2.4,3.4-3.8.5-1.2,1.1-2.5,1.8-3.7.7-1.1,1.7-1.7,2.8-1.7h0c1.1,0,2.2.6,2.9,1.7.3.4.5.9.7,1.4l.3.6-1.1.6c-.1-.2-.2-.4-.3-.6-.2-.4-.4-.9-.7-1.3-.5-.7-1.1-1.2-1.8-1.2h0c-.7,0-1.3.4-1.7,1.1-.6,1-1.1,2.1-1.7,3.5-.7,1.6-2.3,3.5-3.9,4.4h-.1v.1Z"/>
                <path d="M35.9,19.1v1.3h-4.6c-1.1,0-2.3.1-3.4.4-2.3.6-4.1,2-5.4,4.5h0c-.2.4-.4.9-.6,1.3v.2c-.7,1.6-1.4,3.3-2.4,4.9-.9,1.4-2.2,2.3-3.7,2.3h0c-1.5,0-2.8-.8-3.8-2.3-.4-.6-.7-1.3-1-1.9-.1-.3-.3-.6-.4-.9-.4-.7-.7-1.4-1.1-2.1-.8-1.6-1.7-3.3-2.6-4.8-.8-1.2-1.9-1.8-3.4-1.7H0v-1.3h3.5c1.9-.1,3.5.7,4.5,2.3,1,1.6,1.8,3.3,2.7,4.9.4.7.7,1.4,1.1,2,.1.3.3.6.4.9.3.6.6,1.2,1,1.8.7,1.1,1.7,1.7,2.7,1.7h0c1,0,1.9-.6,2.6-1.7,1-1.5,1.7-3.2,2.4-4.8,1.5-3.7,3.8-5.8,6.8-6.5,1.9-.5,3.9-.5,5.7-.4h2.5v-.1Z"/>
                <path d="M25.5,29.5c-1.1,0-2.2-.6-2.9-1.7-.3-.4-.5-.9-.7-1.4-.1-.2-.2-.4-.3-.6l1.1-.6c.1.2.2.4.3.7.2.4.4.8.7,1.2.5.7,1.1,1.2,1.8,1.2h0c-.7,0-1.3-.4-1.7-1.1.7-1.1,1.2-2.3,1.7-3.5.7-1.6,2.3-3.5,3.9-4.4l.6,1.1c-1.4.8-2.8,2.4-3.4,3.8-.5,1.2-1.1,2.5-1.8,3.7-.7,1.1-1.7,1.7-2.8,1.7h.1v-.1Z"/>
                {/* Bagian teks musik/tagline di bawah jika ada */}
                <path d="M47.1,35c-.4,0-.7.1-1,.3-.3.2-.6.4-.6.7-.1-.3-.3-.5-.5-.7-.3-.2-.5-.2-.9-.2s-.7,0-.9.2-.5.4-.5.7v-.9h-1v5.2h.1v-.2h1v-3.8c.1-.2.3-.2.4-.4.1-.2.2-.2.5-.2s.5.1.7.3c.3.2.3.4.3.7v3.5h1v-3.3c0-.3.1-.5.3-.8.2-.3.5-.3.8-.3s.5,0,.7.2c.3.2.3.4.3.8v3.4h1v-3.5c0-.6-.2-1-.5-1.3-.3-.4-.8-.4-1.2-.4Z"/>
                <path d="M53.5,38.1l.1.2c0,.3-.2.5-.2.7-.2.2-.3.4-.5.4h-.6c-.3,0-.6-.1-.8-.3-.3-.3-.3-.5-.3-.9v-3.2h-1v3.3c0,.4.1.8.2,1.1.1.3.3.7.6.7.3.2.5.2.9.2s.7-.1,1-.3.6-.4.6-.7v.9h1v-5.2h-1v3.1Z"/>
                <path d="M58.5,37.5l-.8-.2c-.3-.1-.4-.2-.6-.3-.2-.1-.2-.2-.2-.4s.1-.5.3-.5c.2-.2.5-.2.7-.2h.5l.3.3c.2.1.2.3.2.3l.75-.17c-.11-.34-.29-.66-.55-.83-.3-.4-.7-.4-1.3-.4-.3,0-.7.1-1,.2-.3.1-.4.3-.7.5-.3.2-.3.5-.3.8s.1.7.3.9c.3.2.6.5,1.1.5l.9.2c.3.1.6.3.6.3.2.1.2.2.2.4s-.1.5-.3.5c-.2.2-.5.2-.8.2s-.5-.2-.7-.2c-.2-.1-.4-.4-.4-.4h-1c.1.5.3.8.7,1.1.3.4,1,.4,1.4.4s.7,0,1.1-.2c.4-.2.5-.4.8-.6s.3-.4.3-.8-.2-.7-.4-.9c-.3-.2-.6-.5-1.1-.5Z"/>
                <path d="M61.5,33c-.2,0-.5.2-.5.2-.2.1-.2.3-.2.4s.2.4.2.4c.2.2.3.2.5.2s.5-.2.5-.2c.2-.1.2-.3.2-.4s-.2-.4-.2-.4c-.2-.2-.3-.2-.5-.2Z"/>
                <rect x="61" y="35.1" width="1" height="5.2"/>
                <path d="M64.9,36c.2-.2.4-.2.7-.2s.6.1.8.3c.2.1.4.4.4.6h1c0-.3-.1-.7-.3-.9s-.5-.6-.8-.6c-.3-.2-.6-.2-1.1-.2s-.9.1-1.3.3c-.3.3-.5.6-.8,1-.3.4-.3.9-.3,1.4s.1.9.3,1.4.4.7.8,1c.4.3.8.3,1.3.3l.1.1v-.2c.4,0,.8,0,1.1-.2.3-.1.5-.3.7-.6.3-.3.3-.6.3-.9h-1c0,.2-.1.4-.2.5s-.2.3-.4.3h-.5c-.3,0-.6,0-.8-.2-.2-.1-.3-.3-.5-.6-.2-.3-.2-.6-.2-1s.2-.7.2-1c.1-.2.3-.4.5-.6Z"/>
                <path d="M75.1,35.6c-.2-.2-.4-.5-.7-.5h-.9c-.5,0-.9.1-1.3.3-.3.3-.6.6-.8,1-.3.4-.3.9-.3,1.4s.1,1,.3,1.4c.2.4.5.7.9.9.3.3.8.3,1.3.3.4,0,.7-.1,1-.2.3-.1.5-.3.7-.5.2-.2.4-.4.4-.7l-1-.2c-.1.2-.3.4-.3.4-.1.3-.2.3-.4.3h-.5c-.3,0-.6,0-.8-.2s-.3-.3-.5-.6c-.16-.23-.19-.47-.2-.7h3.8v-.4c0-.5-.1-.9-.2-1.2-.1-.3-.3-.6-.5-.8ZM72,37.2c0-.2.1-.5.2-.7s.3-.3.5-.5.4-.2.7-.2.5.1.7.2c.2.1.3.3.5.5.2.2.2.4.2.7h-2.8Z"/>
                <path d="M78.5,36c.2-.2.4-.2.7-.2s.6.1.8.3c.2.1.4.4.4.6h1c0-.3-.1-.7-.3-.9-.2-.2-.5-.6-.8-.6-.3-.2-.6-.2-1.1-.2s-.9.1-1.3.3c-.3.3-.5.6-.8,1-.3.4-.3.9-.3,1.4s.1,1,.3,1.4c.2.5.4.7.8,1,.4.3.8.3,1.3.3l.1.1v-.2c.4,0,.8,0,1.1-.2.3-.1.5-.3.7-.6.3-.3.3-.6.3-.9h-1c0,.2-.1.4-.2.5-.1.1-.2.3-.4.3h-.5c-.3,0-.6,0-.8-.2-.2-.1-.3-.3-.5-.6-.2-.3-.2-.6-.2-1s.2-.7.2-1c.1-.2.3-.4.5-.6Z"/>
                <path d="M86,35.5c-.4-.3-.8-.3-1.3-.3s-.9.1-1.3.3c-.4.2-.7.5-.9.9-.3.4-.3.9-.3,1.4s.1,1,.3,1.4c.3.4.5.6.9.9.4.3.8.3,1.3.3s.9-.1,1.3-.3c.4-.2.7-.5.9-.9.3-.4.3-.9.3-1.4s-.1-1-.3-1.4c-.3-.4-.5-.6-.9-.9ZM86,38.5c-.1.3-.3.5-.5.7-.2.3-.5.3-.8.3s-.6-.1-.8-.3-.5-.4-.5-.7c-.2-.3-.2-.6-.2-.9s.1-.6.2-.9c.1-.3.3-.5.5-.7.2-.3.5-.3.8-.3s.6.1.8.3.5.4.5.7c.2.3.2.6.2.9s-.1.6-.2.9Z"/>
                <path d="M90.9,37.5l-.8-.2c-.3-.1-.4-.2-.6-.3s-.2-.2-.2-.4.1-.5.3-.5c.2-.2.5-.2.7-.2h.5c.1.1.3.3.3.3.2.1.2.3.2.3l.75-.17c-.11-.34-.29-.66-.55-.83-.3-.4-.7-.4-1.3-.4-.3,0-.7.2-1,.2-.3.1-.4.3-.7.5s-.3.5-.3.8.1.7.3.9c.3.2.6.5,1.1.5l.9.2c.3.1.6.3.6.3.2.1.2.2.2.4s-.1.5-.3.5c-.2.2-.5.2-.8.2s-.5-.1-.7-.2c-.2-.1-.4-.4-.4-.4h-1c.1.5.3.8.7,1.1.3.4,1,.4,1.4.4s.7,0,1.1-.2c.4-.2.5-.4.8-.6.3-.2.3-.4.3-.8s-.2-.7-.4-.9c-.3-.2-.6-.5-1.1-.5Z"/>
                <path d="M95.3,39.2l-1.3-4.1h-1.1l1.8,5.3v.3c-.1.2-.3.5-.3.5-.1.2-.4.2-.4.2h-.5l-.2.8h.7v-.08c.14.02.3.05.5-.02.3-.1.4-.2.6-.4.2-.2.4-.4.4-.7l2.2-5.9h-1.1l-1.3,4.1Z"/>
                <path d="M101.4,37.5l-.8-.2c-.3-.1-.4-.2-.6-.3s-.2-.2-.2-.4.1-.5.3-.5c.2-.2.5-.2.7-.2h.5c.1.1.3.3.3.3.2.1.2.3.2.3l.75-.17c-.11-.34-.29-.66-.55-.83-.3-.4-.7-.4-1.3-.4-.3,0-.7.2-1,.2-.3.1-.4.3-.7.5s-.3.5-.3.8.1.7.3.9c.3.2.6.5,1.1.5l.9.2c.3.1.6.3.6.3.2.1.2.2.2.4s-.1.5-.3.5c-.2.2-.5.2-.8.2s-.5-.1-.7-.2c-.2-.1-.4-.4-.4-.4h-1c.1.5.3.8.7,1.1.3.4,1,.4,1.4.4s.7,0,1.1-.2c.4-.2.5-.4.8-.6.3-.2.3-.4.3-.8s-.2-.7-.4-.9c-.3-.2-.6-.5-1.1-.5Z"/>
                <path d="M105.3,33.8h-1v.1l-.2-.2v1.3h-.6v.8h.6v3.1c0,.3.2.6.2.8.2.2.4.5.6.5h1.4l-.2-.8h-.6c-.2,0-.2-.2-.2-.2v-3.4h1.1v-.8h-1.1v-1.2Z"/>
                <path d="M111.2,35.6c-.2-.2-.4-.5-.7-.5h-.9c-.5,0-.9.1-1.3.3-.3.3-.6.6-.8,1-.3.4-.3.9-.3,1.4s.1,1,.3,1.4c.2.4.5.7.9.9.3.3.8.3,1.3.3.4,0,.7-.1,1-.2.3-.1.5-.3.7-.5s.4-.4.4-.7l-1-.2c-.1.2-.3.4-.3.4-.1.3-.2.3-.4.3h-.5c-.3,0-.6,0-.8-.2-.2-.2-.3-.3-.5-.6-.16-.23-.19-.47-.2-.7h3.8v-.4c0-.5-.1-.9-.2-1.2-.1-.3-.3-.6-.5-.8ZM108.1,37.2c0-.2.1-.5.2-.7.1-.2.3-.3.5-.5.2-.2.4-.2.7-.2s.5.1.7.2.3.3.5.5.2.4.2.7h-2.8Z"/>
                <path d="M119.7,35.4c-.3-.4-.8-.4-1.2-.4s-.7.1-1,.3-.6.4-.6.7c-.1-.3-.3-.5-.5-.7-.3-.2-.5-.2-.9-.2s-.7,0-.9.2c-.2.2-.5.4-.5.7v-.9h-1v5h1.1v-3.8c.1-.2.3-.2.4-.4.1-.2.2-.2.5-.2s.5.1.7.3c.3.2.3.4.3.7v3.5h1v-3.3c0-.3.1-.6.3-.8.2-.3.5-.3.8-.3s.5,0,.7.2c.3.2.3.4.3.8v3.4h1v-3.5c0-.6-.2-1-.5-1.3Z"/>
              </g>
            </svg>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setPricingHover(true)}
                  onMouseLeave={() => setPricingHover(false)}
                >
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors flex items-center gap-1 ${
                      isActive(link.path)
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${pricingHover ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {pricingHover && pricingCategories.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-card border border-border/50 rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        <div className="py-2">
                          <Link
                            to="/pricing"
                            className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            Semua Paket
                          </Link>
                          {pricingCategories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/pricing?category=${category.slug}`}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors ${
                    isActive(link.path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <Link to="/auth">Masuk</Link>
            </Button>
            <Button variant="hero" size="default" className="hidden sm:inline-flex" asChild>
              <Link to="/auth">Daftar</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-border/50"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => !link.hasDropdown && setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Mobile dropdown items */}
                  {link.hasDropdown && pricingCategories.length > 0 && (
                    <div className="ml-4 mt-1 space-y-1">
                      {pricingCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/pricing?category=${category.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 mt-4 px-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/auth">Masuk</Link>
                </Button>
                <Button variant="hero" className="flex-1" asChild>
                  <Link to="/auth">Daftar</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
