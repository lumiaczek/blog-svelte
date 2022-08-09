import { writable } from "svelte/store";



fetch("http://localhost:5000/").then(res => {
    res.json().then(res => {
    posts = res;
    console.log(posts);
});
}).catch(err => {
    console.error(err);
})