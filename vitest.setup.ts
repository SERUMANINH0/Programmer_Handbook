import "@testing-library/jest-dom/vitest"

// Node 22+ ships a native `localStorage` global that throws unless
// `--localstorage-file` is set, which shadows jsdom's working implementation
// in the test environment. Replace it with a simple in-memory polyfill so
// Zustand's `persist` middleware has a functional storage backend in tests.
class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  get length() {
    return this.store.size
  }

  clear() {
    this.store.clear()
  }

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null
  }

  removeItem(key: string) {
    this.store.delete(key)
  }

  setItem(key: string, value: string) {
    this.store.set(key, value)
  }
}

Object.defineProperty(globalThis, "localStorage", {
  value: new MemoryStorage(),
  configurable: true,
})
