import React, { Component } from 'react'
import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext();

class RoomProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            rooms:[],
            sortedRooms:[],
            featuredRooms:[],
            loading: true,
            type: 'all',
            capacity: 1,
            price: 0,
            minprice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
            breakfast: false,
            pets: false
        };
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortRoomExample",
                //order: "sys.createdAt"
                order: "fields.price"
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize 
            })
        }catch (error) {

        }
        
    }

    componentDidMount() {
        this.getData()
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, images, id};
            return room;
        });
        return tempItems;
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug===slug);
        return room;
    }

    handleChange = event => {
        const target = event.target;
        const name = event.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name]: value
        },this.filterRooms)
    }

    filterRooms = () => {
        let {rooms,type,capacity,price,
            minPrice,maxPrice,minSize,maxSize,breakfast,pets} = this.state;
        let tempRooms = [...rooms] 
        //Room type filter 
        if(type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        //Number of guest filter
        capacity = parseInt(capacity);
        tempRooms = tempRooms.filter(room => capacity <= room.capacity);
        //Price filter
        price = parseInt(price);
        tempRooms = tempRooms.filter(room => room.price <= price);
        //Min size filter
        minSize = parseInt(minSize);
        tempRooms = tempRooms.filter(room => room.size >= minSize);
        //Max size filter
        maxSize = parseInt(maxSize)
        tempRooms = tempRooms.filter(room => room.size <= maxSize);
        //Breakfast filter
        if(breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        if(pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        //pets filter
        this.setState({
            sortedRooms: tempRooms
        })
    }
    
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom,
             handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export {RoomProvider,RoomConsumer,RoomContext}