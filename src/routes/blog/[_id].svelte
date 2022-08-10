<script>
    import { onMount } from "svelte";
    import Navbar from "../../components/main/Navbar.svelte";
    import blogID from '../blog/blog-store.js';

    let post = {};

    onMount(() => {
        
        let request = {
            id: ''
        }
    
        blogID.subscribe((data) => {
            request.id = data;
        });

        fetch("http://localhost:5000/",{
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
				'Content-Type': 'application/json'
			}
        })
        .then(res => {
            res.json().then(res => {
                post = res;
                console.log(post);
            });
            }).catch(err => {
                console.error(err);
        });
    });



</script>

<article>
    <Navbar/>
</article>