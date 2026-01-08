"use client";
import React, { useCallback, useState, forwardRef, useEffect } from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// utils
import { cn } from "@/lib/utils";

// assets
import { ChevronDown, CheckIcon } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

// data
import { countries } from "country-data-list";

// Country interface
export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

// Dropdown props
interface CountryDropdownProps {
  options?: Country[];
  onChange?: (country: Country) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
}

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.emoji && country.status !== "deleted" && country.ioc !== "PRK"
    ),
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined
  );

  useEffect(() => {
    if (defaultValue) {
      // Try to find by alpha3 first, then by name
      const initialCountry = options.find(
        (country) =>
          country.alpha3 === defaultValue || country.name === defaultValue
      );
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      } else {
        // Reset selected country if defaultValue is not found
        setSelectedCountry(undefined);
      }
    } else {
      // Reset selected country if defaultValue is undefined or null
      setSelectedCountry(undefined);
    }
  }, [defaultValue, options]);

  const handleSelect = useCallback(
    (value: string) => {
      const country = options.find((c) => c.name === value);
      if (country) {
        console.log("🌍 CountryDropdown value: ", country);
        setSelectedCountry(country);
        onChange?.(country);
        setOpen(false);
      }
    },
    [onChange, options]
  );

  const triggerClasses = cn(
    "group w-full h-[50px] flex items-center justify-between relative rounded-[10px]",
    "bg-white/10 border border-white/20",
    "focus-within:border-white/20 focus:outline-none",
    "cursor-pointer text-white",
    "px-4",
    slim === true && "w-20"
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center justify-center pointer-events-none text-white"></div>
          {selectedCountry ? (
            <div className="flex items-center flex-grow w-0 gap-2 overflow-hidden">
              <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                <CircleFlag
                  countryCode={selectedCountry.alpha2.toLowerCase()}
                  height={20}
                />
              </div>
              {slim === false && (
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-white text-[16px] font-inter font-normal leading-[1.2em] tracking-[0em]">
                  {selectedCountry.name}
                </span>
              )}
            </div>
          ) : (
            <span className="text-[#999999] text-[16px] font-inter font-normal leading-[1.2em] tracking-[0em] overflow-hidden whitespace-nowrap text-ellipsis">
              {slim === false ? placeholder : ""}
            </span>
          )}
        </div>
        <ChevronDown size={16} className="text-white shrink-0" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        align="start"
        className="w-[var(--radix-popper-anchor-width)] p-0 z-50 bg-[#353436] border border-white/10 rounded-2xl"
      >
        <Command className="w-full max-h-[200px] sm:max-h-[270px] bg-[#353436]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-[#353436] border-b border-white/10">
              <CommandInput
                placeholder="Search country..."
                className="text-white placeholder:text-[#999999] bg-transparent border-none focus:ring-0"
              />
            </div>
            <CommandEmpty className="text-white/70">
              No country found.
            </CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    value={option.name}
                    className="flex items-center w-full gap-2 text-white hover:bg-white/10 cursor-pointer"
                    key={key}
                    onSelect={handleSelect}
                  >
                    <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
                      <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                        <CircleFlag
                          countryCode={option.alpha2.toLowerCase()}
                          height={20}
                        />
                      </div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {option.name}
                      </span>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        option.name === selectedCountry?.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";

export const CountryDropdown = forwardRef(CountryDropdownComponent);
