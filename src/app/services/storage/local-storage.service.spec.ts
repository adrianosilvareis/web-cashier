import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorageService = new LocalStorageService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should set a value in the local storage', () => {
    const key = 'testKey';
    const value = { name: 'testValue' };

    const result = localStorageService.set(key, value);

    expect(result).toBe(true);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });

  it('should get a value from the local storage', () => {
    const key = 'testKey';
    const value = { name: 'testValue' };
    localStorage.setItem(key, JSON.stringify(value));

    const result = localStorageService.get(key);

    expect(result).toEqual(value);
  });

  it('should return null when getting a non-existing value from the local storage', () => {
    const key = 'nonExistingKey';

    const result = localStorageService.get(key);

    expect(result).toBeNull();
  });

  it('should remove a value from the local storage', () => {
    const key = 'testKey';
    const value = { name: 'testValue' };
    localStorage.setItem(key, JSON.stringify(value));

    const result = localStorageService.remove(key);

    expect(result).toBe(true);
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('should clear the local storage', () => {
    const key1 = 'testKey1';
    const value1 = { name: 'testValue1' };
    const key2 = 'testKey2';
    const value2 = { name: 'testValue2' };
    localStorage.setItem(key1, JSON.stringify(value1));
    localStorage.setItem(key2, JSON.stringify(value2));

    const result = localStorageService.clear();

    expect(result).toBe(true);
    expect(localStorage.length).toBe(0);
  });
});
