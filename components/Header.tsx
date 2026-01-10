"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { cdn } from "@/lib/cdn";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Desktop Menu */}
        <div className="mx-auto hidden h-[58px] w-full items-center text-white justify-between transition duration-500 ease-in-out md:flex">
          {/* Logo */}
          <div className="flex lg:w-[225px]">
            <Link href="/">
              {/* <svg
                className="text-gray-12"
                fill="currentColor"
                height="18"
                viewBox="0 0 79.67004 19.89868"
                width="79.67004"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.4699707,0 L18.3500061,0 C19.7970276,0 20.9699707,1.17294312 20.9699707,2.62001038 L20.9699707,12.9500122 C20.9699707,17.2779541 17.4579468,20.7899475 13.1299744,20.7899475 C11.1654663,20.7899475 9.39001465,20.0064697 8.08496094,18.7450256 L10.6949463,16.1349487 C11.3334961,16.7734985 12.1869507,17.1699829 13.1299744,17.1699829 C15.4604492,17.1699829 17.3500061,15.280426 17.3500061,12.9500122 L17.3500061,11.8763428 C16.4489746,12.7773743 15.2119751,13.3300171 13.8399658,13.3300171 C10.6929321,13.3300171 8.14001465,10.7770996 8.14001465,7.6300354 C8.14001465,4.48297119 10.6929321,1.92999268 13.8399658,1.92999268 C15.2119751,1.92999268 16.4489746,2.48263550 17.3500061,3.38366699 L17.3500061,2.62001038 C17.3500061,1.17294312 18.5229492,0 19.9699707,0 L13.4699707,0 Z M13.8399658,9.70001221 C15.2029724,9.70001221 16.3099976,8.59298706 16.3099976,7.22998047 C16.3099976,5.86697388 15.2029724,4.75994873 13.8399658,4.75994873 C12.4769287,4.75994873 11.3699341,5.86697388 11.3699341,7.22998047 C11.3699341,8.59298706 12.4769287,9.70001221 13.8399658,9.70001221 Z M37.2900391,7.22998047 L37.2900391,12.9500122 L33.6700439,12.9500122 L33.6700439,7.64001465 C33.6700439,6.27700806 32.5630493,5.16998291 31.2000122,5.16998291 C29.8370056,5.16998291 28.730011,6.27700806 28.730011,7.64001465 L28.730011,12.9500122 L25.1099854,12.9500122 L25.1099854,2.32995605 L28.730011,2.32995605 L28.730011,3.38366699 C29.6310425,2.48263550 30.868042,1.92999268 32.2400513,1.92999268 C35.3870239,1.92999268 37.9400024,4.48297119 37.9400024,7.6300354 L37.2900391,7.22998047 Z M53.0500488,7.6300354 C53.0500488,10.7770996 50.4970703,13.3300171 47.3500366,13.3300171 C45.9780273,13.3300171 44.7410278,12.7773743 43.8400269,11.8763428 L43.8400269,18.0799866 L40.2199707,18.0799866 L40.2199707,2.32995605 L43.8400269,2.32995605 L43.8400269,3.38366699 C44.7410278,2.48263550 45.9780273,1.92999268 47.3500366,1.92999268 C50.4970703,1.92999268 53.0500488,4.48297119 53.0500488,7.6300354 Z M49.4199829,7.6300354 C49.4199829,6.26702881 48.3129883,5.15997314 46.9500122,5.15997314 C45.5869751,5.15997314 44.4800415,6.26702881 44.4800415,7.6300354 C44.4800415,8.99301147 45.5869751,10.1000671 46.9500122,10.1000671 C48.3129883,10.1000671 49.4199829,8.99301147 49.4199829,7.6300354 Z M61.8699951,1.92999268 C65.0170288,1.92999268 67.5700073,4.48297119 67.5700073,7.6300354 C67.5700073,10.7770996 65.0170288,13.3300171 61.8699951,13.3300171 C60.4980164,13.3300171 59.2609863,12.7773743 58.3599854,11.8763428 L58.3599854,12.9500122 L54.7399902,12.9500122 L54.7399902,2.32995605 L58.3599854,2.32995605 L58.3599854,3.38366699 C59.2609863,2.48263550 60.4980164,1.92999268 61.8699951,1.92999268 Z M61.4700317,9.70001221 C62.8330383,9.70001221 63.9400024,8.59298706 63.9400024,7.22998047 C63.9400024,5.86697388 62.8330383,4.75994873 61.4700317,4.75994873 C60.1069946,4.75994873 59,5.86697388 59,7.22998047 C59,8.59298706 60.1069946,9.70001221 61.4700317,9.70001221 Z M79.6699829,7.22998047 L79.6699829,12.9500122 L76.0499878,12.9500122 L76.0499878,7.64001465 C76.0499878,6.27700806 74.9430237,5.16998291 73.5800171,5.16998291 C72.2169495,5.16998291 71.1100159,6.27700806 71.1100159,7.64001465 L71.1100159,12.9500122 L67.4899902,12.9500122 L67.4899902,2.32995605 L71.1100159,2.32995605 L71.1100159,3.38366699 C72.0110474,2.48263550 73.2480469,1.92999268 74.6200256,1.92999268 C77.7670288,1.92999268 80.3200073,4.48297119 80.3200073,7.6300354 L79.6699829,7.22998047 Z M0.639984131,2.32995605 L4.26000977,2.32995605 L4.26000977,3.88696289 C4.98999023,2.73999023 6.32000732,1.92999268 7.90997314,1.92999268 C9.21002197,1.92999268 10.3800049,2.51000977 11.1199951,3.45996094 L9.01000977,6.0199585 C8.69000244,5.63000488 8.23999023,5.40997314 7.75,5.40997314 C6.59002686,5.40997314 5.65997314,6.40997314 5.65997314,7.6300354 L5.65997314,12.9500122 L0.639984131,12.9500122 L0.639984131,2.32995605 Z"></path>
              </svg> */}
              <Logo />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div style={{ position: "relative" }}>
            <NavigationMenu>
              <NavigationMenuList
                data-orientation="horizontal"
                className="flex items-center"
              >
                {/* Templates */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gray-10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-gray-10 gap-[2px]">
                    Templates
                    <svg
                      className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:translate-y-0.5"
                      fill="none"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M15.25 10.75L12 14.25L8.75 10.75"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-[#000000]  rounded-2xl border border-white/10">
                    <ul className="w-[30rem] flex h-full flex-row items-stretch justify-between gap-4 p-2">
                      <li className="row-span-3 w-64 max-w-64">
                        <div className="flex gap-3 h-full">
                          <Link
                            href="/marketplace/templates/category"
                            className="flex-1 flex flex-col rounded-xl border border-white/10 bg-[#000000] hover:bg-[#202020] transition-colors overflow-hidden"
                          >
                            <div className="px-3 pt-3 pb-2">
                              <span className="font-medium text-[#C7C5C5] group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                                Categories
                              </span>
                            </div>
                            <div className="flex-1 relative overflow-hidden min-h-[140px]">
                              <img
                                alt="Template Categories"
                                loading="lazy"
                                width="100"
                                height="100"
                                decoding="async"
                                className="w-full h-full object-cover"
                                src={cdn("/nav-tem-1.webp", 200, 85)}
                                style={{ color: "transparent" }}
                              />
                            </div>
                          </Link>
                          <Link
                            href="/marketplace/templates"
                            className="flex-1 flex flex-col rounded-xl border border-white/10 bg-[#000000] hover:bg-[#202020] transition-colors overflow-hidden"
                          >
                            <div className="px-3 pt-3 pb-2">
                              <span className="font-medium text-[#C7C5C5] group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                                All Templates
                              </span>
                            </div>
                            <div className="flex-1 relative overflow-hidden min-h-[140px]">
                              <img
                                alt="All Templates"
                                loading="lazy"
                                width="100"
                                height="100"
                                decoding="async"
                                className="w-full h-full object-cover"
                                src={cdn("/bg-features.webp", 200, 85)}
                              />
                            </div>
                          </Link>
                        </div>
                      </li>
                      <div className="flex flex-col gap-1 flex-1">
                        <ListItem
                          href="/services"
                          title="Services"
                          className=""
                        >
                          Explore our services
                        </ListItem>
                        <ListItem
                          href="/digital-marketing-services"
                          title="Digital Marketing"
                          className=""
                        >
                          SEO, content & performance marketing
                        </ListItem>
                        <ListItem href="/compare" title="Compare" className="">
                          Compare services
                        </ListItem>
                        <ListItem
                          href="/best"
                          title="Best Services"
                          className=""
                        >
                          Find the best services
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gray-10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-gray-10 gap-[2px]">
                    Company
                    <svg
                      className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:translate-y-0.5"
                      fill="none"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M15.25 10.75L12 14.25L8.75 10.75"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-[#000000]  rounded-2xl border border-white/10">
                    <ul className="w-[30rem] flex h-full flex-row items-stretch justify-between gap-4 p-2  rounded-2xl">
                      <li className="row-span-3 w-64 max-w-64">
                        <div className="flex flex-col gap-3 h-full ">
                          <Link
                            href="/about"
                            className="flex gap-3 items-center px-3 py-1 border border-white/10 rounded-2xl rounded-xl bg-[#000000]  hover:bg-[#1C1C1C90] transition-colors"
                          >
                            <img
                              alt="About Us"
                              loading="lazy"
                              width="70"
                              height="70"
                              decoding="async"
                              className="w-[70px] h-[70px] rounded-lg object-cover"
                              src={cdn("/team.png", 200, 85)}
                              style={{ color: "transparent" }}
                            />
                            <div className="flex flex-col gap-1">
                              <span className="font-medium text-[#C7C5C5] group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                                About Us
                              </span>
                              <span className="font-normal text-[#C7C5C5]/70 font-display text-xs tracking-[.0125rem]">
                                Learn about our company
                              </span>
                            </div>
                          </Link>
                          <Link
                            href="/stories"
                            className="flex gap-3 items-center px-3 py-1 border border-white/10 rounded-2xl bg-[#000000]  hover:bg-[#1C1C1C90] transition-colors"
                          >
                            <img
                              alt="Stories"
                              loading="lazy"
                              width="70"
                              height="70"
                              decoding="async"
                              className="w-[70px] h-[70px] rounded-lg object-cover"
                              src={cdn("/stories.png", 200, 85)}
                              style={{ color: "transparent" }}
                            />
                            <div className="flex flex-col gap-1">
                              <span className="font-medium text-[#C7C5C5] group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                                Stories
                              </span>
                              <span className="font-normal text-[#C7C5C5]/70 font-display text-xs tracking-[.0125rem]">
                                Customer success stories
                              </span>
                            </div>
                          </Link>
                        </div>
                      </li>
                      <div className="flex flex-col  flex-1">
                        <ListItem href="/blog" title="Blog" className="">
                          <span className="">Read our latest posts</span>
                        </ListItem>
                        <ListItem href="/careers" title="Careers" className="">
                          <span className="">Join our team</span>
                        </ListItem>
                        <ListItem
                          href="/customers"
                          title="Customers"
                          className=""
                        >
                          <span className="">Our customers</span>
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gray-10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-gray-10 gap-[2px]">
                    Resources
                    <svg
                      className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:translate-y-0.5"
                      fill="none"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M15.25 10.75L12 14.25L8.75 10.75"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-[#000000]   rounded-2xl border border-white/10">
                    <ul className="w-[30rem] flex h-full flex-row items-stretch justify-between gap-4 p-2">
                      <Link href="/blog" className="w-full">
                        <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-48 overflow-hidden rounded-2xl bg-[#07020470] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                          <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                          <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                            <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle, rgb(0, 0, 0)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(142%_172%_at_116%_-36%,_rgba(0,0,0,0)_0%,rgba(0, 0, 0, 0.4)_100%),_rgba(18,18,18,.76)] mix-blend-hard-light blur-xs backdrop-filter"></div>
                            <img
                              alt="Blog"
                              loading="lazy"
                              width="276"
                              height="336"
                              decoding="async"
                              className="opacity-50 w-full h-full object-cover"
                              src={cdn("/moydus.png", 200, 85)}
                              style={{ color: "transparent" }}
                            />
                            <div className="absolute top-0 left-0 pt-3 pl-3 flex flex-col gap-0.5">
                              <span className="font-normal  text-[#C7C5C5]  group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                                Blog
                              </span>
                              <span className="text-xs text-[#C7C5C5]/70 font-normal">
                                Read our latest posts
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="flex flex-col gap-1 flex-1">
                        <ListItem href="/how-to" title="How To">
                          Step-by-step guides
                        </ListItem>
                        <ListItem href="/faq" title="FAQ">
                          Frequently asked questions
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Help */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gray-10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-gray-10 gap-[2px]">
                    Help
                    <svg
                      className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:translate-y-0.5"
                      fill="none"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M15.25 10.75L12 14.25L8.75 10.75"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-[#000000]  rounded-2xl border border-white/10">
                    <ul className="w-[30rem] flex h-full flex-row items-stretch justify-between gap-4 p-2">
                      <li className="row-span-3 w-64 max-w-64">
                        <Link href="/support" className="w-full">
                          <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-48 overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                            <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                            <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                              <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle, rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(142%_172%_at_116%_-36%,_rgba(0,0,0,0)_0%,rgba(0, 0, 0, 0.4)_100%),_rgba(18,18,18,.76)] mix-blend-hard-light blur-xs backdrop-filter"></div>
                              <img
                                alt="Support"
                                loading="lazy"
                                width="276"
                                height="336"
                                decoding="async"
                                className="opacity-50 w-full h-full object-cover"
                                src={cdn("/nav-tem-1.webp", 200, 85)}
                                style={{ color: "transparent" }}
                              />
                              <div className="absolute top-0 pt-3 pl-3 flex flex-col gap-0.5">
                                <span className="font-normal text-[#C7C5C5] group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                                  Support
                                </span>
                                <span className="text-xs text-[#C7C5C5]/70 font-normal">
                                  Get help from our team
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <div className="flex flex-col  flex-1">
                        <ListItem href="/contact" title="Contact">
                          Get in touch
                        </ListItem>
                        <ListItem href="/faq" title="FAQ">
                          Frequently asked questions
                        </ListItem>
                        <ListItem
                          href="https://status.moydus.com"
                          title="Status"
                        >
                          System status
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Docs */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gray-10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-gray-10 gap-[2px]">
                    Docs
                    <svg
                      className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:translate-y-0.5"
                      fill="none"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M15.25 10.75L12 14.25L8.75 10.75"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-[#000000]  rounded-2xl border border-white/10">
                    <ul className="w-[30rem] flex h-full flex-row items-stretch justify-between gap-4 p-2">
                      <li className="row-span-3 w-64 max-w-64">
                        <Link href="https://docs.moydus.com" className="w-full">
                          <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-48 overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                            <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                            <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                              <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle, rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(142%_172%_at_116%_-36%,_rgba(0,0,0,0)_0%,rgba(0, 0, 0, 0.4)_100%),_rgba(18,18,18,.76)] mix-blend-hard-light blur-xs backdrop-filter"></div>
                              <img
                                alt="Introduction"
                                loading="lazy"
                                width="276"
                                height="336"
                                decoding="async"
                                className="opacity-50 w-full h-full object-cover"
                                src={cdn("/moydus.png", 200, 85)}
                                style={{ color: "transparent" }}
                              />
                              <div className="absolute top-0 left-0 pt-3 pl-3">
                                <span className="text-xs text-[#C7C5C5] text-left bg-white/10 rounded-md p-2 font-normal block tracking-wide">
                                  Docs
                                </span>
                                <span className="font-normal text-[#C7C5C5]/70 group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                                  Complete documentation and guides
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <div className="flex flex-col gap-1 flex-1">
                        <ListItem href="https://docs.moydus.com" title="Docs">
                          Complete documentation and guides
                        </ListItem>
                        <ListItem
                          href="https://docs.moydus.com/select-package/introduction"
                          title="How to Choose a Package"
                        >
                          How to choose your perfect business package
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <Link
                    href="pricing"
                    passHref
                    className="group inline-flex h-9 w-max text-white hover:text-white/80 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 lg:w-[225px] lg:justify-end">
            <Link
              href="https://app.moydus.com/login"
              className="inline-flex h-9 items-center justify-center hover:text-white/80 rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-9 transition-colors hover:text-gray-10 focus:outline-none"
            >
              Log In
            </Link>
            <Link
              href="https://app.moydus.com/signup"
              className="relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md px-4 py-2 text-sm font-medium text-white backdrop-blur-[25px] transition-all hover:opacity-90 focus:outline-none"
              style={{
                background:
                  "linear-gradient(110.83deg, rgba(255, 255, 255, 0.4) -19.16%, rgba(255, 255, 255, 0) 86.93%), linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mx-auto flex h-[58px] w-full items-center bg-[#070204] rounded-lg px-6 justify-between text-white md:hidden mt-4">
          {/* Logo */}
          <div className="flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown************ */}
        <div
          className={`bg-[#070204] absolute left-0 top-0 z-20 flex w-full flex-col items-center md:hidden transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex w-full items-center px-6 py-4">
            <div className="flex-auto">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="outline-hidden transition text-white duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7"
              >
                <Logo />
              </Link>
            </div>
            <div className="flex flex-auto justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-1 text-white transition ease-in-out hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/20"
                type="button"
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden h-[calc(100dvh-72px)] flex w-full py-4 md:hidden bg-[#070204] rounded-lg">
            <div className="relative w-full">
              {/* Main Menu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-screen ${
                  activeSubmenu ? "hidden" : ""
                }`}
              >
                <Link
                  href="https://app.moydus.com/login"
                  className="inline-flex items-center justify-center border select-none relative cursor-pointer  disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 bg-black/30 border-white/20 text-white not-disabled:hover:bg-white/20 focus-visible:bg-white/20 focus-visible:ring-white/20 font-normal focus-visible:ring-2 focus-visible:outline-hidden text-base h-11 px-4 rounded-xl gap-2 mb-4 w-full"
                >
                  Log In
                </Link>
                <Link
                  href="https://app.moydus.com/signup"
                  className="font-semibold inline-flex items-center justify-center border select-none relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 bg-white border-white/20 text-black not-disabled:hover:bg-white/20 focus-visible:bg-white/20 focus-visible:ring-white/20 focus-visible:ring-2 focus-visible:outline-hidden text-base h-11 px-4 rounded-xl gap-2 mb-4 w-full"
                >
                  Get Started
                </Link>
                <button
                  onClick={() => setActiveSubmenu("templates")}
                  className="flex items-center justify-between text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                >
                  Templates
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19 12H4.75"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveSubmenu("company")}
                  className="flex items-center justify-between text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                >
                  Company
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19 12H4.75"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveSubmenu("resources")}
                  className="flex items-center justify-between text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                >
                  Resources
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19 12H4.75"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveSubmenu("help")}
                  className="flex items-center justify-between text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                >
                  Help
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19 12H4.75"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveSubmenu("docs")}
                  className="flex items-center justify-between text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-slate-12"
                >
                  Docs
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19 12H4.75"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <Link
                  href="/pricing"
                  className="flex items-center justify-between text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </div>

              {/* Templates Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-screen bg-[#070204] rounded-lg ${
                  activeSubmenu === "templates" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-white not-disabled:hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-white/20 -ml-1"
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.25 6.75L4.75 12L10.25 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19.25 12H5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <div className="my-6">
                  <div className="flex gap-2 items-stretch h-48">
                    <Link
                      href="/marketplace/templates/category"
                      className="w-1/2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-full overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                        <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                        <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                          <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                          <img
                            alt="Categories"
                            loading="lazy"
                            width="276"
                            height="336"
                            decoding="async"
                            className="w-full h-full object-cover"
                            src={cdn("/nav-tem-1.webp", 200, 85)}
                            style={{ color: "transparent" }}
                          />
                          <span className="font-normal text-white group/nav-card:focus-visible:text-white font-display text-sm tracking-[.0125rem] absolute top-0 pt-3 pl-3">
                            Template
                            <br />
                            Categories
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/marketplace/templates"
                      className="w-1/2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-full overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                        <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                        <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                          <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                          <img
                            alt="All Templates"
                            loading="lazy"
                            width="276"
                            height="336"
                            decoding="async"
                            className="w-full h-full object-cover"
                            src={cdn("/nav-temp-2.webp", 200, 85)}
                            style={{ color: "transparent" }}
                          />
                          <span className="font-normal text-white group/nav-card:focus-visible:text-white font-display text-sm tracking-[.0125rem] absolute top-0 pt-3 pl-3">
                            All
                            <br />
                            Templates
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <Link
                  href="/services"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/compare"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare Services
                </Link>
                <Link
                  href="/best"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Best Services
                </Link>
              </div>

              {/* Company Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-screen bg-[#070204]  rounded-lg ${
                  activeSubmenu === "company" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-white not-disabled:hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-white/20 -ml-1"
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.25 6.75L4.75 12L10.25 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19.25 12H5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <div className="my-6">
                  <div className="flex flex-col gap-2 items-stretch h-full">
                    <Link
                      href="/about"
                      className="h-1/2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-full overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                        <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                        <div className="relative h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden">
                          <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(142%_172%_at_116%_-36%,_rgba(0,0,0,0)_0%,rgba(72,72,72,.40)_100%),_rgba(18,18,18,.76)] mix-blend-hard-light blur-xs backdrop-filter"></div>
                          <div className="relative flex gap-5 justify-start items-center px-3 h-full">
                            <img
                              alt="About Us"
                              loading="lazy"
                              width="60"
                              height="60"
                              decoding="async"
                              className="w-[70px] h-[70px] rounded-2xl object-cover p-1"
                              src={cdn("/team.png", 200, 85)}
                              style={{ color: "transparent" }}
                            />
                            <div className="flex flex-col gap-0.5">
                              <span className="font-normal text-white group/nav-card:focus-visible:text-white font-display text-sm tracking-[.0125rem]">
                                About Us
                              </span>
                              <span className="text-xs text-white font-normal">
                                Learn about our company
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/stories"
                      className="h-1/2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-full overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                        <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                        <div className="relative h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden">
                          <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(142%_172%_at_116%_-36%,_rgba(0,0,0,0)_0%,rgba(72,72,72,.40)_100%),_rgba(18,18,18,.76)] mix-blend-hard-light blur-xs backdrop-filter"></div>
                          <div className="relative flex gap-5 justify-start items-center px-3 h-full">
                            <img
                              alt="Stories"
                              loading="lazy"
                              width="70"
                              height="70"
                              decoding="async"
                              className="w-[70px] h-[70px] rounded-2xl object-cover p-1"
                              src={cdn("/stories.png", 200, 85)}
                              style={{ color: "transparent" }}
                            />
                            <div className="flex flex-col gap-0.5">
                              <span className="font-normal text-white group/nav-card:focus-visible:text-white font-display text-sm tracking-[.0125rem]">
                                Stories
                              </span>
                              <span className="text-xs text-white font-normal">
                                Customer success stories
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/careers"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Careers
                </Link>
                <Link
                  href="/customers"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Customers
                </Link>
              </div>

              {/* Resources Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-screen bg-[#070204] rounded-lg ${
                  activeSubmenu === "resources" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-white not-disabled:hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-white/20 -ml-1"
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.25 6.75L4.75 12L10.25 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19.25 12H5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <div className="my-6">
                  <Link
                    href="/blog"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-full overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                      <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                      <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                        <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(142%_172%_at_116%_-36%,_rgba(0,0,0,0)_0%,rgba(72,72,72,.40)_100%),_rgba(18,18,18,.76)] mix-blend-hard-light blur-xs backdrop-filter"></div>
                        <img
                          alt="Blog"
                          loading="lazy"
                          width="276"
                          height="336"
                          decoding="async"
                          className="opacity-50 w-full h-full object-cover"
                          src={cdn("/moydus.png", 276, 85)}
                          style={{ color: "transparent" }}
                        />
                        <span className="font-normal text-white group/nav-card:focus-visible:text-white font-display text-sm tracking-[.0125rem] absolute top-0 pt-3 pl-3">
                          Blog
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  href="/how-to"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How To
                </Link>
                <Link
                  href="/faq"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>

              {/* Help Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-screen bg-[#070204] rounded-lg ${
                  activeSubmenu === "help" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-white not-disabled:hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-white/20 -ml-1"
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.25 6.75L4.75 12L10.25 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19.25 12H5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <div className="my-6">
                  <Link
                    href="/support"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-full overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                      <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                      <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                        <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                        <img
                          alt="Support"
                          loading="lazy"
                          width="276"
                          height="336"
                          decoding="async"
                          className="opacity-50 w-full h-full object-cover"
                          src="/nav-tem-1.webp"
                          style={{ color: "transparent" }}
                        />
                        <span className="font-normal text-white group/nav-card:focus-visible:text-white font-display text-sm tracking-[.0125rem] absolute top-0 pt-3 pl-3">
                          Support
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  href="/support"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Support
                </Link>
                <Link
                  href="/contact"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="https://status.moydus.com"
                  target="_blank"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Status
                </Link>
              </div>

              {/* Docs Submenu */}
              <div
                className={`absolute top-0 left-0 min-h-full px-6 w-screen bg-[#070204] rounded-lg ${
                  activeSubmenu === "docs" ? "" : "hidden"
                }`}
              >
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:outline-hidden h-8 w-8 min-w-8 rounded-xl bg-transparent border-none text-white not-disabled:hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-white/20 -ml-1"
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.25 6.75L4.75 12L10.25 17.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M19.25 12H5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
                <div className="my-6">
                  <Link
                    href="https://docs.moydus.com"
                    target="_blank"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] border border-transparent hover:border-[#373737] group/nav-card relative h-full overflow-hidden rounded-2xl bg-[#1C1C1C70] p-px [box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]">
                      <div className="absolute -inset-px opacity-40 bg-gradient-to-b from-white/10 transition-colors duration-300 ease-[cubic-bezier(.36,.66,.6,1)] group-hover/nav-card:bg-[#373737]"></div>
                      <div className="h-full w-full rounded-[calc(1rem-2px)] bg-[#1C1C1C70] overflow-hidden relative flex items-end">
                        <div className="absolute left-1/3 top-2/3 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-5 blur-2xl"></div>
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(142%_172%_at_116%_-36%,_rgba(0,0,0,0)_0%,rgba(72,72,72,.40)_100%),_rgba(18,18,18,.76)] mix-blend-hard-light blur-xs backdrop-filter"></div>
                        <img
                          alt="Documentation"
                          loading="lazy"
                          width="276"
                          height="336"
                          decoding="async"
                          className="opacity-50 w-full h-full object-cover"
                          src={cdn("/moydus.png", 276, 85)}
                          style={{ color: "transparent" }}
                        />
                        <div className="absolute top-0 pt-3 pl-3">
                          <span className="text-xs text-white/70 font-normal block tracking-wide">
                            Docs
                          </span>
                          <span className="font-normal text-[#C7C5C5] group/nav-card:focus-visible:text-gray-10 font-display text-sm tracking-[.0125rem]">
                            Complete documentation and guides
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  href="https://docs.moydus.com"
                  target="_blank"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Documentation
                </Link>
                <Link
                  href="https://docs.moydus.com/select-package/introduction"
                  target="_blank"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How to Choose a Package
                </Link>
                <Link
                  href="https://app.moydus.com"
                  target="_blank"
                  className="block text-md w-full border-b border-white/20 py-4 font-semibold text-white transition duration-200 ease-in-out last:border-none hover:text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    title: string;
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children, title, href, ...props }, forwardedRef) => (
  <li>
    <NavigationMenuLink
      asChild
      className={cn(
        "hover:!bg-transparent focus:!bg-transparent data-[active=true]:hover:!bg-transparent data-[active=true]:focus:!bg-transparent",
        className
      )}
    >
      <Link
        href={href}
        className={cn(
          "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-[#C7C5C5] hover:!bg-transparent focus:!bg-transparent",
          className
        )}
        style={{ backgroundColor: "transparent" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        ref={forwardedRef}
        {...props}
      >
        <div className="text-sm font-medium leading-none text-[#C7C5C5] group-hover:text-white/80 transition-colors">
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-[#C7C5C5]/70">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));

ListItem.displayName = "ListItem";
