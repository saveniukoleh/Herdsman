import type { IVector2D } from '../../types';

/**
 * Random utility functions for game mechanics
 */
export class Random {
  /**
   * Generate a random integer between min and max (inclusive)
   */
  public static int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random float between min and max
   */
  public static float(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generate a random boolean
   */
  public static boolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Generate a random element from an array
   */
  public static choice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generate a random position within game bounds
   */
  public static positionInBounds(
    gameWidth: number,
    gameHeight: number,
    margin: number = 50
  ): IVector2D {
    return {
      x: Random.float(margin, gameWidth - margin),
      y: Random.float(margin, gameHeight - margin),
    };
  }

  /**
   * Generate a random position avoiding certain areas
   */
  public static positionAvoidingAreas(
    gameWidth: number,
    gameHeight: number,
    avoidAreas: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>,
    margin: number = 50,
    maxAttempts: number = 100
  ): IVector2D {
    for (let i = 0; i < maxAttempts; i++) {
      const position = Random.positionInBounds(gameWidth, gameHeight, margin);
      let validPosition = true;

      for (const area of avoidAreas) {
        if (
          position.x >= area.x - margin &&
          position.x <= area.x + area.width + margin &&
          position.y >= area.y - margin &&
          position.y <= area.y + area.height + margin
        ) {
          validPosition = false;
          break;
        }
      }

      if (validPosition) {
        return position;
      }
    }

    // Fallback to random position if no valid position found
    return Random.positionInBounds(gameWidth, gameHeight, margin);
  }

  /**
   * Generate a random direction vector (unit vector)
   */
  public static direction(): IVector2D {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

  /**
   * Generate a random color in hex format
   */
  public static color(): string {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  }

  /**
   * Generate a random ID string
   */
  public static id(length: number = 8): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Shuffle an array in place
   */
  public static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate a random spawn position for animals
   */
  public static animalSpawnPosition(
    gameWidth: number,
    gameHeight: number,
    heroPosition: IVector2D,
    minDistance: number = 100
  ): IVector2D {
    const maxAttempts = 50;
    for (let i = 0; i < maxAttempts; i++) {
      const position = Random.positionInBounds(gameWidth, gameHeight, 30);
      const distance = Math.sqrt(
        (position.x - heroPosition.x) ** 2 + (position.y - heroPosition.y) ** 2
      );
      if (distance >= minDistance) {
        return position;
      }
    }
    // Fallback to random position if no suitable position found
    return Random.positionInBounds(gameWidth, gameHeight, 30);
  }
}
