// src/lib/jsonld.ts
import { SITE } from "./site";

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    "name": SITE.legalName,
    "url": SITE.url,
    "logo": `${SITE.url}${SITE.logoUrl}`,
    "foundingDate": SITE.foundingDate,
    "slogan": SITE.slogan,
    "email": SITE.email,
    "telephone": SITE.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE.address.streetAddress,
      "addressLocality": SITE.address.addressLocality,
      "addressRegion": SITE.address.addressRegion,
      "postalCode": SITE.address.postalCode,
      "addressCountry": SITE.address.addressCountry
    },
    "sameAs": SITE.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    "url": SITE.url,
    "name": `${SITE.name} — ${SITE.slogan}`,
    "publisher": { "@id": `${SITE.url}#organization` },
    // Se você tiver uma página de busca interna, ajuste o target:
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE.url}/buscar?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}#software`,
    "name": SITE.name,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "ERP",
    "operatingSystem": "Web",
    "url": SITE.url,
    "description": "Sistema de gestão para revendas de gás no Brasil desde 2002. Controle de pedidos, entregas, estoque e financeiro.",
    "publisher": { "@id": `${SITE.url}#organization` },
    "inLanguage": "pt-BR",
    // Liste recursos/URLs reais do seu site:
    "featureList": [
      `${SITE.url}/recursos/financeiro`,
      `${SITE.url}/recursos/estoque`,
      `${SITE.url}/recursos/entregas`,
      `${SITE.url}/recursos/pedidos`,
    ],
    // Se tiver preço/plano público, adicione offers (ajuste valores/moeda):
    // "offers": {
    //   "@type": "Offer",
    //   "price": "199.00",
    //   "priceCurrency": "BRL",
    //   "url": `${SITE.url}/planos`
    // },
    "audience": {
      "@type": "BusinessAudience",
      "industry": "Revendas de gás"
    }
  };
}

// Breadcrumbs para páginas internas — chame com os pares [nome, url]
export function breadcrumbsJsonLd(items: Array<{name: string; url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": it.name,
      "item": it.url
    }))
  };
}

// FAQ estruturado — use em páginas com perguntas frequentes
export function faqJsonLd(faqs: Array<{question: string; answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };
}
