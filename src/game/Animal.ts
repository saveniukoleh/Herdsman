import { Container, Graphics } from 'pixi.js';
import { Vector2D } from './utils/Vector2D';
import { Random } from './utils/Random';
// import { AnimalPatrol } from './AnimalPatrol'; // Disabled for now
import type { IAnimal, IVector2D } from '../types.d';
import { EntityState } from '../types.d';

/**
 * Animal class - collectible entities that follow the hero
 */
export class Animal {
  private container: Container;
  public graphics: Graphics;
  private position: Vector2D;
  private followTarget: Vector2D | null = null;
  private state: EntityState;
  private followIndex: number = -1;
  private id: string;
  private speed: number = 100; // Movement speed when following
  // private patrol: AnimalPatrol | null = null; // Disabled for now

  // Animal visual properties
  private readonly ANIMAL_RADIUS = 12;
  private readonly ANIMAL_COLOR = 0xffffff; // White color

  constructor(
    parentContainer: Container,
    position: IVector2D,
    _followRadius: number,
    _gameWidth: number = 800,
    _gameHeight: number = 600
  ) {
    this.container = parentContainer;
    this.position = new Vector2D(position.x, position.y);
    this.state = EntityState.IDLE;
    this.id = Random.id(8);

    // Initialize patrol behavior (disabled for now)
    // this.patrol = new AnimalPatrol(gameWidth, gameHeight, position);

    // Create animal graphics
    this.graphics = new Graphics();
    this.graphics.interactive = false; // Make sure animals don't block clicks
    this.drawAnimal();
    this.container.addChild(this.graphics);

    // Set initial graphics position
    this.graphics.x = this.position.x;
    this.graphics.y = this.position.y;

    console.log(
      `🐑 Animal created at position: (${this.position.x}, ${this.position.y})`
    );
  }

  /**
   * Update animal behavior
   */
  public update(): void {
    // Check if animal has been destroyed
    if (!this.graphics || this.graphics.destroyed) {
      console.log(
        `⚠️ Animal ${this.id} is being updated but graphics are destroyed!`
      );
      return;
    }

    if (this.state === EntityState.FOLLOWING && this.followTarget) {
      this.moveTowardsTarget();
    } else if (this.state === EntityState.IDLE) {
      // Animals stay still when idle - no patrol behavior
      // this.patrolBehavior(); // Disabled to keep animals still
    }

    // Update graphics position
    this.graphics.x = this.position.x;
    this.graphics.y = this.position.y;
  }

  /**
   * Start following the hero
   */
  public startFollowing(hero: any): void {
    this.state = EntityState.FOLLOWING;
    this.followTarget = hero.getPosition().clone();
  }

  /**
   * Set follow target position
   */
  public setFollowTarget(target: Vector2D): void {
    this.followTarget = target.clone();
  }

  /**
   * Set follow index in the group
   */
  public setFollowIndex(index: number): void {
    this.followIndex = index;
  }

  /**
   * Move towards the follow target
   */
  private moveTowardsTarget(): void {
    if (!this.followTarget) return;

    const direction = this.followTarget.subtract(this.position);
    const distance = direction.magnitude();

    if (distance < 5) {
      // Close enough to target
      this.position = this.followTarget.clone();
    } else {
      // Move towards target
      const normalizedDirection = direction.normalize();
      const movement = normalizedDirection.multiply(this.speed / 60); // 60 FPS
      this.position = this.position.add(movement);
    }
  }

  // Patrol behavior is disabled - animals stay still
  // private patrolBehavior(): void {
  //   // Patrol behavior is disabled - animals stay still
  // }

  /**
   * Check if animal is following
   */
  public isFollowing(): boolean {
    return this.state === EntityState.FOLLOWING;
  }

  /**
   * Get current position
   */
  public getPosition(): Vector2D {
    return this.position.clone();
  }

  /**
   * Get animal state
   */
  public getState(): IAnimal {
    return {
      id: this.id,
      position: this.position,
      state: this.state,
      isFollowing: this.isFollowing(),
      followIndex: this.followIndex,
    };
  }

  /**
   * Reset animal to initial state
   */
  public reset(): void {
    this.state = EntityState.IDLE;
    this.followTarget = null;
    this.followIndex = -1;
  }

  /**
   * Draw the animal character
   */
  private drawAnimal(): void {
    this.graphics.clear();
    this.graphics.beginFill(this.ANIMAL_COLOR);
    this.graphics.drawCircle(0, 0, this.ANIMAL_RADIUS);
    this.graphics.endFill();

    // Add a small highlight
    this.graphics.beginFill(0x000000, 0.2);
    this.graphics.drawCircle(-2, -2, 3);
    this.graphics.endFill();

    // Add eyes
    this.graphics.beginFill(0x000000);
    this.graphics.drawCircle(-3, -2, 1);
    this.graphics.drawCircle(3, -2, 1);
    this.graphics.endFill();
  }

  /**
   * Destroy the animal
   */
  public destroy(): void {
    this.container.removeChild(this.graphics);
    this.graphics.destroy();
  }
}
