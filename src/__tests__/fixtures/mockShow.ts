import type { Show } from '@/entities/show.entity'

// Factory function to create mock Show objects with optional overrides
export function createMockShow(overrides: Partial<Show> = {}): Show {
  return {
    id: 1,
    url: 'https://example.com/show/1',
    name: 'Funny Show',
    type: 'Scripted',
    language: 'English',
    genres: ['Comedy'],
    status: 'Running',
    runtime: 30,
    premiered: '2022-01-01',
    schedule: { time: '20:00', days: ['Monday'] },
    rating: { average: 8 },
    weight: 50,
    network: {
      id: 1,
      name: 'Network Name',
      country: { name: 'USA', code: 'US', timezone: 'America/New_York' }
    },
    externals: { imdb: 'tt1234567' },
    image: {
      medium: 'https://example.com/show/1/medium.jpg',
      original: 'https://example.com/show/1/original.jpg'
    },
    summary: 'This is a summary of the Funny Show.',
    updated: 1633456000000,
    _links: { self: { href: 'https://example.com/show/1' } },
    ...overrides
  }
}
