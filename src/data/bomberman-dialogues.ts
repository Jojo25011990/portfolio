// *** Sentences ***
// find me.

// not bad.
// interesting…
// lucky guess.
// stay focused.

// I see you.
// not this time.

// you found me.
// *** End of Sentences ***

type BombermanDialoguesPhase = 'entry' | 'match' | 'fake' | 'win';

export const bombermanDialogues: Record<BombermanDialoguesPhase, string[]> = {
  entry: ['Find me.'],

  match: ['Not bad.', 'interesting...', 'Lucky guess.', 'Stay focused.'],

  fake: ['I see you.', 'Not this time.'],

  win: ['You found me.'],
};
