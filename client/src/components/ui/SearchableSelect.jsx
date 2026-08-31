import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, X, AlertCircle } from "lucide-react";

/**
 * SearchableSelect Component
 * High-performance combobox with instant filtering, state tags, custom value entry,
 * keyboard accessibility, and enterprise visual error cues.
 */
export default function SearchableSelect({
  id,
  label,
  required = false,
  value = "",
  onChange,
  options = [],
  placeholder = "Select an option",
  searchPlaceholder = "Type to search...",
  error = "",
  onBlur,
  disabled = false,
  allowCustom = true,
  customLabel = "Use custom:",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  // Normalize options to { value, label, subtext }
  const normalizedOptions = React.useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "string") {
        return { value: opt, label: opt, subtext: null };
      }
      return {
        value: opt.value ?? opt.name ?? opt.label,
        label: opt.label ?? opt.name ?? opt.value,
        subtext: opt.subtext ?? opt.state ?? null,
      };
    });
  }, [options]);

  // Filtered list
  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return normalizedOptions;
    const q = search.trim().toLowerCase();
    return normalizedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.subtext && opt.subtext.toLowerCase().includes(q))
    );
  }, [normalizedOptions, search]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isOpen) {
          setIsOpen(false);
          if (onBlur) onBlur();
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onBlur]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setHighlightedIndex(-1);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
    setSearch("");
    if (onBlur) onBlur();
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const totalItems = filteredOptions.length + (allowCustom && search.trim() ? 1 : 0);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % totalItems);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + totalItems) % totalItems);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex].value);
        } else if (allowCustom && search.trim()) {
          handleSelect(search.trim());
        } else if (filteredOptions.length > 0) {
          handleSelect(filteredOptions[0].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Find currently selected label
  const selectedObj = normalizedOptions.find((o) => o.value === value);
  const displayLabel = selectedObj ? selectedObj.label : value;

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-[#233d63]">*</span>}
          </span>
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                if (onBlur) onBlur();
              }}
              className="text-[10px] text-slate-400 hover:text-red-500 font-normal transition-colors"
            >
              Clear
            </button>
          )}
        </label>
      )}

      {/* Main Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-left flex items-center justify-between transition-all cursor-pointer select-none ${
          error
            ? "border-red-400 ring-2 ring-red-400/10 bg-red-50/20"
            : isOpen
            ? "border-[#233d63] ring-2 ring-[#233d63]/10"
            : "border-slate-200 hover:border-[#233d63]/40"
        } ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : ""}`}
      >
        <span className={`truncate ${displayLabel ? "text-slate-800 font-medium" : "text-slate-400"}`}>
          {displayLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-[#233d63]" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/60 sticky top-0 z-10 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1.5" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full h-8 text-xs bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  if (searchInputRef.current) searchInputRef.current.focus();
                }}
                className="p-1 hover:bg-slate-200/60 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div
            ref={listRef}
            className="max-h-56 overflow-y-auto p-1.5 space-y-0.5 divide-y divide-transparent text-xs"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <div
                    key={`${opt.value}-${idx}`}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#233d63]/10 text-[#233d63] font-bold"
                        : isHighlighted
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="truncate">{opt.label}</span>
                      {opt.subtext && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium shrink-0 border border-slate-200/60">
                          {opt.subtext}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#233d63] shrink-0" />}
                  </div>
                );
              })
            ) : (
              <div className="p-3 text-center text-slate-400 text-xs">
                No matching results found
              </div>
            )}

            {/* Custom value entry option if search doesn't match predefined list */}
            {allowCustom && search.trim() && !filteredOptions.some(o => o.label.toLowerCase() === search.trim().toLowerCase()) && (
              <div
                onClick={() => handleSelect(search.trim())}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50/60 text-[#233d63] font-semibold cursor-pointer hover:bg-blue-100/70 transition-colors mt-1 border border-blue-200/50"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-[11px] text-[#233d63]/80">{customLabel}</span>
                  <span className="underline truncate">"{search.trim()}"</span>
                </div>
                <span className="text-[10px] bg-[#233d63] text-white px-2 py-0.5 rounded-full font-bold">
                  Select
                </span>
              </div>
            )}
          </div>

          {/* Footer showing count */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
            <span>{filteredOptions.length} available</span>
            <span>Esc to close</span>
          </div>
        </div>
      )}

      {/* Validation Error Message */}
      {error && (
        <div className="flex items-center gap-1 text-red-500 text-xs mt-0.5 animate-in fade-in duration-150">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
