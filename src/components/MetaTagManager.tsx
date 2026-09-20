import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';

/**
 * MetaTagManager dynamically updates:
 * - <title>
 * - <meta name="description">
 * - Open Graph tags (og:title, og:description, og:image, og:url, og:type, product:price)
 * - Twitter Card tags (twitter:title, twitter:description, twitter:image, twitter:card)
 * - Canonical link tag
 * - Schema.org JSON-LD structured data for products
 */

const DEFAULT_TITLE = 'TATA.STORE – منتوجات طاطا… من الواحة إلى باب دارك';
const DEFAULT_DESC =
  'متجر إلكتروني احترافي لمنتجات واحات إقليم طاطا بالمغرب - تمور، كسكس، أعشاب طبيعية، زيوت، وصناعة تقليدية مع التوصيل لكافة المدن والدفع عند الاستلام.';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80';

function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeMetaTag(attributeName: 'name' | 'property', attributeValue: string) {
  const element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function updateCanonical(url: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export const MetaTagManager: React.FC = () => {
  const { currentPage, activeProductId, products } = useStore();

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://tata.store';
    const currentProduct =
      currentPage === 'product-detail' && activeProductId
        ? products.find(p => p.id === activeProductId)
        : null;

    if (currentProduct) {
      // 1. Dynamic Product Title
      const pageTitle = `${currentProduct.name} (${currentProduct.price} د.م) | TATA.STORE - واحة طاطا`;
      document.title = pageTitle;

      // 2. Dynamic Description
      const cleanDesc = (
        currentProduct.shortDescription ||
        currentProduct.description ||
        `اطلب الآن ${currentProduct.name} بجودة أصلية من قلب واحة طاطا مع الدفع عند الاستلام.`
      )
        .replace(/<[^>]*>?/gm, '')
        .slice(0, 160);

      const productImage = currentProduct.images[0] || DEFAULT_IMAGE;
      const productUrl = `${origin}/?product=${currentProduct.id}`;

      // 3. Update Standard Meta
      updateMetaTag('name', 'description', cleanDesc);
      updateCanonical(productUrl);

      // 4. Update OpenGraph Tags
      updateMetaTag('property', 'og:type', 'product');
      updateMetaTag('property', 'og:title', currentProduct.name + ' - متجر واحة طاطا');
      updateMetaTag('property', 'og:description', cleanDesc);
      updateMetaTag('property', 'og:image', productImage);
      updateMetaTag('property', 'og:url', productUrl);
      updateMetaTag('property', 'og:site_name', 'TATA.STORE');

      // Product Specific OpenGraph
      updateMetaTag('property', 'product:price:amount', currentProduct.price.toString());
      updateMetaTag('property', 'product:price:currency', 'MAD');
      updateMetaTag(
        'property',
        'product:availability',
        currentProduct.stock > 0 ? 'in stock' : 'out of stock'
      );

      // 5. Update Twitter / X Tags
      updateMetaTag('name', 'twitter:card', 'summary_large_image');
      updateMetaTag('name', 'twitter:title', currentProduct.name + ' | TATA.STORE');
      updateMetaTag('name', 'twitter:description', cleanDesc);
      updateMetaTag('name', 'twitter:image', productImage);

      // 6. Schema.org Product JSON-LD
      let scriptTag = document.getElementById('dynamic-product-jsonld') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-product-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: currentProduct.name,
        image: currentProduct.images,
        description: cleanDesc,
        sku: currentProduct.id,
        category: currentProduct.categoryId,
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'MAD',
          price: currentProduct.price,
          availability:
            currentProduct.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'TATA.STORE',
          },
        },
      };

      scriptTag.text = JSON.stringify(productSchema);
    } else {
      // Non-product pages: Reset to site defaults or page-specific titles
      let pageTitle = DEFAULT_TITLE;
      if (currentPage === 'shop') {
        pageTitle = 'المتجر – تصفح كافة منتوجات واحة طاطا | TATA.STORE';
      } else if (currentPage === 'checkout') {
        pageTitle = 'إتمام الطلب والدفع عند الاستلام | TATA.STORE';
      } else if (currentPage === 'order-success') {
        pageTitle = 'تم استلام طلبك بنجاح | TATA.STORE';
      } else if (currentPage === 'about') {
        pageTitle = 'عن طاطا والواحة – قصتنا وتراثنا | TATA.STORE';
      } else if (currentPage === 'contact') {
        pageTitle = 'تواصل معنا – خدمة زبناء TATA.STORE';
      } else if (currentPage === 'admin' || currentPage === 'admin-login') {
        pageTitle = 'لوحة تحكم إدارة المتجر | TATA.STORE';
      }

      document.title = pageTitle;
      updateMetaTag('name', 'description', DEFAULT_DESC);
      updateCanonical(origin);

      updateMetaTag('property', 'og:type', 'website');
      updateMetaTag('property', 'og:title', pageTitle);
      updateMetaTag('property', 'og:description', DEFAULT_DESC);
      updateMetaTag('property', 'og:image', DEFAULT_IMAGE);
      updateMetaTag('property', 'og:url', origin);
      updateMetaTag('property', 'og:site_name', 'TATA.STORE');

      // Remove product-specific tags
      removeMetaTag('property', 'product:price:amount');
      removeMetaTag('property', 'product:price:currency');
      removeMetaTag('property', 'product:availability');

      updateMetaTag('name', 'twitter:card', 'summary_large_image');
      updateMetaTag('name', 'twitter:title', pageTitle);
      updateMetaTag('name', 'twitter:description', DEFAULT_DESC);
      updateMetaTag('name', 'twitter:image', DEFAULT_IMAGE);

      // Remove product JSON-LD
      const scriptTag = document.getElementById('dynamic-product-jsonld');
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    }
  }, [currentPage, activeProductId, products]);

  // Headless manager component
  return null;
};
