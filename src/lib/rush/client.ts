import type { CmsEntry, NavItem } from '@/types/rush'
import { rushConfig } from '../../../rush.config'

const RUSH_API_URL = import.meta.env.RUSH_API_URL || 'https://app.rushcms.com'
const RUSH_API_KEY = import.meta.env.RUSH_API_KEY
const RUSH_SITE_SLUG = import.meta.env.RUSH_SITE_SLUG

interface FetchOptions {
	method?: string
	body?: unknown
}

async function rushFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
	// Clean the endpoint to ensure it always starts with /
	const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
	const url = `${RUSH_API_URL}/api/v1/${RUSH_SITE_SLUG}${cleanEndpoint}`

	const response = await fetch(url, {
		method: options.method || 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${RUSH_API_KEY}`,
			Accept: 'application/json',
		},
		body: options.body ? JSON.stringify(options.body) : undefined,
	})

	if (!response.ok) {
		throw new Error(`Rush API error: ${response.status} ${response.statusText}`)
	}

	return response.json()
}

export async function getEntry(
	collectionId: number,
	slug: string,
	locale: string = rushConfig.defaultLocale
): Promise<CmsEntry> {
	return rushFetch<CmsEntry>(`/collections/${collectionId}/entries/${slug}?locale=${locale}`)
}

export async function getNav(
	navId: string,
	locale: string = rushConfig.defaultLocale
): Promise<{ data: { items: NavItem[] } }> {
	return rushFetch<{ data: { items: NavItem[] } }>(`/navigations/${navId}?locale=${locale}`)
}

export async function getEntries(
	collectionId: number,
	locale: string = rushConfig.defaultLocale,
	page: number = 1
): Promise<{ data: CmsEntry[]; meta: { total: number; per_page: number; current_page: number } }> {
	const perPage = rushConfig.defaults.perPage
	return rushFetch(`/collections/${collectionId}/entries?locale=${locale}&page=${page}&per_page=${perPage}`)
}

// Em Rush CMS a busca por slug exige o ID da coleção. Modificamos a tipagem.
export async function getEntryBySlug(
	collectionId: number,
	slug: string,
	locale: string = rushConfig.defaultLocale
): Promise<CmsEntry> {
	return rushFetch<CmsEntry>(`/collections/${collectionId}/entries/${slug}?locale=${locale}`)
}
