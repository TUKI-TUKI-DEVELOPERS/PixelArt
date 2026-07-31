export type CharacterRole = {
  key: string; // calza con las keys de characterMeta del wizard: recipient/dedicator/papa/mama/hijos/hermanos/pet/owners
  count?: number; // cantidad fija (ej. pareja: count 1 por rol)
  min?: number; // cantidad variable (ej. hermanos: min 1, max 3)
  max?: number;
};
