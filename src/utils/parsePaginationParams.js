const parseParameter = (number, defaultValue) => {
    const isString = typeof number === 'string';
    if (!isString) return defaultValue;

    const parsedPameter = parseInt(number);
    if (Number.isNaN(parsedPameter)) return defaultValue;

    return parseParameter;
}

export const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    const parsedPage = parseParameter(page, 1);
    const parsedPerPage = parseParameter(perPage, 10);
    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
}