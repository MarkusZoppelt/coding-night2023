use std::io::Read;
use std::io::Write;

use std::net::{TcpListener, TcpStream};

mod randomizer;
mod video_provider;
mod wordlist;

use crate::randomizer::Randomizer;
use crate::video_provider::VideoProvider;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    // start a listener for GET requests on port 6969 that runs forever

    let listener = TcpListener::bind("127.0.0.1:6969").unwrap();

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                handle_connection(stream).await;
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
    }
    Ok(())
}

#[allow(clippy::unused_io_amount)]
async fn handle_connection(mut stream: TcpStream) {
    // handle the connection

    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    // check if the request is a GET request
    if buffer.starts_with(b"GET") {
        let mut randomizer = Randomizer::new("seed", "0");

        let words = randomizer.words(4);

        let mut video_provider = VideoProvider::new(&words);
        let video = video_provider.get_video_from_words().await.unwrap();

        let video_json = serde_json::to_string(&video).unwrap();

        let response = format!(
            "HTTP/1.1 200 OK\r

{}",
            video_json
        );

        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    }
}
