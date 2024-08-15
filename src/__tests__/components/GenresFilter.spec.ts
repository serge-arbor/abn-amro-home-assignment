import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import GenresFilter from '@/components/GenresFilter.vue'
import type { GenreDetails, GenreId } from '@/entities/show.entity'

function createWrapper(
  genres: Map<GenreId, GenreDetails>,
  modelValue: Set<GenreId> = new Set(),
  isLoading = false
): VueWrapper<InstanceType<typeof GenresFilter>> {
  return mount(GenresFilter, {
    props: {
      genres,
      isLoading,
      modelValue,
      'onUpdate:modelValue': (newValue: Set<GenreId>) => {
        modelValue.clear()
        newValue.forEach((item) => modelValue.add(item))
      }
    }
  })
}

describe('GenresFilter.vue', () => {
  it('renders genres correctly and allows selection', async () => {
    const genres = new Map<GenreId, GenreDetails>([
      ['action', { id: 'action', name: 'Action', count: 5 }]
    ])
    const modelValue = new Set<GenreId>()

    const wrapper = createWrapper(genres, modelValue)

    const genreButton = wrapper.find('button')
    expect(genreButton.text()).toContain('Action (5)')

    await genreButton.trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()

    const emittedPayload = emitted?.[0][0]
    expect(emittedPayload).toEqual(new Set(['action']))
  })

  it('allows multiple genres to be selected', async () => {
    const genres = new Map<GenreId, GenreDetails>([
      ['action', { id: 'action', name: 'Action', count: 5 }],
      ['drama', { id: 'drama', name: 'Drama', count: 3 }]
    ])
    const modelValue = new Set<GenreId>()

    const wrapper = createWrapper(genres, modelValue)

    const genreButtons = wrapper.findAll('button')
    await genreButtons[0].trigger('click')
    await genreButtons[1].trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()

    const emittedPayload = emitted?.[1][0] // Second click, check payload
    expect(emittedPayload).toEqual(new Set(['action', 'drama']))
  })

  it('allows a genre to be deselected', async () => {
    const genres = new Map<GenreId, GenreDetails>([
      ['action', { id: 'action', name: 'Action', count: 5 }],
      ['drama', { id: 'drama', name: 'Drama', count: 3 }]
    ])
    const modelValue = new Set<GenreId>(['action'])

    const wrapper = createWrapper(genres, modelValue)

    const genreButton = wrapper.findAll('button')[0]
    await genreButton.trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()

    const emittedPayload = emitted?.[0][0]
    expect(emittedPayload).toEqual(new Set())
  })

  it('displays a loading state when isLoading is true', () => {
    const genres = new Map<GenreId, GenreDetails>([
      ['action', { id: 'action', name: 'Action', count: 5 }]
    ])
    const wrapper = createWrapper(genres, new Set(), true)

    expect(wrapper.findComponent({ name: 'GenresFilterSkeleton' }).exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('reacts to changes in genres prop', async () => {
    const genres = new Map<GenreId, GenreDetails>([
      ['action', { id: 'action', name: 'Action', count: 5 }]
    ])
    const wrapper = createWrapper(genres)

    // Update genres prop
    await wrapper.setProps({
      genres: new Map<GenreId, GenreDetails>([
        ['comedy', { id: 'comedy', name: 'Comedy', count: 8 }]
      ])
    })

    expect(wrapper.find('button').text()).toContain('Comedy (8)')
  })
})
