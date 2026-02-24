import type { RushSiteConfig } from '@/types/rush'

export const rushConfig: RushSiteConfig = {
    url: import.meta.env.RUSH_API_URL,
    defaultLocale: 'pt_BR',

    locales: {
		pt_BR: {
			code: 'pt_BR',
			label: 'Português',
			path: '/',
			navs: {
				main: import.meta.env.RUSH_NAV_MAIN_ID,
				footer: import.meta.env.RUSH_NAV_FOOTER_ID,
			},
			taxonomies: {
				categories: 'categorias',
				tags: 'tags',
			},
			pagination: 'pagina',
		},
    },
    routes: 'wildcard',
    defaults: {
        perPage: 12,
    },
}
