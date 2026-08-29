import React, { useEffect } from 'react';

/**
 * Dynamic SEO Component for Page Title, Meta Tags, and Open Graph Data
 */
export default function SEO({
  title = "Fair Future | Premier Overseas Education Consultancy & Study Abroad Guidance",
  description = "Transform your global education dreams with Fair Future Education Consultancy. 18+ years of excellence, 12,000+ visa successes, expert counseling for UK, USA, Canada, Australia, Ireland & Germany.",
  keywords = "study abroad consultancy, overseas education counselor, foreign university admissions, student visa guidance, Fair Future, UK study visa, Canada student visa, Australia study visa",
  ogImage = "https://fairfuture-gozoop.vercel.app/og-banner.jpg?v=3",
  ogUrl = "https://fairfuture-gozoop.vercel.app",
  noindex = false,
}) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set meta tag content
    const setMetaTag = (selector, content) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        const [attr, val] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attr, val.replace(/"/g, ''));
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', description);
    setMetaTag('meta[name="keywords"]', keywords);
    setMetaTag('meta[name="robots"]', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph / WhatsApp / Facebook
    setMetaTag('meta[property="og:title"]', title);
    setMetaTag('meta[property="og:description"]', description);
    setMetaTag('meta[property="og:image"]', ogImage);
    setMetaTag('meta[property="og:image:secure_url"]', ogImage);
    setMetaTag('meta[property="og:url"]', ogUrl || window.location.href);
    setMetaTag('meta[property="og:type"]', 'website');
    setMetaTag('meta[property="og:site_name"]', 'Fair Future Education Consultancy');

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', title);
    setMetaTag('meta[name="twitter:description"]', description);
    setMetaTag('meta[name="twitter:image"]', ogImage);

  }, [title, description, keywords, ogImage, ogUrl, noindex]);

  return null;
}
