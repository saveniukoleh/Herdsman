/**
 * Game configuration constants
 */
export interface GameConfig {
  readonly GAME_WIDTH: number;
  readonly GAME_HEIGHT: number;
  readonly HERO_SPEED: number;
  readonly FOLLOW_RADIUS: number;
  readonly MAX_FOLLOWERS: number;
  readonly ANIMAL_SPAWN_COUNT: { min: number; max: number };
  readonly YARD_POSITION: { x: number; y: number };
  readonly YARD_SIZE: { width: number; height: number };
}

/**
 * 2D Vector interface
 */
export interface IVector2D {
  x: number;
  y: number;
}

/**
 * Game entity states
 */
export enum EntityState {
  IDLE = 'idle',
  MOVING = 'moving',
  FOLLOWING = 'following',
  COLLECTED = 'collected',
}

/**
 * Animal interface
 */
export interface IAnimal {
  id: string;
  position: IVector2D;
  state: EntityState;
  isFollowing: boolean;
  followIndex: number;
}

/**
 * Hero interface
 */
export interface IHero {
  position: IVector2D;
  targetPosition: IVector2D;
  followers: IAnimal[];
  isMoving: boolean;
}

/**
 * Game events
 */
export interface GameEvents {
  scoreUpdated: (score: number) => void;
  animalCollected: (animal: IAnimal) => void;
  animalDelivered: (animal: IAnimal) => void;
}

/**
 * Game state interface
 */
export interface GameState {
  score: number;
  isRunning: boolean;
  animals: IAnimal[];
  hero: IHero;
}
