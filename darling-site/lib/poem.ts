export type Stanza = { lines: string[]; kind?: "pull" | "quiet" | "final" };

export const TITLE = "Your Skin Beneath My Lips";
export const DEDICATION = "For my darling.";
export const SIGN_OFF = "Yours, always"; // ← change me

export const STANZAS: Stanza[] = [
  { lines: ["Darling,", "I have thoughts about you", "that I would never dare whisper", "in a room full of people."] },
  { lines: ["Thoughts that begin with your lips", "but have absolutely no intention", "of ending there."] },
  { lines: ["I want you close.", "Ridiculously close.", "Close enough that I can feel your breath", "against my mouth", "while I decide whether to kiss you", "or make you wait another second."] },
  { lines: ["I want my hands around your waist,", "pulling you against me,", "my fingers finding their way across your back,", "feeling your skin beneath my fingertips", "as though I have all the time in the world", "and nowhere better to spend it."] },
  { kind: "pull", lines: ["And, darling, I want to undress you."] },
  { lines: ["Slowly.", "With my eyes never quite leaving yours.", "I want to discover the woman beneath", "every layer of clothing,", "to admire what you’ve been hiding", "from the rest of the world."] },
  { lines: ["I want to kiss your shoulders,", "your collarbones, your neck,", "let my lips wander across your skin,", "down your chest,", "and linger where my hands", "have been longing to feel you."] },
  { lines: ["I want your thighs against mine,", "your fingers tangled in my hair,", "your body responding to every little touch.", "I want the kind of closeness", "that makes conversation entirely unnecessary."] },
  { lines: ["And don’t mistake my tenderness", "for a lack of appetite, darling."] },
  { lines: ["I can adore you gently", "and still want you with an intensity", "that makes restraint feel like a difficult art."] },
  { lines: ["I want to explore you,", "to learn what makes you shiver,", "what makes you pull me closer,", "what makes you forget", "that you were ever trying to be composed."] },
  { lines: ["I want to kiss you between laughter,", "hold you between moments of passion,", "and steal another kiss", "even when you’ve already given me a hundred."] },
  { lines: ["I want the warmth of your bare skin,", "the weight of your body in my arms,", "the sound of your breathing beside my ear,", "and the beautiful, private intimacy", "of being wanted just as desperately", "as I want you."] },
  { kind: "quiet", lines: ["And afterward, darling,", "when the room has gone quiet,", "when your head is resting against me", "and my fingers are tracing absent-minded circles", "against your skin—"] },
  { kind: "quiet", lines: ["I know I’ll look at you", "and want you all over again."] },
  { kind: "pull", lines: ["Because that’s the rather shameless truth:"] },
  { lines: ["I don’t just want to kiss you.", "I want to adore every inch of you,", "to touch you, taste your kisses,", "hold you, desire you,", "and make love to you", "with all the patience, hunger,", "and affection my heart can possibly contain."] },
  { kind: "final", lines: ["Darling, I want all of you.", "Not just your beautiful body.", "The privilege of being the one", "you let this close."] },
];
