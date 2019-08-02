import { combineReducers } from 'redux';
import {
    StoresMapObject,
    StoreObject,
    PlackAndFlatten,
    ReducersMapObject,
    SelectorsMapObject,
} from './types';
import { combineSelectors } from './combineSelectors';

/**
 * Combines stores with keys. Redux combineReducers is used for reducers.
 *
 * Don't pass selectors like
 * - `{ storeKey: { selectors: {} } }`
 *
 * or
 * - `{ storeKey: { selectors: undefined } }`.
 *
 * It can be cause of wrong types inferring. But it's fine if selectors' interface is empty.
 * If there are no selectors for certain store use this format:
 *
 * `{ storeKey: { reducer: any, selectors: {} as {} } }`
 *
 * @param   { StoresMapObject } storesMapObject Stores map object
 * @returns { StoreObject } One store object with combined reducers and combined selectors
 */
export function combineStores<
    T extends StoresMapObject<any>,
    SO = { [K in keyof T]: T[K]['selectors'] },
>(storesMapObject: StoresMapObject<T>): StoreObject<PlackAndFlatten<SO, keyof SO>> {

    const reducersMapObject: ReducersMapObject = {};
    const selectorsMapObject = {} as SelectorsMapObject<SO>;

	// Separating reducers and selectors
    Object.keys(storesMapObject).forEach(storeKey => {
		if (storesMapObject[storeKey].reducer !== undefined)
			reducersMapObject[storeKey] = storesMapObject[storeKey].reducer;
		if (storesMapObject[storeKey].selectors !== undefined)
			selectorsMapObject[storeKey] = storesMapObject[storeKey].selectors;
    });

    const combinedReducers = combineReducers<any>(reducersMapObject);
    const combinedSelectors = combineSelectors(selectorsMapObject);

    const store = {
		reducer: combinedReducers,
		selectors: combinedSelectors,
    };

    return store;
}