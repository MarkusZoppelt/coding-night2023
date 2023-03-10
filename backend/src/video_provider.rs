pub struct VideoProvider {
    
}

impl VideoProvider {
    pub fn new(words: &Vec<String>) -> Self {
        Self {}
    }
}

struct Video {
    title: String,
    url: String,
    link: String,
    length: u32,
    views: u32,
    subscribers: u32,
    creator: String,
}
