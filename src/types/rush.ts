export interface NavItem {
	id: string
	title: string
	type: 'url' | 'entry' | 'collection'
	url?: string
	target?: string
	entry?: { id: number; slug: Record<string, string>; title?: Record<string, string> }
	collection?: { id: number; slug: Record<string, string>; name?: Record<string, string> }
	children?: NavItem[]
}

export interface NavConfig {
	main?: string
	topbar?: string
	footer?: string
	[key: string]: string | undefined
}

export interface TaxonomyPaths {
	categories: string
	tags: string
}

export interface FormsConfig {
	[key: string]: string
}

export interface LocaleConfig {
	code: string
	label: string
	path: string
	navs?: NavConfig
	forms?: FormsConfig
	taxonomies: TaxonomyPaths
	pagination: string
}

export interface RushSiteConfig {
	url?: string
	locales: Record<string, LocaleConfig>
	defaultLocale: string
	routes: Record<string, number> | 'wildcard'
	defaults: {
		perPage: number
	}
}

export interface CmsImage {
	id?: number
	url: string
	name?: string
	alt?: string
	width?: number
	height?: number
}

export interface CmsEntry {
	id: number
	slug: string
	title: string
	content?: string
	excerpt?: string
	description?: string
	featured_image?: CmsImage
	images?: CmsImage[]
	published_at?: string
	created_at: string
	updated_at?: string
	data?: Record<string, unknown>
	list?: CmsListItem[]
	about?: unknown
}

export interface CmsListItem {
	name?: string
	position?: string
	details?: string
	[key: string]: unknown
}
