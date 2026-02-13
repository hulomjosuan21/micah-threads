import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/assets/micah-logo.png";

interface Footer7Props {
  className?: string;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
}

const defaultSocialLinks = [
  {
    icon: <FaInstagram className="size-5" />,
    href: "https://www.instagram.com/micah_threads/",
    label: "Instagram",
  },
  {
    icon: <FaFacebook className="size-5" />,
    href: "https://web.facebook.com/profile.php?id=100094703632683",
    label: "Facebook",
  },
];

const Footer = ({
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 micah threads & josuan.cv. All rights reserved.",
  className,
}: Footer7Props) => {
  return (
    <section className={cn("py-2 text-xs", className)}>
      <div className="max-w-200 w-full mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <Image src={logo} alt="Micah Threads" />
            </div>
            <span className="font-medium text-xs">Micah Threads</span>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="hover:text-primary transition-colors"
              >
                {React.cloneElement(social.icon)}
              </a>
            ))}
          </div>

          <div className="w-full text-center md:w-auto md:text-right text-[10px] opacity-70">
            {copyright}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer };
