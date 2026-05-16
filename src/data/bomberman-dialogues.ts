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

type BombermanDialoguesPhase = 'match' | 'fake';

export const bombermanDialogues: Record<BombermanDialoguesPhase, string[]> = {
  match: ['Not bad.', 'interesting...', 'Stay focused.'],

  fake: ['I see you.', 'Not this time.'],
};
