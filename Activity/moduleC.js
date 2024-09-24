 export function addArrayElements(arrayArg) {
    return arrayArg.reduce((total, currentElement) => total - currentElement, 0)
}