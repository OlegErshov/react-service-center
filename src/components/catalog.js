import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  './styles/deviceList.css';
// import './styles/tripList.css';

const Catalog = () => {
    const [devices, setDevices] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [find, setFind] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            console.log('msg', localStorage.getItem('msg'));
            try {
                let url = 'http://localhost:4444/devices';

                if (sortOption) {
                    url += `?sort=${sortOption}`;
                }

                console.log(selectedCategory);
                if (selectedCategory != null && selectedCategory != 'All' && selectedCategory != '') {
                    if (sortOption) {
                        url += `&deviceCategoryId=${selectedCategory}`;
                    } else {
                        url += `?deviceCategoryId=${selectedCategory}`;
                    }
                }

                if (find != null && find != '') {
                    if (sortOption || (selectedCategory != null && selectedCategory != 'All' && selectedCategory != '')) {
                        url += `&find=${find}`;
                    } else {
                        url += `?find=${find}`;
                    }
                }

                console.log("URL", url);

                const response = await axios.get(url);
                setDevices(response.data);
                console.log("RESPONSE data", response.data);
            } catch (error) {
                console.error('Error fetching devices:', error.message);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4444/deviceCategory');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchData();
        fetchCategories();
    }, [sortOption, selectedCategory, find]);

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
    };

    const handleCategoryChange = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSelectedCategory(event.nativeEvent.target[index].text);
        setSelectedCategoryId(event.target.value);
    };

    const handleFindChange = (event) => {
        setFind(event.target.value);
    }

    return (
        <div className="container">
            <div className="sort-buttons">
                <button onClick={() => handleSortChange('asc')}>Sort by Price (↑)</button>
                <button onClick={() => handleSortChange('desc')}>Sort by Price (↓)</button>
                <select id="countrySelect" onChange={handleCategoryChange} value={selectedCategoryId}>
                    {categories.map((category) => (
                        <option className='select-dropdown__list-item' value={category.id}>
                            {category.name}
                        </option>
                    ))}
                    <option value="">All</option>
                </select>
                <input type="text" onChange={handleFindChange} />
            </div>
            <div className="listTripCenter">
                <ul className="trip-list">
                    {devices && devices.map((device) => (
                        <li  className="trip-item">
                            <Link to={`/devices/${device._id}`} className="trip-link">
                                <p className="trip-details">{device.name}</p>
                            </Link>
                            <p className="trip-price">Price: {device.price}$</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default Catalog;