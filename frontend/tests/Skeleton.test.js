import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'
import { transform } from 'esbuild'
import hasNextPage from '../src/Utils/hasNextPage.js'

const componentPath = path.resolve('src/Components/Common/Skeleton.jsx')
const source = await readFile(componentPath, 'utf8')
const { code } = await transform(source, { loader: 'jsx', format: 'cjs', jsx: 'transform' })
const componentModule = { exports: {} }
const componentRequire = createRequire(componentPath)
new Function('require', 'module', 'exports', code)(
  componentRequire,
  componentModule,
  componentModule.exports
)

const { CollectionSkeleton, PageSkeleton } = componentModule.exports

test('collection skeleton exposes accessible loading status and requested placeholders', () => {
  const skeleton = CollectionSkeleton({ name: 'Candidates', count: 4 })

  assert.equal(skeleton.props.role, 'status')
  assert.equal(skeleton.props['aria-label'], 'Loading candidates')
  assert.equal(skeleton.props.children.length, 4)
})

test('ballot skeleton renders position and candidate placeholders', () => {
  const skeleton = PageSkeleton({ variant: 'ballot' })
  const positions = skeleton.props.children

  assert.equal(skeleton.props.role, 'status')
  assert.equal(skeleton.props.className, 'page-skeleton page-skeleton-ballot')
  assert.equal(positions.props.children.length, 2)
})

test('pagination stops when the API marks the returned page as final', () => {
  assert.equal(hasNextPage([{ lastPage: true }]), false)
  assert.equal(hasNextPage([{ isLastPage: true }]), false)
  assert.equal(hasNextPage([{ hasNextPage: false }]), false)
})

test('pagination continues only when the API reports another page', () => {
  assert.equal(hasNextPage([{ hasNextPage: true }]), true)
  assert.equal(hasNextPage([{ isLastPage: false }]), true)
  assert.equal(hasNextPage([]), false)
})
