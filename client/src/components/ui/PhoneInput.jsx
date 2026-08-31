import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * PhoneInput Component
 * Dedicated 10-digit mobile number input with +91 country code prefix,
 * automatic non-digit stripping, real-time counter, and Big Tech validation cues.
 */
export default function PhoneInput({
  id = "phone",
  label = "Phone / WhatsApp",
  required = true,
  value = "",
  onChange,
  onBlur,
  error = "",
  placeholder = "98765 43210",
  disabled = false,
}) {
  // Extract pure digits only
  const cleanDigits = (value || "").toString().replace(/\D/g, "").slice(0, 10);
  const isValidLength = cleanDigits.length === 10;
  const startsWithValidDigit = cleanDigits.length > 0 ? /^[6-9]/.test(cleanDigits) : true;

  const handleChange = (e) => {
    const rawVal = e.target.value;
    // Strip non-numeric characters and limit to 10 digits
    const digits = rawVal.replace(/\D/g, "").slice(0, 10);
    onChange(digits);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {label} {required && <span className="text-[#233d63]">*</span>}
        </label>
        {cleanDigits.length > 0 && (
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded transition-colors ${
              isValidLength && startsWithValidDigit
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {cleanDigits.length}/10 digits
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        {/* Country Code Prefix Badge (+91 India) */}
        <div className="absolute left-1 top-1 bottom-1 flex items-center gap-1.5 px-3 bg-slate-100/90 text-slate-700 font-semibold text-xs rounded-lg border-r border-slate-200 pointer-events-none select-none">
          <span className="text-sm leading-none" role="img" aria-label="India">
            🇮🇳
          </span>
          <span>+91</span>
        </div>

        {/* Numeric Input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          value={cleanDigits}
          onChange={handleChange}
          onBlur={onBlur}
          className={`h-11 w-full rounded-xl border bg-white pl-22 pr-10 text-sm text-slate-800 placeholder:text-slate-400 font-medium tracking-wide focus:outline-none transition-all ${
            error
              ? "border-red-400 ring-2 ring-red-400/10 bg-red-50/20"
              : "border-slate-200 focus:border-[#233d63] focus:ring-2 focus:ring-[#233d63]/10"
          } ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : ""}`}
        />

        {/* Status Indicator Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {isValidLength && startsWithValidDigit && !error ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-in zoom-in-75 duration-150" />
          ) : null}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1 text-red-500 text-xs mt-0.5 animate-in fade-in duration-150">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
