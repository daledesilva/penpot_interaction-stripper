export function selectionsEquivalent(arr1: string[], arr2: string[]): boolean {
    return arr1.length === arr2.length && arr1.every((id, i) => id === arr2[i]);
} 