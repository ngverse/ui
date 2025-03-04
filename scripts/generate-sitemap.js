const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
const priority = 1;
const freq = 'daily';

// An array with your links
const links = [
  { url: '/doc/introduction/', changefreq: freq, priority: priority },
  { url: '/doc/installation/', changefreq: freq, priority: priority },
  { url: '/doc/schematics-usage/', changefreq: freq, priority: priority },
  { url: '/doc/usage/', changefreq: freq, priority: priority },
  { url: '/doc/theming/', changefreq: freq, priority: priority },
  { url: '/doc/accordion/', changefreq: freq, priority: priority },
  { url: '/doc/autocomplete/', changefreq: freq, priority: priority },
  { url: '/doc/alert/', changefreq: freq, priority: priority },
  { url: '/doc/badge/', changefreq: freq, priority: priority },
  { url: '/doc/card/', changefreq: freq, priority: priority },
  { url: '/doc/divider/', changefreq: freq, priority: priority },
  { url: '/doc/drawer/', changefreq: freq, priority: priority },
  { url: '/doc/otp-input/', changefreq: freq, priority: priority },
  { url: '/doc/progress-bar/', changefreq: freq, priority: priority },
  { url: '/doc/tooltip/', changefreq: freq, priority: priority },
  { url: '/doc/toast/', changefreq: freq, priority: priority },
  { url: '/doc/button/', changefreq: freq, priority: priority },
  { url: '/doc/outside-click/', changefreq: freq, priority: priority },
  { url: '/doc/checkbox/', changefreq: freq, priority: priority },
  { url: '/doc/radio-button/', changefreq: freq, priority: priority },
  { url: '/doc/select/', changefreq: freq, priority: priority },
  { url: '/doc/dialog/', changefreq: freq, priority: priority },
  { url: '/doc/skeleton/', changefreq: freq, priority: priority },
  { url: '/doc/switch/', changefreq: freq, priority: priority },
  { url: '/doc/tab/', changefreq: freq, priority: priority },
  { url: '/doc/textarea/', changefreq: freq, priority: priority },
  { url: '/doc/input/', changefreq: freq, priority: priority },
  { url: '/doc/form-field/', changefreq: freq, priority: priority },
  { url: '/doc/icon/', changefreq: freq, priority: priority },
  { url: '/doc/popover/', changefreq: freq, priority: priority },
  { url: '/doc/pagination/', changefreq: freq, priority: priority },
  { url: '/doc/context-menu/', changefreq: freq, priority: priority },
  { url: '/doc/loader/', changefreq: freq, priority: priority },
  { url: '/doc/local-storage/', changefreq: freq, priority: priority },
  { url: '/doc/session-storage/', changefreq: freq, priority: priority },
  { url: '/doc/dark-mode/', changefreq: freq, priority: priority },
  { url: '/', changefreq: freq, priority: priority },
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://ui.ngverse.dev/' });

// Generate the sitemap and save to a file
streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => {
    const sitemapXML = data.toString();

    // Write the XML to a file named 'sitemap.xml'
    fs.writeFileSync('dist/docs/browser/sitemap.xml', sitemapXML);

    console.log('Sitemap saved as sitemap.xml');
  })
  .catch((error) => {
    console.error('Error generating sitemap:', error);
  });
