use rustube::Id;
use rustube::VideoFetcher;

use serde::Serialize;

#[allow(dead_code)]
#[derive(Debug, Serialize)]
pub struct Video {
    title: String,
    url: String,
    description: String,
    thumbnail: String,
    length: u32,
    views: u32,
    creator: String,
}

pub struct VideoProvider {
    words: Vec<String>,
}

impl VideoProvider {
    pub fn new(words: &[String]) -> Self {
        Self {
            words: words.to_vec(),
        }
    }

    pub async fn get_video_from_words(&mut self) -> Result<Video, Box<dyn std::error::Error>> {
        // do a search query on youtube with the words
        let words_str = self.words.join("+");
        let url = format!("https://www.youtube.com/results?search_query={}", words_str);

        // do a request to the url and parse the html
        let response = reqwest::get(&url).await?.text().await?;

        // search body for the first video link starting with "/watch?v="
        // use regex to find the first match
        let re = regex::Regex::new(r#"/watch\?v=[a-zA-Z0-9_-]{11}"#).unwrap();

        // find the first match
        let result = re
            .captures_iter(&response)
            .next()
            .unwrap()
            .get(0)
            .unwrap()
            .as_str();

        // construct the video url
        let video_url = format!("https://www.youtube.com{}", result);

        let id = Id::from_raw(&video_url).unwrap();
        let descrambler = VideoFetcher::from_id(id.into_owned())
            .unwrap()
            .fetch()
            .await
            .unwrap();

        // get the video details
        let video_details = descrambler.video_details();

        // construct the video
        let video = Video {
            title: video_details.clone().title,
            url: video_url,
            description: video_details.clone().short_description,
            thumbnail: video_details.clone().thumbnails[0].url.clone(),
            length: video_details.length_seconds as u32,
            views: video_details.view_count as u32,
            creator: video_details.clone().author,
        };

        Ok(video)
    }
}
