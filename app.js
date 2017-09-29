"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class Youtube {
   constructor() {
   this.result = {
      videos: [],
      selectedVideo: null,
      searchTerm: "Subaru-STI"
      };
      this.youtubeSearch("Subaru-STI");

      $('#video-search').click(()=>{
         let current_video = $('#input-data').val();
        $("#root").empty();
         console.log(current_video);
         this.youtubeSearch(current_video);
      });

      $('div').click(()=>{
        let current_video = $('#input-data').val();
        this.playVideo(current_video);
      });
   }


   getVideoList(videos) {
     return videos.map((video, index) => {
        const imageUrl = video.snippet.thumbnails.default.url;
        const url = `https://www.youtube.com/embed/${video.id.videoId}`;
        const description=video.snippet.description;
        const title=video.snippet.title;

         return $('#root').append(`<div><img class="media-object" src=${imageUrl} />
         <p>${title}</p></div>`)


     });
   }

   videoList(videos) {
          const title=videos.snippet.title;
          const description=videos.snippet.description;
          const url = `https://www.youtube.com/embed/${videos.id.videoId}`;
         return $('#resultado').html(`<iframe class="embed-responsive-item" src=${url}> </iframe><p>${title}</p><p>${description}</p>`)
    }
    
   youtubeSearch(searchTerm) {
      console.log(searchTerm);
      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         this.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         console.log('video',this.result.selectedVideo);
         let list = this.getVideoList(this.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });

   }

  playVideo(searchTerm){
    let sour=event.target.src;
    let position;

    console.log('sour',sour);
       this.result.videos.map((video,index)=>{
        const imageUrl = video.snippet.thumbnails.default.url;
         return (sour==imageUrl)? position=index: '';
       });
       this.videoList(this.result.videos[position]);
 }

}

let video = new Youtube();
