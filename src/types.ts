import { Reducer, ReducersMapObject } from 'redux';

export type SelectorsObject<S> = { [K in keyof S]: S[K]; };
export type SelectorsMapObject<S> = { [K in keyof S]: S[K]; };

export type Reducer<T> = Reducer<T>;
export type ReducersMapObject = ReducersMapObject;

export type StoreObject<S, R = any> = {
    reducer: Reducer<R>;
    selectors: SelectorsObject<S>;
};

export type StoresMapObject<S> = { [K in keyof S]: S[K] };

// Type helpers
export type UnionToIntersection<T> = (T extends any ? (k: T) => void : {}) extends ((k: infer I) => void) ? I : never;
export type PlackAndFlatten<T, K extends keyof T, SafeT = Exclude<T[K], undefined>> = UnionToIntersection<SafeT>;