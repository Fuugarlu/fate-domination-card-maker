import { EmojiItem } from "@tiptap/extension-emoji";
// attack-types/index.ts
import { strength, agility, magic, special } from "@/pics/attack-types";

const emojiList = [
  { name: "strength", image: strength },
  { name: "agility", image: agility },
  { name: "magic", image: magic },
  { name: "special", image: special },
];

const attackIconCustomEmojis: EmojiItem[] = emojiList.map(({ name, image }) => ({
  name,
  shortcodes: [name],
  fallbackImage: image.src,
  tags: [],
}));

export default attackIconCustomEmojis;
