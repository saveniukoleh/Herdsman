import { Random } from './utils/Random';
import type { IVector2D } from '../types.d';

/**
 * AnimalPatrol class - handles random wandering behavior for animals
 */
export class AnimalPatrol {
  private currentTarget: IVector2D | null = null;
  private lastDirectionChange: number = 0;
  private directionChangeInterval: number = 2000; // 2 seconds
  private wanderRadius: number = 50;
  private speed: number = 30;
  private isActive: boolean = true;

  private gameWidth: number;
  private gameHeight: number;
  private animalPosition: IVector2D;

  constructor(
    gameWidth: number,
    gameHeight: number,
    animalPosition: IVector2D
  ) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.animalPosition = animalPosition;
    this.generateNewTarget();
  }

  /**
   * Update patrol behavior
   */
  public update(
    currentTime: number,
    animalPosition: IVector2D
  ): IVector2D | null {
    if (!this.isActive) return null;

    this.animalPosition = animalPosition;

    // Check if it's time to change direction
    if (
      currentTime - this.lastDirectionChange >=
      this.directionChangeInterval
    ) {
      this.generateNewTarget();
      this.lastDirectionChange = currentTime;
    }

    // If we have a target, move towards it
    if (this.currentTarget) {
      const direction = this.calculateDirection(
        animalPosition,
        this.currentTarget
      );
      const distance = this.calculateDistance(
        animalPosition,
        this.currentTarget
      );

      // If we're close to the target, generate a new one
      if (distance < 20) {
        this.generateNewTarget();
        return null;
      }

      // Return movement vector
      return {
        x: direction.x * this.speed,
        y: direction.y * this.speed,
      };
    }

    return null;
  }

  /**
   * Generate a new patrol target
   */
  private generateNewTarget(): void {
    // Generate a random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = Random.float(20, this.wanderRadius);

    const newTarget = {
      x: this.animalPosition.x + Math.cos(angle) * distance,
      y: this.animalPosition.y + Math.sin(angle) * distance,
    };

    // Ensure target is within game bounds
    newTarget.x = Math.max(30, Math.min(this.gameWidth - 30, newTarget.x));
    newTarget.y = Math.max(30, Math.min(this.gameHeight - 30, newTarget.y));

    this.currentTarget = newTarget;
  }

  /**
   * Calculate direction from one point to another
   */
  private calculateDirection(from: IVector2D, to: IVector2D): IVector2D {
    const distance = this.calculateDistance(from, to);
    if (distance === 0) return { x: 0, y: 0 };

    return {
      x: (to.x - from.x) / distance,
      y: (to.y - from.y) / distance,
    };
  }

  /**
   * Calculate distance between two points
   */
  private calculateDistance(from: IVector2D, to: IVector2D): number {
    return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
  }

  /**
   * Set patrol parameters
   */
  public setParameters(
    wanderRadius: number,
    speed: number,
    directionChangeInterval: number
  ): void {
    this.wanderRadius = wanderRadius;
    this.speed = speed;
    this.directionChangeInterval = directionChangeInterval;
  }

  /**
   * Activate patrol behavior
   */
  public activate(): void {
    this.isActive = true;
    this.generateNewTarget();
  }

  /**
   * Deactivate patrol behavior
   */
  public deactivate(): void {
    this.isActive = false;
    this.currentTarget = null;
  }

  /**
   * Check if patrol is active
   */
  public isPatrolActive(): boolean {
    return this.isActive;
  }

  /**
   * Get current target
   */
  public getCurrentTarget(): IVector2D | null {
    return this.currentTarget;
  }

  /**
   * Force a new target generation
   */
  public forceNewTarget(): void {
    this.generateNewTarget();
  }

  /**
   * Get patrol statistics
   */
  public getStats(): {
    isActive: boolean;
    hasTarget: boolean;
    wanderRadius: number;
    speed: number;
    directionChangeInterval: number;
  } {
    return {
      isActive: this.isActive,
      hasTarget: this.currentTarget !== null,
      wanderRadius: this.wanderRadius,
      speed: this.speed,
      directionChangeInterval: this.directionChangeInterval,
    };
  }
}
