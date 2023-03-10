use std::net::{TcpListener, TcpStream};
use std::io::Read;

mod randomizer;
mod video_provider;

use crate::randomizer::Randomizer;
use crate::video_provider::VideoProvider;

fn main() -> std::io::Result<()> {
    // start a listener for GET requests on port 6969 that runs forever

    let listener = TcpListener::bind("127.0.0.1:6969").unwrap();

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                handle_connection(stream);
            }
            Err(e) => { /* connection failed */ }
        }
    }
    Ok(())
}

fn handle_connection(mut stream: TcpStream) {
    // handle the connection
    // check if the request is a GET request
    
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    if buffer.starts_with(b"GET") {
        let mut randomizer = Randomizer::new("seed");

        let words = randomizer.words(4);

        let mut video_provider = VideoProvider::new(&words);

        println!("words: {:?}", words);

    }


}
