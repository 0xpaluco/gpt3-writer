import { NextSeoProps  } from 'next-seo';

export const NEXT_SEO_DEFAULT: NextSeoProps  = {
    title: "Using More of Config",
    description: "This example uses more of the available config options.",
    canonical: "https://www.canonical.ie/",
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://www.url.ie/',
        siteName: 'SiteName',
        images: [
            {
                url: 'https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
                type: 'image/jpeg',
            },
            {
                url: 'https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second',
                type: 'image/jpeg',
            }
        ],
    },
    twitter: {
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
    },
};