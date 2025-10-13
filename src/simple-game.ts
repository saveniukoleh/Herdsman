import { Application, Graphics } from 'pixi.js';

// Simple game test
async function initSimpleGame(): Promise<void> {
  console.log('🎮 Starting simple game test...');

  try {
    // Create PixiJS application
    const app = new Application();

    // Initialize the application
    await app.init({
      width: 800,
      height: 600,
      backgroundColor: 0x2ecc71, // Green background
      antialias: true,
    });

    // Append the application canvas to the game container
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.appendChild(app.canvas);
    }

    // Create a simple red circle (hero)
    const hero = new Graphics();
    hero.beginFill(0xe74c3c); // Red color
    hero.drawCircle(0, 0, 15);
    hero.endFill();
    hero.x = 400;
    hero.y = 300;
    app.stage.addChild(hero);

    // Create a simple white circle (animal)
    const animal = new Graphics();
    animal.beginFill(0xffffff); // White color
    animal.drawCircle(0, 0, 12);
    animal.endFill();
    animal.x = 200;
    animal.y = 200;
    app.stage.addChild(animal);

    // Create a simple yellow rectangle (yard)
    const yard = new Graphics();
    yard.beginFill(0xf1c40f); // Yellow color
    yard.drawRect(0, 0, 100, 80);
    yard.endFill();
    yard.x = 50;
    yard.y = 50;
    app.stage.addChild(yard);

    // Add click handler for movement
    app.stage.interactive = true;
    app.stage.on('pointerdown', (event) => {
      console.log('Clicked at:', event.global.x, event.global.y);
      hero.x = event.global.x;
      hero.y = event.global.y;
    });

    console.log('✅ Simple game initialized successfully!');
    console.log('Click anywhere to move the red hero!');
  } catch (error) {
    console.error('❌ Failed to initialize simple game:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSimpleGame);
} else {
  initSimpleGame();
}
