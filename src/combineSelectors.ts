import { warning } from 'utils/warning';

import { PlackAndFlatten, SelectorsMapObject, SelectorsObject } from './types';

/**
 * Matches selector objects to keys.
 *
 * @param   { SelectorsMapObject } selectorsMapObject selectors map object
 * @returns { SelectorsObject } selectors object
 */
export function combineSelectors<T, R = PlackAndFlatten<T, keyof T>>(selectorsMapObject: SelectorsMapObject<T>): SelectorsObject<R> {
    const combinedSelectors = {} as SelectorsObject<R>;

    Object.keys(selectorsMapObject)
        .forEach(key => {
            if (process.env.NODE_ENV !== 'production')
                if (typeof selectorsMapObject[key] === 'undefined')
                    warning(`No selector or selectorsObject provided for key "${ key }"`);

            if (typeof selectorsMapObject[key] === 'object') {
                const storeKey = key;

                Object.keys(selectorsMapObject[storeKey])
                    .forEach(selectorKey => {
                        if (process.env.NODE_ENV !== 'production')
                            if (typeof selectorsMapObject[storeKey][selectorKey] === 'undefined')
                                warning(`No selector provided for key "${ selectorKey }"`);
                            else if (typeof selectorsMapObject[storeKey][selectorKey] !== 'function')
                                warning(`No selector provided for key "${ selectorKey }"`);

                        if (typeof selectorsMapObject[storeKey][selectorKey] === 'function')
                            combinedSelectors[selectorKey] =
                                (state, ...args) => selectorsMapObject[key][selectorKey](state[storeKey], ...args);
                    });
            }
        });

    return combinedSelectors;
}