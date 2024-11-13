const loadCategories= () => {
    
   
   try{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => display(data.categories))
   }
   catch(error){
    console.log(error);
   }
    
} 

function display(data) {
    const categoryDiv = document.getElementById('category-container');
    for (const catButton of data) {
        const categoryButton = document.createElement('button');
        categoryButton.innerHTML = `${catButton.category}`;
        categoryButton.classList = "btn lg:mx-2 p-2 lg:text-lg";
        
        categoryButton.onclick = () => {
            // Remove active class from all buttons
            const buttons = categoryDiv.querySelectorAll('button');
            buttons.forEach(btn => btn.classList.remove('bg-red-500', 'text-white'));

            // Add active class to the clicked button
            categoryButton.classList.add('bg-red-500', 'text-white');

            loadCategoryVideos(`${catButton.category_id}`);
        };

        categoryDiv.appendChild(categoryButton);
    }
}


const loadVideos= () => {
    console.log('inside load videos');
   
   try{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
   }
   catch(error){
    console.log(error);
   }
    
} 

const loadCategoryVideos = (id) =>{
    
    try{
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.category))
       }
       catch(error){
        console.log(error);
       }
    
}


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


function displayVideos(videos){
   
    const videosDiv = document.getElementById('videos');
    videosDiv.innerHTML="";
    if(videos.length == 0){
        videosDiv.classList.remove("grid");
        videosDiv.innerHTML=
        `
       <div class="min-h-[300px] flex flex-col gap-5 lg:my-40 items-center" >
                        <img src="assets/Icon.png" alt="">
                        <h2 class="pt-10 text-2xl font-bold text-center">No Content Here in this Category</h2>
                      </div>
        `;
        return;
    }
    else{
        videosDiv.classList.add("grid");
    }
    for (const video of videos){
        console.log(video);
        const videosCard = document.createElement('div');
        videosCard.innerHTML = `
        <figure class="h-60 relative">
    <img
   
      src=${video.thumbnail}
       class = "w-full h-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date === "" ? "":`<span class="bg-black text-white absolute p-2 rounded right-2 bottom-2 text-xs">${getTime(video.others.posted_date)} </sapn>`}
      
  </figure>
  <div class="px-0 py-3 flex gap-2">

    <div>
     <img class="h-10 w-10  object-cover rounded-full" src=${video.authors[0].profile_picture}/>
     </div>

    <div>
    <h1 class="font-bold">${video.title}</h1>
    <div class="flex gap-2">
    <p class="text-gray-500">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true ? 
        '<img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />':""
    }
    
    </div>
    <p class="text-gray-500">${video.others.views}</p>
    </div>

  </div>
       
        `
        videosCard.classList = "card card-compact";

        videosDiv.appendChild(videosCard);
    }
}

function getTime(time){
    const hour = parseInt(time / 3600);
    let seconds = time % 3600;
    const minute = parseInt(seconds / 60);
    seconds = seconds %  60;
    return `${hour} hourse ${minute} minutes ${seconds} seconds ago`

}


loadCategories();
loadVideos();
