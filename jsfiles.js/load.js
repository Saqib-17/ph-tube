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

function display(data){
   
    const categoryDiv = document.getElementById('category-container');
    for (const catButton of data){
        const categoryButton = document.createElement('button');
        categoryButton.innerHTML = `
        <button>${catButton.category}</button>
        `
        categoryButton.classList = "btn lg:mx-2 p-2 lg:text-lg";
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
    for (const video of videos){
        console.log(video);
        const videosCard = document.createElement('div');
        videosCard.innerHTML = `
        <figure class="h-60">
    <img
   
      src=${video.thumbnail}
       class = "w-full h-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-0 py-3 flex gap-2">

    <div>
     <img class="h-10 w-10  object-cover rounded-full" src=${video.authors[0].profile_picture}/>
     </div>

    <div>
    <h1 class="font-bold">${video.title}</h1>
    <div class="flex gap-2">
    <p class="text-gray-500">${video.authors[0].profile_name}</p>
    <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />
    </div>
    <p class="text-gray-500">${video.others.views}</p>
    </div>

  </div>
       
        `
        videosCard.classList = "card card-compact";
        videosDiv.appendChild(videosCard);
    }
}




loadCategories();
loadVideos();
