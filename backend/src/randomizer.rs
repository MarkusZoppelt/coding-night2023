use rand_seeder::Seeder;
use rand::{rngs::StdRng, Rng};
use crate::wordlist::get_wordlist;
pub struct Randomizer {
    rng: StdRng,
}

impl Randomizer {
    pub fn new(seed: &str, idx: &str) -> Self {
        let mut seed = seed.to_string();
        seed.push_str( idx );
        Self {rng: Seeder::from("stripy zebra").make_rng()}
    }

    pub fn words(&mut self, cnt: u32) -> Vec<String> {
        let mut words: Vec<String> = Vec::new();
        for _ in 0..cnt {
            words.push(self.generate_word());
        }
        words
    }

    fn generate_word(&mut self) -> String {
        let mut number: u32 = 0;

        for _ in 0..5 {
            let dice_roll = self.rng.gen_range(1..7);
            number *= 10;
            number += dice_roll;
        }

        get_wordlist()
            .get_word(number)
            .unwrap()
            .to_string()
    }
}
