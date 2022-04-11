import { renderHook, act } from '@testing-library/react-hooks';

import useStateWithLocalStorage from '../useStateWithLocalStorage';

const TEST_KEY = 'fvtItems';
const TEST_VALUE = ['0123'];

describe('useStateWithLocalStorage', () => {
  it('should set localStorage with default value', () => {
    renderHook(() => useStateWithLocalStorage(TEST_VALUE, TEST_KEY));
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(TEST_VALUE);
  });

  it('should set the default value from localStorage if it exists', () => {
    // set the localStorage to the test value
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));

    // initialise with an empty array
    const { result } = renderHook(() => useStateWithLocalStorage([], TEST_KEY));

    // check that the value is what is stored in localStorage (and not an empty array)
    const [value] = result.current;
    expect(value).toEqual(TEST_VALUE);

    // expect value to be taken from localStorage (rather than empty array)
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(TEST_VALUE);
  });

  it('should update localStorage when state changes', () => {
    // initialise with test object
    const { result } = renderHook(() =>
      useStateWithLocalStorage(TEST_VALUE, TEST_KEY),
    );

    const [, setValue] = result.current;

    // set the state to something new
    // const newValue = { anotherValue: 'Some value' };
    const newValue = ['01234'];
    act(() => {
      setValue(newValue);
    });

    // localStorage should have updated to new value
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(newValue);
  });
});
