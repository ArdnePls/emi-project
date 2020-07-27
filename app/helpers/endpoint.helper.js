const parseQuery = (query) => {
    if (!query) return '';
    const queryString = ['?'];
    Object.keys(query).forEach(key => {
        const value = query[key];
        queryString.push(`${key}=${value}&`);
    });
    return queryString.join('');
}

module.exports = { parseQuery }