pub struct Randomizer {
}

impl Randomizer {
    pub fn new(seed: &str) -> Self {
        Self {}
    }

    pub fn words(&mut self, count: u32) -> Vec<String> {
        let words =["petite".to_string(), "smugly".to_string(), "earmuff".to_string(), "sneaker".to_string()];
        words.to_vec()
    }
}
