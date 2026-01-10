import Link from "next/link";
import { Logo } from "@/components/Logo";

import Image from "next/image";
import { cdn } from "@/lib/cdn";

const servicesLinks = [
  { label: "Services", href: "/services" },
  { label: "Compare Services", href: "/compare" },
  { label: "Best Services", href: "/best" },
  { label: "Top Services", href: "/top" },
  { label: "Near Me", href: "/near-me" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Customers", href: "/customers" },
  { label: "Stories", href: "/stories" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "How To", href: "/how-to" },
  { label: "FAQ", href: "/faq" },
  { label: "Marketplace", href: "/marketplace/templates" },
  { label: "Support", href: "/support" },
];

const topPagesLinks = [
  { label: "Web Design Agency", href: "/web-design-agency" },
  { label: "Web Design Company", href: "/web-design-company" },
  { label: "Web Development Company", href: "/web-development-company" },
  { label: "E-Commerce Development", href: "/ecommerce-website-development" },
  { label: "Software Company", href: "/software-company" },
  { label: "Digital Marketing Services", href: "/digital-marketing-services" },
];

const platformLinks = [
  { label: "Docs", href: "https://docs.moydus.com", external: true },
  { label: "Choose Package", href: "https://app.moydus.com", external: true },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/moydus",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/moydus",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/moydus",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/moydus",
  },
  {
    label: "GitHub",
    href: "https://github.com/moydus",
  },
];

const locationLinks = [
  {
    label: "Google Maps",
    href: "https://www.google.com/maps/d/u/0/edit?mid=1PiBXsyTOSpvXJyMsghtgh1nI0R-wiSk&usp=sharing",
  },
  {
    label: "Google Business Profile",
    href: "https://maps.app.goo.gl/vG6rKsrURLD7ZfN99",
  },
  {
    label: "Apple Maps",
    href: "https://maps.apple.com/place?address=1209%20Mountain%20Road%20Pl%20NE,%20Ste%20N,%20Albuquerque,%20NM%20%2087110,%20United%20States&coordinate=35.091662,-106.558042&name=Moydus&place-id=I7227B81EF3262EDD&map=explore",
  },
];

const renderLink = (
  link:
    | { label: string; href: string; external?: false }
    | { label: string; href: string; external: true },
  index: number
) => {
  if ("external" in link && link.external) {
    return (
      <li key={`${link.label}-${index}`} className="font-medium">
        <Link
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#ff4d00] transition-colors duration-200"
        >
          {link.label}
        </Link>
      </li>
    );
  }

  return (
    <li key={`${link.label}-${index}`} className="font-medium">
      <Link
        href={link.href}
        className="hover:text-[#ff4d00] transition-colors duration-200"
      >
        {link.label}
      </Link>
    </li>
  );
};

type Location = {
  cityName?: string;
  countryName?: string;
  stateName?: string;
};

export default function Footer({ location }: { location?: Location }) {
  return (
    <section className="bg-[#000000] pt-4 border-t-[1px] border-[#000000]">
      <div className="container mx-auto max-w-6xl pt-5 px-4 py-5 bg-[#000000]">
        <footer className="bg-[#000000]">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-8">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href="/" className="flex max-h-8 items-center gap-3">
                  <Logo variant="default" />
                </Link>
              </div>
              <p className="mt-4 max-w-xs text-sm font-semibold text-[#b8b9b9]">
                We are everywhere, including{" "}
                {location?.cityName || (
                    <span className="font-bold underline text-[#ff4d00]">
                      your city
                    </span>
                  ) || <span className="font-bold">your city</span>}{" "}
                - Growth playbooks, technical delivery, and analytics built for
                operators.
              </p>
              <div className="mt-4">
                <p className="text-sm text-[#b8b9b9] mb-2">
                  <strong className="text-white">Office Address:</strong>
                  <br />
                  Moydus LLC | E-Commerce, Social, Web Design & SaaS Agency -
                  USA
                  <br />
                  1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, United
                  States
                </p>
                <a
                  href="https://maps.app.goo.gl/vG6rKsrURLD7ZfN99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff4d00] hover:text-[#ff4d00]/80 transition-colors text-sm inline-flex items-center gap-1"
                >
                  📍 View our location on Google Maps
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-white">Top Pages</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {topPagesLinks.map((link, index) => renderLink(link, index))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-white">Services</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {servicesLinks.map((link, index) => renderLink(link, index))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-white">Company</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {companyLinks.map((link, index) => renderLink(link, index))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-white">Resources</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {resourceLinks.map((link, index) => renderLink(link, index))}
              </ul>
            </div>

            {location?.cityName && (
              <div>
                <h3 className="mb-4 font-bold text-white">
                  {location.cityName} Services
                </h3>
                <ul className="space-y-4 text-[#b8b9b9]">
                  <li className="font-medium">
                    <Link
                      href="/{location.cityName}"
                      className="hover:text-[#ff4d00] transition-colors duration-200"
                    >
                      {location.cityName} Services
                    </Link>
                  </li>
                  <li className="font-medium">
                    <Link
                      href="/{location.cityName}/seo-services"
                      className="hover:text-[#ff4d00] transition-colors duration-200"
                    >
                      SEO Services
                    </Link>
                  </li>
                  <li className="font-medium">
                    <Link
                      href="/{location.cityName}/web-design"
                      className="hover:text-[#ff4d00] transition-colors duration-200"
                    >
                      Web Design
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-4 font-bold text-white">Platform</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {platformLinks.map((link, index) => renderLink(link, index))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-white">Legal</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {legalLinks.map((link, index) => renderLink(link, index))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-white">Follow Moydus</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {socialLinks.map(({ label, href }, index) => (
                  <li key={`${label}-${index}`} className="font-medium">
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#ff4d00] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-white">Find Us</h3>
              <ul className="space-y-4 text-[#b8b9b9]">
                {locationLinks.map(({ label, href }, index) => (
                  <li key={`${label}-${index}`} className="font-medium">
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#ff4d00] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="https://status.moydus.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium text-[13px] px-3 py-1 bg-[#262626] text-[#C7C5C5] border border-transparent hover:bg-[#3a3a3a] hover:text-white transition-colors duration-200"
            >
              <svg
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-green-500"
                aria-hidden="true"
              >
                <path
                  d="M5.00001 15.352C4.89601 15.352 4.79101 15.331 4.69001 15.285C1.84101 13.988 0.00100708 11.129 0.00100708 8C0.00100708 4.871 1.84101 2.012 4.68901 0.715004C5.06601 0.543004 5.51001 0.710004 5.68201 1.087C5.85301 1.464 5.68701 1.909 5.31001 2.08C2.99501 3.134 1.49901 5.457 1.49901 7.999C1.49901 10.541 2.99501 12.865 5.31001 13.918C5.68701 14.089 5.85301 14.534 5.68201 14.911C5.55601 15.187 5.28401 15.35 4.99901 15.35L5.00001 15.352Z"
                  fill="currentColor"
                />
                <path
                  d="M11 15.352C10.715 15.352 10.443 15.189 10.317 14.913C10.146 14.536 10.312 14.091 10.689 13.92C13.004 12.866 14.5 10.543 14.5 8.00101C14.5 5.45901 13.004 3.13501 10.689 2.08201C10.312 1.91101 10.146 1.46601 10.317 1.08901C10.49 0.713011 10.935 0.546011 11.31 0.717011C14.159 2.01401 15.999 4.87301 15.999 8.00201C15.999 11.131 14.158 13.99 11.31 15.287C11.209 15.333 11.104 15.354 11 15.354V15.352Z"
                  fill="currentColor"
                />
                <path
                  d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                  fill="currentColor"
                />
              </svg>
              All systems normal
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t-[1px] border-[#262626] pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <ul className="flex gap-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#C7C5C5] hover:text-[#ff4d00] transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <span className="text-[#C7C5C5]">|</span>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-[#C7C5C5] hover:text-[#ff4d00] transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <span className="text-[#C7C5C5]">|</span>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-[#C7C5C5] hover:text-[#ff4d00] transition-colors duration-200"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
            <p className="text-[#a6a6a6]">
              © {new Date().getFullYear()} Moydus. Based U.S.A 🇺🇸
            </p>
          </div>
        </footer>
        <div
          className="text-center text-sm text-muted-foreground"
          style={{
            WebkitMaskImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 331%)",
            maskImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 331%)",
            opacity: 1,
          }}
        >
          <Image
            src={cdn("/moydus.png", 800, 85)}
            alt="Moydus Logo"
            width={800}
            height={800}
            className="mx-auto object-contain w-full h-full"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
