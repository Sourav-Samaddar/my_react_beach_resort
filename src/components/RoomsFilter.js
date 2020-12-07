import React from 'react'
import Title from './Title'
import {useContext} from 'react'
import {RoomContext} from '../Context'

const getUnique = (items,value) => {
    return [...new Set(items.map(item => item[value])) ]
}
export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    const {handleChange,type,capacity,price,
        minPrice,maxPrice,minSize,maxSize,breakfast,pets} = context;
    // get unique types    
    let types = getUnique(rooms,'type');
    let numberOfGuest = getUnique(rooms,'capacity');
    // add all 
    types = ['all',...types];    
    // map to jsx
    types = types.map((item,index) => {
        return (
            <option value={item} key={index}>
                {item}
            </option>
        );
    });
    numberOfGuest = numberOfGuest.map((item,index) => {
        return (
            <option value={item} key={index}>
                {item}
            </option>
        );
    });
    return (
        <section className="filter-container">
            <Title title="Search Rooms" />
            <form className="filter-form">
            {/*Select Room Type start  */}
            <div className="form-group">
                <label htmlFor="type">room type</label>   
                <select name="type" id="type" value={type} 
                    className="form-control" onChange={handleChange}>
                    {types}
                </select>
            </div>
            {/*Select Room Type end  */}
            {/*Select number of guest start  */}
            <div className="form-group">
                <label htmlFor="capacity">Guests</label>   
                <select name="capacity" id="capacity" value={capacity} 
                    className="form-control" onChange={handleChange}>
                    {numberOfGuest}
                </select>
            </div>
            {/*Select number of guest end  */}
            {/* Room Price start */}
            <div className="form-group">
                <label htmlFor="price">room price ${price}</label> 
                <input type="range" name="price" id="price" 
                min={minPrice} max={maxPrice} onChange={handleChange} 
                className="form-control" value={price} />
            </div>
            {/* Room Price end */}
            {/* Room Size start */}
            <div className="form-group">
                <label htmlFor="size">room size</label> 
                <div className="size-inputs">
                    <input type="number" value={minSize} name="minSize" 
                    onChange={handleChange} className="size-input" />
                    <input type="number" value={maxSize} name="maxSize" 
                    onChange={handleChange} className="size-input" />
                </div>
            </div>
            {/* Room Size end */}
            {/* Breakfast and Pets start */}
            <div className="form-group">
                <div className="single-extra">
                    <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast}
                    onChange={handleChange} />
                    <label htmlFor="breakfast">breakfast</label>
                </div>
                <div className="single-extra">
                    <input type="checkbox" name="pets" id="pets" checked={pets}
                    onChange={handleChange} />
                    <label htmlFor="pets">pets</label>
                </div>
            </div>
            {/* Breakfast and Pets end */}
            </form>
        </section>
    )
}
