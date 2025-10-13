import { Animal } from './Animal';
import { Random } from './utils/Random';
import type { IVector2D } from '../types';

/**
 * SpawnManager class - handles dynamic animal spawning
 */
export class SpawnManager {
  private animals: Animal[] = [];
  private spawnInterval: number;
  private lastSpawnTime: number = 0;
  private gameWidth: number;
  private gameHeight: number;
  private heroPosition: IVector2D;
  private parentContainer: any;
  private followRadius: number;

  constructor(
    parentContainer: any,
    gameWidth: number,
    gameHeight: number,
    spawnInterval: number = 5000, // 5 seconds
    followRadius: number = 80
  ) {
    this.parentContainer = parentContainer;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.spawnInterval = spawnInterval;
    this.followRadius = followRadius;
    this.heroPosition = { x: gameWidth / 2, y: gameHeight / 2 };
  }

  /**
   * Update spawn manager
   */
  public update(currentTime: number, heroPosition: IVector2D): void {
    this.heroPosition = heroPosition;

    // Check if it's time to spawn a new animal
    if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
      this.spawnAnimal();
      this.lastSpawnTime = currentTime;
    }
  }

  /**
   * Spawn a new animal at a random position
   */
  private spawnAnimal(): void {
    // Generate spawn position avoiding hero and existing animals
    const avoidAreas = [
      {
        x: this.heroPosition.x - 100,
        y: this.heroPosition.y - 100,
        width: 200,
        height: 200,
      },
    ];

    // Add existing animal positions to avoid areas
    this.animals.forEach((animal) => {
      const pos = animal.getPosition();
      avoidAreas.push({
        x: pos.x - 50,
        y: pos.y - 50,
        width: 100,
        height: 100,
      });
    });

    const spawnPosition = Random.positionAvoidingAreas(
      this.gameWidth,
      this.gameHeight,
      avoidAreas,
      30, // margin
      50 // max attempts
    );

    // Create new animal
    const animal = new Animal(
      this.parentContainer,
      spawnPosition,
      this.followRadius
    );

    this.animals.push(animal);
    console.log(
      `🐑 Spawned new animal at (${spawnPosition.x}, ${spawnPosition.y})`
    );
  }

  /**
   * Get all spawned animals
   */
  public getAnimals(): Animal[] {
    return this.animals;
  }

  /**
   * Remove an animal from the spawn manager
   */
  public removeAnimal(animal: Animal): void {
    const index = this.animals.indexOf(animal);
    if (index !== -1) {
      this.animals.splice(index, 1);
    }
  }

  /**
   * Set spawn interval
   */
  public setSpawnInterval(interval: number): void {
    this.spawnInterval = interval;
  }

  /**
   * Get current spawn interval
   */
  public getSpawnInterval(): number {
    return this.spawnInterval;
  }

  /**
   * Pause spawning
   */
  public pause(): void {
    this.spawnInterval = 0;
  }

  /**
   * Resume spawning
   */
  public resume(interval: number = 5000): void {
    this.spawnInterval = interval;
  }

  /**
   * Clear all spawned animals
   */
  public clear(): void {
    this.animals.forEach((animal) => animal.destroy());
    this.animals = [];
  }

  /**
   * Get spawn statistics
   */
  public getStats(): {
    totalSpawned: number;
    currentlyActive: number;
    spawnInterval: number;
  } {
    return {
      totalSpawned: this.animals.length,
      currentlyActive: this.animals.filter((animal) => !animal.isFollowing())
        .length,
      spawnInterval: this.spawnInterval,
    };
  }
}

