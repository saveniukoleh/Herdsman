import { Application, Container, Ticker, Graphics, Rectangle } from 'pixi.js';
import { Hero } from './Hero';
import { Animal } from './Animal';
import { Yard } from './Yard';
import { UI } from './UI';
import { SpawnManager } from './SpawnManager';
import { Random } from './utils/Random';
import type { GameConfig, GameState, GameEvents } from '../types.d';

/**
 * Main game controller class
 */
export class Game {
  private app: Application;
  private config: GameConfig;
  private gameState: GameState;
  private events: GameEvents;
  private ticker: Ticker;

  // Game entities
  private hero!: Hero;
  private animals: Animal[] = [];
  private yard!: Yard;
  private ui!: UI;
  private spawnManager!: SpawnManager;
  private background!: Graphics;

  // Game containers
  private gameContainer: Container;
  private uiContainer: Container;

  constructor(app: Application, config: GameConfig) {
    this.app = app;
    this.config = config;
    this.ticker = new Ticker();

    // Initialize game state
    this.gameState = {
      score: 0,
      isRunning: false,
      animals: [],
      hero: {
        position: { x: 400, y: 300 },
        targetPosition: { x: 400, y: 300 },
        followers: [],
        isMoving: false,
      },
    };

    // Initialize events
    this.events = {
      scoreUpdated: (score: number) => {
        this.gameState.score = score;
        this.ui.updateScore(score);
      },
      animalCollected: (animal) => {
        console.log(`Animal ${animal.id} collected!`);
      },
      animalDelivered: (animal) => {
        console.log(`Animal ${animal.id} delivered to yard!`);
        this.events.scoreUpdated(this.gameState.score + 1);
      },
    };

    // Create containers
    this.gameContainer = new Container();
    this.uiContainer = new Container();

    // Add containers to stage
    this.app.stage.addChild(this.gameContainer);
    this.app.stage.addChild(this.uiContainer);
  }

  /**
   * Initialize the game
   */
  public init(): void {
    console.log('🎮 Initializing game...');

    // Create game entities
    this.createBackground();
    this.createHero();
    this.createYard();
    this.createAnimals();
    this.createUI();
    this.createSpawnManager();

    // Set up game loop
    this.setupGameLoop();

    // Set up input handling
    this.setupInput();

    this.gameState.isRunning = true;
    console.log('✅ Game initialized successfully!');
    console.log('🎮 Game state is running:', this.gameState.isRunning);
  }

  /**
   * Start the game
   */
  public start(): void {
    console.log('🚀 Starting game...');
    console.log('Game state is running:', this.gameState.isRunning);
    if (!this.gameState.isRunning) {
      console.log('❌ Game not running, cannot start');
      return;
    }

    this.ticker.start();
    console.log('✅ Game ticker started');
  }

  /**
   * Stop the game
   */
  public stop(): void {
    console.log('⏹️ Stopping game...');
    this.ticker.stop();
    this.gameState.isRunning = false;
  }

  /**
   * Reset the game
   */
  public reset(): void {
    console.log('🔄 Resetting game...');
    this.stop();

    // Reset game state
    this.gameState.score = 0;
    this.gameState.animals = [];
    this.gameState.hero.followers = [];
    this.gameState.hero.isMoving = false;

    // Reset entities
    this.hero.reset();
    this.animals.forEach((animal) => animal.destroy());
    this.animals = [];
    this.yard.reset();
    this.ui.updateScore(0);

    // Recreate animals
    this.createAnimals();

    // Restart game
    this.start();
  }

  /**
   * Create the background
   */
  private createBackground(): void {
    this.background = new Graphics();
    this.background.beginFill(0x2ecc71); // Green color
    this.background.drawRect(
      0,
      0,
      this.config.GAME_WIDTH,
      this.config.GAME_HEIGHT
    );
    this.background.endFill();
    this.background.interactive = true; // Make background clickable
    // Set hit area to cover the entire game area
    this.background.hitArea = new Rectangle(
      0,
      0,
      this.config.GAME_WIDTH,
      this.config.GAME_HEIGHT
    );
    this.gameContainer.addChildAt(this.background, 0); // Add as first child (behind everything)

    console.log('Background created:', this.background.getBounds());
  }

  /**
   * Create the hero character
   */
  private createHero(): void {
    this.hero = new Hero(
      this.gameContainer,
      this.config.HERO_SPEED,
      this.config.GAME_WIDTH,
      this.config.GAME_HEIGHT
    );
  }

  /**
   * Create the yard destination
   */
  private createYard(): void {
    console.log(
      `🏠 Creating yard at position: (${this.config.YARD_POSITION.x}, ${this.config.YARD_POSITION.y})`
    );
    console.log(
      `🏠 Yard size: ${this.config.YARD_SIZE.width}x${this.config.YARD_SIZE.height}`
    );

    this.yard = new Yard(
      this.gameContainer,
      this.config.YARD_POSITION,
      this.config.YARD_SIZE
    );

    console.log(`🏠 Yard created successfully`);
  }

  /**
   * Create animals at random positions
   */
  private createAnimals(): void {
    const animalCount = Random.int(
      this.config.ANIMAL_SPAWN_COUNT.min,
      this.config.ANIMAL_SPAWN_COUNT.max
    );

    for (let i = 0; i < animalCount; i++) {
      const position = Random.animalSpawnPosition(
        this.config.GAME_WIDTH,
        this.config.GAME_HEIGHT,
        this.hero.getPosition()
      );

      const animal = new Animal(
        this.gameContainer,
        position,
        this.config.FOLLOW_RADIUS,
        this.config.GAME_WIDTH,
        this.config.GAME_HEIGHT
      );

      this.animals.push(animal);
      this.gameState.animals.push(animal.getState());
    }

    console.log(`🐑 Created ${animalCount} animals`);
  }

  /**
   * Create the UI
   */
  private createUI(): void {
    this.ui = new UI(this.uiContainer, this.config.GAME_WIDTH);
  }

  /**
   * Create the spawn manager
   */
  private createSpawnManager(): void {
    this.spawnManager = new SpawnManager(
      this.gameContainer,
      this.config.GAME_WIDTH,
      this.config.GAME_HEIGHT,
      8000, // 8 seconds spawn interval
      this.config.FOLLOW_RADIUS
    );
  }

  /**
   * Set up the game loop
   */
  private setupGameLoop(): void {
    this.ticker.add(() => {
      if (!this.gameState.isRunning) return;

      this.update();
    });

    console.log('🎮 Game loop setup complete');
  }

  /**
   * Update game logic
   */
  private update(): void {
    try {
      // Update hero
      this.hero.update();

      // Clean up any invalid followers
      this.hero.cleanupInvalidFollowers();

      // Update animals
      this.animals.forEach((animal) => {
        if (animal && animal.graphics && !animal.graphics.destroyed) {
          animal.update();
        }
      });

      // Update spawn manager
      this.spawnManager.update(Date.now(), this.hero.getPosition());

      // Add newly spawned animals to the game
      const newAnimals = this.spawnManager.getAnimals();
      newAnimals.forEach((animal) => {
        if (!this.animals.includes(animal)) {
          this.animals.push(animal);
          this.gameState.animals.push(animal.getState());
        }
      });

      // Check for animal collection
      this.checkAnimalCollection();

      // Check for yard delivery
      this.checkYardDelivery();
    } catch (error) {
      console.error('❌ Error in game update:', error);
    }
  }

  /**
   * Check if hero is close enough to collect animals
   */
  private checkAnimalCollection(): void {
    try {
      const heroPosition = this.hero.getPosition();
      const currentFollowers = this.hero.getFollowers().length;

      this.animals.forEach((animal) => {
        if (
          animal &&
          !animal.isFollowing() &&
          currentFollowers < this.config.MAX_FOLLOWERS &&
          animal.getPosition().distanceTo(heroPosition) <=
            this.config.FOLLOW_RADIUS
        ) {
          animal.startFollowing(this.hero);
          this.hero.addFollower(animal);
          this.events.animalCollected(animal.getState());
        }
      });
    } catch (error) {
      console.error('❌ Error in checkAnimalCollection:', error);
    }
  }

  /**
   * Check if any animals have reached the yard
   */
  private checkYardDelivery(): void {
    try {
      const followers = this.hero.getFollowers();

      // Create a copy of followers to avoid modification during iteration
      const followersToCheck = [...followers];

      followersToCheck.forEach((animal) => {
        if (animal) {
          const animalPos = animal.getPosition();
          const yardBounds = this.yard.getBounds();
          const isInYard = this.yard.containsPoint(animalPos);

          console.log(`🔍 Checking animal ${animal.getState().id}:`);
          console.log(`  Animal position: (${animalPos.x}, ${animalPos.y})`);
          console.log(
            `  Yard bounds: x=${yardBounds.x}, y=${yardBounds.y}, w=${yardBounds.width}, h=${yardBounds.height}`
          );
          console.log(`  Is in yard: ${isInYard}`);

          if (isInYard) {
            console.log(`🎯 Animal ${animal.getState().id} reached the yard!`);
            console.log(
              `  Followers before removal: ${this.hero.getFollowers().length}`
            );

            // Remove animal from hero's followers
            this.hero.removeFollower(animal);
            console.log(
              `  Followers after removal: ${this.hero.getFollowers().length}`
            );

            // Remove animal from game
            animal.destroy();
            this.animals = this.animals.filter((a) => a !== animal);

            // Update score
            this.events.animalDelivered(animal.getState());

            console.log(`🎯 Animal delivered! Score: ${this.gameState.score}`);
            console.log(`  Remaining animals: ${this.animals.length}`);
          }
        }
      });
    } catch (error) {
      console.error('❌ Error in checkYardDelivery:', error);
    }
  }

  /**
   * Set up input handling
   */
  private setupInput(): void {
    console.log('🎮 Setting up input handlers...');

    // Make the entire stage interactive as the main solution
    this.app.stage.interactive = true;
    this.app.stage.hitArea = this.app.screen;
    this.app.stage.on('pointerdown', (event) => {
      console.log('🎯 Stage click event triggered!');
      console.log('Game state is running:', this.gameState.isRunning);
      if (!this.gameState.isRunning) {
        console.log('❌ Game not running, ignoring click');
        return;
      }

      const position = event.global;
      console.log('🎯 Stage clicked at:', position.x, position.y);
      this.hero.moveTo(position);
    });

    // Add click handler to the background (covers entire game area)
    this.background.on('pointerdown', (event) => {
      console.log('🎯 Background click event triggered!');
      console.log('Game state is running:', this.gameState.isRunning);
      if (!this.gameState.isRunning) {
        console.log('❌ Game not running, ignoring click');
        return;
      }

      const position = event.global;
      console.log('🎯 Background clicked at:', position.x, position.y);
      this.hero.moveTo(position);
    });

    // Also add a click handler to the game container as backup
    this.gameContainer.interactive = true;
    this.gameContainer.on('pointerdown', (event) => {
      console.log('🎯 Game container click event triggered!');
      if (!this.gameState.isRunning) {
        console.log('❌ Game not running, ignoring click');
        return;
      }

      const position = event.global;
      console.log('🎯 Game container clicked at:', position.x, position.y);
      this.hero.moveTo(position);
    });

    // Also add click handler to the canvas element as backup
    this.app.canvas.addEventListener('click', (event) => {
      console.log('🎯 Canvas click event triggered!');
      if (!this.gameState.isRunning) {
        console.log('❌ Game not running, ignoring click');
        return;
      }

      const rect = this.app.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      console.log('🎯 Canvas clicked at:', x, y);
      this.hero.moveTo({ x, y });
    });

    console.log('✅ Input handlers setup complete');
  }

  /**
   * Get current game state
   */
  public getGameState(): GameState {
    return { ...this.gameState };
  }

  /**
   * Get game configuration
   */
  public getConfig(): GameConfig {
    return { ...this.config };
  }
}
