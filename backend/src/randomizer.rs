use crate::wordlist::get_wordlist;
use rand::{rngs::StdRng, Rng};
use rand_seeder::Seeder;
pub struct Randomizer {
    rng: StdRng,
}

impl Randomizer {
    pub fn new(seed: &str, idx: &str) -> Self {
        let mut seed = seed.to_string();
        seed.push_str(idx);
        Self {
            rng: Seeder::from(seed).make_rng(),
        }
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

        get_wordlist().get_word(number).unwrap().to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn randomizer() {
        let mut randomizer = Randomizer::new("foo", "bar");
        let word = randomizer.words(1);
        assert_eq!(word[0], "bogged");
    }
}
