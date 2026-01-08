"use client";

import { useState, useMemo } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { FolderX, X, Tag, DollarSign, Check } from "lucide-react";

interface Category {
  title: string;
  slug: string;
}

interface DrawerFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedPrice: string | null;
  onCategoryChange: (category: string | null) => void;
  onPriceChange: (price: string | null) => void;
}

const PRICE_OPTIONS = [
  { label: "All Prices", value: null },
  { label: "Free", value: "Free" },
  { label: "$25", value: "$25" },
  { label: "$49", value: "$49" },
];

export const AnimatedDrawer = ({
  categories,
  selectedCategory,
  selectedPrice,
  onCategoryChange,
  onPriceChange,
}: DrawerFilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [view, setView] = useState<"default" | "category" | "price">("default");
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return (
          <div className="">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Filter Templates
              </h1>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <X
                  className="text-neutral-600 dark:text-neutral-400"
                  size="18"
                />
              </Button>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4">
              <button
                onClick={() => setView("category")}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <FolderX />
                Filter by Category
              </button>
              <button
                onClick={() => setView("price")}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <DollarSign />
                Filter by Price
              </button>
            </div>
          </div>
        );
      case "category":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FolderX
                  className="text-neutral-600 dark:text-neutral-400"
                  size={20}
                />
                <h1 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">
                  Filter by Category
                </h1>
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <X
                  className="text-neutral-600 dark:text-neutral-400"
                  size="18"
                />
              </Button>
            </div>
            <div className="space-y-2 mt-6">
              <button
                onClick={() => {
                  onCategoryChange(null);
                  setView("default");
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                  selectedCategory === null
                    ? "bg-neutral-900 dark:bg-neutral-800 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                <span className="font-medium">All Categories</span>
                {selectedCategory === null && (
                  <Check className="text-white" size={18} />
                )}
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => {
                    onCategoryChange(category.slug);
                    setView("default");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                    selectedCategory === category.slug
                      ? "bg-neutral-900 dark:bg-neutral-800 text-white"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <span className="font-medium">{category.title}</span>
                  {selectedCategory === category.slug && (
                    <Check className="text-white" size={18} />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-start gap-4 mt-6">
              <Button
                onClick={() => setView("default")}
                className="w-full h-12 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-3xl text-lg transition-colors"
              >
                Back
              </Button>
            </div>
          </div>
        );
      case "price":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSign
                  className="text-neutral-600 dark:text-neutral-400"
                  size={20}
                />
                <h1 className="font-medium text-xl text-neutral-900 dark:text-neutral-100">
                  Filter by Price
                </h1>
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <X
                  className="text-neutral-600 dark:text-neutral-400"
                  size="18"
                />
              </Button>
            </div>
            <div className="space-y-2 mt-6">
              {PRICE_OPTIONS.map((option) => (
                <button
                  key={option.value || "all"}
                  onClick={() => {
                    onPriceChange(option.value);
                    setView("default");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                    selectedPrice === option.value
                      ? "bg-neutral-900 dark:bg-neutral-800 text-white"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {selectedPrice === option.value && (
                    <Check className="text-white" size={18} />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-start gap-4 mt-6">
              <Button
                onClick={() => setView("default")}
                className="w-full h-12 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-3xl text-lg transition-colors"
              >
                Back
              </Button>
            </div>
          </div>
        );
    }
  }, [
    view,
    categories,
    selectedCategory,
    selectedPrice,
    onCategoryChange,
    onPriceChange,
  ]);

  return (
    <>
      <Button
        className="px-6 rounded-full bg-[#1C1C1C] hover:bg-[#262626] py-2 font-medium text-white border border-white/10 transition-colors focus-visible:shadow-focus-ring-button md:font-medium"
        onClick={() => setIsOpen(true)}
      >
        <Tag size={16} className="mr-2" />
        Filter Templates
      </Button>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <Drawer.Content
            asChild
            className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-white dark:bg-neutral-900 outline-none md:mx-auto md:w-full"
          >
            <motion.div animate={{ height: bounds.height }}>
              <Drawer.Title className="sr-only">Filter Templates</Drawer.Title>
              <div className="p-6" ref={elementRef}>
                {content}
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
