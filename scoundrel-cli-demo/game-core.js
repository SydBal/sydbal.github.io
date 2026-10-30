// Pure Scoundrel logic. No DOM, no Node APIs, no input/output.
// This is the same ruleset as scoundrel.js in the SydBal/scoundrel-CLI
// repo (which mirrors CLASSIC_SCOUNDREL_RULES.md and the web game's
// cardHandler.ts, actions.ts, and roomFlow.ts), packaged as an ES module
// so any UI can drive it: the Node CLI, the in-browser terminal on this
// page, and the React component below it.
//
// Rules: 20 HP, max 20. 44-card deck (Hearts 2-10, Diamonds 2-10,
// Clubs 2-Ace, Spades 2-Ace; Ace 14, J 11, Q 12, K 13). Rooms of 4.
// After resolving a card, if exactly 1 room card remains, 3 more are
// dealt, and that refill IS a new room: the heal and flee locks reset
// (progressRoom in the web game). Hearts heal once per room, capped at
// 20. Diamonds equip as a weapon. A fresh weapon blocks any one monster;
// after that it only blocks monsters weaker than the last one it slew,
// and blocked damage is monster value minus weapon value. Flee works
// only in a fresh room, before touching a card, and never twice in a
// row; fleeing returns the room to the bottom of the deck.

export const SUIT_SYMBOL = { Hearts: '♥', Diamonds: '♦', Clubs: '♣', Spades: '♠' };

export function valueToNumber(value) {
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  if (value === 'Jack') return 11;
  if (value === 'Queen') return 12;
  if (value === 'King') return 13;
  if (value === 'Ace') return 14;
  return 0;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildDeck() {
  const limited = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const full = [...limited, 'Jack', 'Queen', 'King', 'Ace'];
  const deck = [];
  for (const [suit, values] of [
    ['Hearts', limited],
    ['Diamonds', limited],
    ['Clubs', full],
    ['Spades', full],
  ]) {
    for (const label of values) deck.push({ suit, label, value: valueToNumber(label) });
  }
  return deck;
}

export function shuffle(deck, rng) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function cardName(card) {
  return `${card.label}${SUIT_SYMBOL[card.suit]}`;
}

export function newGame(seed) {
  const rng = seed === undefined ? Math.random : mulberry32(seed);
  const state = {
    deck: shuffle(buildDeck(), rng),
    room: [],
    discard: [],
    hp: 20,
    maxHp: 20,
    weapon: null,
    durability: undefined,
    freshWeapon: false,
    healedThisRoom: false,
    roomTouched: false,
    fledLastRoom: false,
    fleeCount: 0,
    monstersSlain: 0,
    damageTaken: 0,
    potionsDrunk: 0,
    weaponsEquipped: 0,
    roomsCleared: 0,
    over: false,
    won: false,
  };
  dealRoom(state, 4);
  return state;
}

function dealRoom(state, count) {
  const dealt = state.deck.splice(0, count);
  state.room.push(...dealt);
  return dealt;
}

export function canFlee(state) {
  if (state.over) return { ok: false, why: 'the run is over' };
  if (state.fledLastRoom) return { ok: false, why: 'you fled the last room' };
  if (state.roomTouched) return { ok: false, why: 'you already touched this room' };
  return { ok: true };
}

export function weaponMitigates(state, enemyValue) {
  if (!state.weapon) return false;
  if (state.freshWeapon) return true;
  if (state.durability === undefined) return false;
  return enemyValue < state.durability;
}

export function fightPreview(state, card) {
  const weaponValue = state.weapon ? state.weapon.value : 0;
  const mitigated = weaponMitigates(state, card.value);
  const damage = mitigated ? Math.max(0, card.value - weaponValue) : card.value;
  return { mitigated, damage, blocked: card.value - damage };
}

export function cardPreview(state, card) {
  if (card.suit === 'Hearts') {
    if (state.healedThisRoom) return 'potion, no effect (already healed this room)';
    const heal = Math.min(card.value, state.maxHp - state.hp);
    return `potion, heal ${heal}`;
  }
  if (card.suit === 'Diamonds') {
    return state.weapon ? `weapon, equip (replaces ${cardName(state.weapon)})` : 'weapon, equip';
  }
  const p = fightPreview(state, card);
  if (!state.weapon) return `monster, fight: take ${p.damage}`;
  if (p.mitigated) return `monster, fight: take ${p.damage} (blocked ${p.blocked})`;
  return `monster, fight: take ${p.damage} (weapon cannot block: needs a foe under ${state.durability})`;
}

// Resolve one room card. Returns the lines to print.
export function playCard(state, index) {
  const events = [];
  if (state.over) return ['The run is over.'];
  const card = state.room[index];
  if (!card) return ['No card there.'];

  state.room.splice(index, 1);
  state.roomTouched = true;

  if (card.suit === 'Hearts') {
    if (state.healedThisRoom) {
      events.push(`You set aside the ${cardName(card)}. Already healed this room, so it does nothing.`);
    } else {
      const heal = Math.min(card.value, state.maxHp - state.hp);
      state.hp = Math.min(state.maxHp, state.hp + heal);
      state.healedThisRoom = true;
      state.potionsDrunk++;
      events.push(`You drank the ${cardName(card)}. Healed ${heal}. HP ${state.hp}/${state.maxHp}.`);
    }
    state.discard.push(card);
  } else if (card.suit === 'Diamonds') {
    if (state.weapon) {
      events.push(`You dropped the ${cardName(state.weapon)} and equipped the ${cardName(card)}.`);
      state.discard.push(state.weapon);
    } else {
      events.push(`You equipped the ${cardName(card)}.`);
    }
    state.weapon = card;
    state.freshWeapon = true;
    state.durability = undefined;
    state.weaponsEquipped++;
  } else {
    const p = fightPreview(state, card);
    const mitigated = weaponMitigates(state, card.value);
    state.hp = Math.max(0, state.hp - p.damage);
    state.damageTaken += p.damage;
    state.monstersSlain++;
    let line = `You fought the ${cardName(card)}.`;
    if (p.blocked > 0) line += ` Weapon blocked ${p.blocked}.`;
    line += p.damage > 0 ? ` Took ${p.damage} damage. HP ${state.hp}/${state.maxHp}.` : ` No damage. HP ${state.hp}/${state.maxHp}.`;
    events.push(line);
    if (mitigated) {
      state.durability = card.value;
      state.freshWeapon = false;
    }
    state.discard.push(card);
    if (state.hp <= 0) {
      state.over = true;
      state.won = false;
      events.push(`You died to the ${cardName(card)}.`);
      return events;
    }
  }

  // Room flow, mirroring progressRoom in the web game: when exactly 1
  // card remains, 3 more are dealt and the room locks reset.
  if (state.room.length === 1) {
    const n = Math.min(3, state.deck.length);
    dealRoom(state, n);
    state.roomsCleared++;
    state.roomTouched = false;
    state.healedThisRoom = false;
    state.fledLastRoom = false;
    if (n > 0) events.push(`One card left: fresh room, dealing ${n} more (flee and healing reset).`);
  }

  if (state.room.length === 0) {
    if (state.deck.length === 0) {
      state.over = true;
      state.won = true;
      events.push('The dungeon is clear.');
    } else {
      state.roomsCleared++;
      state.roomTouched = false;
      state.healedThisRoom = false;
      state.fledLastRoom = false;
      dealRoom(state, Math.min(4, state.deck.length));
      events.push('Room cleared. Dealing a new room.');
    }
  }
  return events;
}

export function flee(state) {
  const check = canFlee(state);
  if (!check.ok) return [`Cannot flee: ${check.why}.`];
  state.deck.push(...state.room);
  state.room = [];
  state.fleeCount++;
  state.fledLastRoom = true;
  state.roomTouched = false;
  state.healedThisRoom = false;
  dealRoom(state, Math.min(4, state.deck.length));
  return ['You fled. The room returns to the bottom of the deck.'];
}

export function weaponStatus(state) {
  if (!state.weapon) return 'none';
  if (state.freshWeapon) return `${cardName(state.weapon)} (fresh, blocks any one foe)`;
  return `${cardName(state.weapon)} (blocks foes under ${state.durability})`;
}

export function render(state) {
  const lines = [];
  lines.push(`HP ${state.hp}/${state.maxHp}  |  Weapon: ${weaponStatus(state)}  |  Deck: ${state.deck.length}  |  Discard: ${state.discard.length}  |  Rooms cleared: ${state.roomsCleared}  |  Flees: ${state.fleeCount}`);
  lines.push('Room:');
  state.room.forEach((card, i) => {
    lines.push(`  [${i + 1}] ${cardName(card)} — ${cardPreview(state, card)}`);
  });
  const fleeCheck = canFlee(state);
  lines.push(fleeCheck.ok ? '  [f] Flee this room' : `  [f] Flee (unavailable: ${fleeCheck.why})`);
  lines.push('  [h] Help   [q] Quit');
  return lines.join('\n');
}

export function statsLine(state) {
  return `Monsters slain: ${state.monstersSlain} | Damage taken: ${state.damageTaken} | Potions: ${state.potionsDrunk} | Weapons: ${state.weaponsEquipped} | Flees: ${state.fleeCount} | Rooms cleared: ${state.roomsCleared}`;
}
