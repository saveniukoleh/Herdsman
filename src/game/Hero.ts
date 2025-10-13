import { Container, Graphics } from 'pixi.js';
import { Vector2D } from './utils/Vector2D';
import type { IHero, IVector2D } from '../types';

/**
 * Hero character class - the main player character
 */
export class Hero {
  private container: Container;
  private graphics: Graphics;
  private position: Vector2D;
  private targetPosition: Vector2D;
  private speed: number;
  private gameWidth: number;
  private gameHeight: number;
  private followers: Animal[] = [];
  private isMoving: boolean = false;

  // Hero visual properties
  private readonly HERO_RADIUS = 15;
  private readonly HERO_COLOR = 0xe74c3c; // Red color

  constructor(
    parentContainer: Container,
    speed: number,
    gameWidth: number,
    gameHeight: number
  ) {
    this.container = parentContainer;
    this.speed = speed;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    // Initialize position at center of screen
    this.position = new Vector2D(gameWidth / 2, gameHeight / 2);
    this.targetPosition = this.position.clone();

    // Create hero graphics
    this.graphics = new Graphics();
    this.graphics.interactive = false; // Make sure hero doesn't block clicks
    this.drawHero();
    this.container.addChild(this.graphics);
  }

  /**
   * Update hero position and movement
   */
  public update(): void {
    if (this.isMoving) {
      this.moveTowardsTarget();
    }
  }

  /**
   * Move hero to a target position
   */
  public moveTo(target: IVector2D): void {
    this.targetPosition = new Vector2D(target.x, target.y);
    this.isMoving = true;
  }

  /**
   * Move towards the target position
   */
  private moveTowardsTarget(): void {
    const direction = this.targetPosition.subtract(this.position);
    const distance = direction.magnitude();

    if (distance < 2) {
      // Close enough to target
      this.position = this.targetPosition.clone();
      this.isMoving = false;
    } else {
      // Move towards target
      const normalizedDirection = direction.normalize();
      const movement = normalizedDirection.multiply(this.speed / 60); // 60 FPS
      this.position = this.position.add(movement);
    }

    // Keep hero within game bounds
    this.position.x = Math.max(
      this.HERO_RADIUS,
      Math.min(this.gameWidth - this.HERO_RADIUS, this.position.x)
    );
    this.position.y = Math.max(
      this.HERO_RADIUS,
      Math.min(this.gameHeight - this.HERO_RADIUS, this.position.y)
    );

    // Update graphics position
    this.graphics.x = this.position.x;
    this.graphics.y = this.position.y;

    // Update followers positions
    this.updateFollowers();
  }

  /**
   * Update followers positions to follow the hero
   */
  private updateFollowers(): void {
    this.followers.forEach((follower, index) => {
      if (follower && follower.isFollowing()) {
        // Calculate position behind the hero
        const followDistance = 40; // Distance between followers
        const spacing = (index + 1) * followDistance;

        // Get direction hero is moving
        const direction = this.targetPosition
          .subtract(this.position)
          .normalize();

        // Calculate follower position
        const followerTarget = this.position.subtract(
          direction.multiply(spacing)
        );

        // Update follower target
        follower.setFollowTarget(followerTarget);
      }
    });
  }

  /**
   * Add a follower to the hero
   */
  public addFollower(animal: Animal): void {
    if (this.followers.length < 5) {
      // Max 5 followers
      this.followers.push(animal);
      animal.setFollowIndex(this.followers.length - 1);
    }
  }

  /**
   * Remove a follower from the hero
   */
  public removeFollower(animal: Animal): void {
    const index = this.followers.indexOf(animal);
    if (index !== -1) {
      this.followers.splice(index, 1);
      // Update follow indices for remaining followers
      this.followers.forEach((follower, i) => {
        follower.setFollowIndex(i);
      });
    }
  }

  /**
   * Get current position
   */
  public getPosition(): Vector2D {
    return this.position.clone();
  }

  /**
   * Get current followers
   */
  public getFollowers(): Animal[] {
    return [...this.followers];
  }

  /**
   * Get hero state
   */
  public getState(): IHero {
    return {
      position: this.position,
      targetPosition: this.targetPosition,
      followers: this.followers.map((follower) => follower.getState()),
      isMoving: this.isMoving,
    };
  }

  /**
   * Reset hero to initial state
   */
  public reset(): void {
    this.position = new Vector2D(this.gameWidth / 2, this.gameHeight / 2);
    this.targetPosition = this.position.clone();
    this.isMoving = false;
    this.followers = [];
    this.graphics.x = this.position.x;
    this.graphics.y = this.position.y;
  }

  /**
   * Draw the hero character
   */
  private drawHero(): void {
    this.graphics.clear();
    this.graphics.beginFill(this.HERO_COLOR);
    this.graphics.drawCircle(0, 0, this.HERO_RADIUS);
    this.graphics.endFill();

    // Add a small highlight
    this.graphics.beginFill(0xffffff, 0.3);
    this.graphics.drawCircle(-3, -3, 4);
    this.graphics.endFill();
  }

  /**
   * Destroy the hero
   */
  public destroy(): void {
    this.container.removeChild(this.graphics);
    this.graphics.destroy();
  }
}

// Import Animal class for type reference
import type { Animal } from './Animal';
