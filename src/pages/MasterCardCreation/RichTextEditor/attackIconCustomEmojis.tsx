import { EmojiItem } from "@tiptap/extension-emoji";
// attack-types/index.ts
import { strength, agility, magic, special, noblephantasm } from "@/public/attack-types-text";

const emojiList = [
  { name: "strength", image: strength },
  { name: "agility", image: agility },
  { name: "magic", image: magic },
  { name: "special", image: special },
  { name: "noblephantasm", image: noblephantasm },
];

const attackIconCustomEmojis: EmojiItem[] = emojiList.map(({ name, image }) => ({
  name,
  shortcodes: [name],
  fallbackImage: image.src,
  tags: [],
}));

export default attackIconCustomEmojis;
