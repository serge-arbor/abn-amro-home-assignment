export interface Schedule {
  time: string;
  days: string[];
}
export interface Ratring {
  average: number;
}
export interface Country {
  name: string;
  code: string;
  timezone: string;
}
export interface Network {
  id: number;
  names: string;
  country: Country;
}
export interface Externals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}
export interface Image {
  medium: string;
  original: string;
}
export interface LinkSelf {
  href: string;
}
export interface PreviousEpisode extends LinkSelf {
}
export interface ShowLink extends LinkSelf {
}
export interface CharacterLink extends LinkSelf {
}
export interface Links {
  self?: LinkSelf;
  previousepisode?: PreviousEpisode;
  show?: ShowLink;
  character?: CharacterLink;
}
export interface Embedded {
  show?: Show;
  seasons?: Season[];
  episodes?: Episode[];
  cast?: Cast[];
  castcredits?: CastCredits[];
  crew?: Crew[];
  crewcredits?: CrewCredits[];
  akas?: Aka[];
}
export interface Aka {
  name: string;
  country: Country;
}
export interface CrewCredits {
  type: string;
  _links: Links;
}
export interface CastCredits {
  _links: Links;
}
export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: Image;
  summary: string;
  _links: Links;
}
export interface Season {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: string;
  endDate: string;
  network: Network;
  webChannel: string | null;
  image: Image;
  summary: string;
  _links: Links;
}
export interface Person {
  id: number;
  url: string;
  country: Country;
  birtday: string;
  deathday: string | null;
  image: Image;
  _links: Links;
}
export interface Character {
  id: number;
  url: string;
  name: string;
  image: Image;
  _links: Links;
}
export interface Cast {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}
export interface Crew {
  type: string;
  person: Person;
}
export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: Schedule;
  ratring: Ratring;
  weight: number;
  netwoek: Network;
  webChannel: string | null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: Links;
  _embedded: Embedded;
}
export interface ShowSearch {
  score: number;
  show: Show;
}
