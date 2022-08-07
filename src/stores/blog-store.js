import { writable } from "svelte/store";

const customStore = {
    subscribe: hobbies.subscribe,
    setHobbies: (items) => {
        hobbies.set(items);
    },
    addHobby: (item) => {
        hobbies.update(items => {
            return items.concat(item);
        })
    }
}

export default customStore;