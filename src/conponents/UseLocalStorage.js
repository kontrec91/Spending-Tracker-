import { useState } from 'react';

function useLocalStorage(key) {

    const [data, setData] = useState(() => {
        const categoryArr = localStorage.getItem(key);
        return categoryArr ? JSON.parse(categoryArr) : [];
    });

    function addValue(value) {
        setData(value);
        data.push(value);
        localStorage.setItem(key, JSON.stringify(data));
    }
    return [data, addValue];
}

export { useLocalStorage };