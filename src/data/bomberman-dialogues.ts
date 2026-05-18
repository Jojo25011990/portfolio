// *** Short Sentences ***
// find me.

// not bad.
// interesting…
// stay focused.

// I see you.
// not this time.

// I'm still here?
// Still looking here?

// you found me.
// *** End of Short Sentences ***

type BombermanDialoguesPhase = 'match' | 'fake' | 'fakeRepeat' | 'win';

export const bombermanDialogues: Record<BombermanDialoguesPhase, string[]> = {
  match: ['Not bad.', 'interesting...', 'Stay focused.'],

  fake: ['I see you.', 'Not this time.'],

  fakeRepeat: ['Try again.', 'Still no'],

  win: ['you found me'],
};
