import { Application } from 'pixi.js';
import { Game } from './game/Game';
import type { GameConfig } from './types';

/**
 * Game configuration constants
 */
const GAME_CONFIG: GameConfig = {
  GAME_WIDTH: 800,
  GAME_HEIGHT: 600,
  HERO_SPEED: 200,
  FOLLOW_RADIUS: 80,
  MAX_FOLLOWERS: 5,
  ANIMAL_SPAWN_COUNT: { min: 3, max: 8 },
  YARD_POSITION: { x: 50, y: 50 },
  YARD_SIZE: { width: 100, height: 80 },
};

/**
 * Initialize the game application
 */
async function initGame(): Promise<void> {
  // Create PixiJS application
  const app = new Application();

  // Initialize the application
  await app.init({
    width: GAME_CONFIG.GAME_WIDTH,
    height: GAME_CONFIG.GAME_HEIGHT,
    backgroundColor: 0x2ecc71, // Green background
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  // Append the application canvas to the game container
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.appendChild(app.canvas);
  } else {
    document.body.appendChild(app.canvas);
  }

  // Create the main game instance
  const game = new Game(app, GAME_CONFIG);

  // Initialize the game
  game.init();

  // Start the game loop
  game.start();

  // Handle window resize
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  console.log('🐑 Herdsman game initialized successfully!');
}

/**
 * Handle any initialization errors
 */
function handleError(error: Error): void {
  console.error('Failed to initialize game:', error);

  // Display error message to user
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <h2>🚫 Game Initialization Error</h2>
        <p>Failed to load the game. Please refresh the page and try again.</p>
        <p style="font-size: 12px; opacity: 0.7;">Error: ${error.message}</p>
      </div>
    `;
  }
}

// Initialize the game when the DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initGame().catch(handleError);
  });
} else {
  initGame().catch(handleError);
}
