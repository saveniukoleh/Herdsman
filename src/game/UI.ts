import { Container, Text, Graphics } from 'pixi.js';

/**
 * UI class - handles game interface elements
 */
export class UI {
  private container: Container;
  private scoreText!: Text;
  private gameWidth: number;
  private score: number = 0;

  // UI styling
  private readonly TEXT_STYLE = {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    stroke: 0x000000,
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: 0x000000,
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 2,
  };

  private readonly BACKGROUND_COLOR = 0x2c3e50;
  private readonly BACKGROUND_ALPHA = 0.8;

  constructor(parentContainer: Container, gameWidth: number) {
    this.container = parentContainer;
    this.gameWidth = gameWidth;

    // Create UI elements
    this.createScoreDisplay();
    this.createBackground();
  }

  /**
   * Create the score display
   */
  private createScoreDisplay(): void {
    this.scoreText = new Text({
      text: 'Score: 0',
      style: this.TEXT_STYLE,
    });

    // Position score at top center
    this.scoreText.x = this.gameWidth / 2 - this.scoreText.width / 2;
    this.scoreText.y = 20;

    this.container.addChild(this.scoreText);
  }

  /**
   * Create background for UI
   */
  private createBackground(): void {
    const background = new Graphics();
    background.beginFill(this.BACKGROUND_COLOR, this.BACKGROUND_ALPHA);
    background.drawRect(0, 0, this.gameWidth, 60);
    background.endFill();

    this.container.addChildAt(background, 0);
  }

  /**
   * Update the score display
   */
  public updateScore(newScore: number): void {
    this.score = newScore;
    this.scoreText.text = `Score: ${this.score}`;

    // Re-center the text
    this.scoreText.x = this.gameWidth / 2 - this.scoreText.width / 2;
  }

  /**
   * Get current score
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * Show game over message
   */
  public showGameOver(finalScore: number): void {
    const gameOverText = new Text({
      text: `Game Over!\nFinal Score: ${finalScore}`,
      style: {
        ...this.TEXT_STYLE,
        fontSize: 32,
        fill: 0xff6b6b,
        align: 'center',
      },
    });

    gameOverText.x = this.gameWidth / 2 - gameOverText.width / 2;
    gameOverText.y = 200;

    this.container.addChild(gameOverText);
  }

  /**
   * Show instructions
   */
  public showInstructions(): void {
    const instructions = new Text({
      text: 'Click to move the red hero\nCollect white animals (max 5)\nLead them to the yellow yard',
      style: {
        ...this.TEXT_STYLE,
        fontSize: 16,
        fill: 0xecf0f1,
        align: 'center',
      },
    });

    instructions.x = this.gameWidth / 2 - instructions.width / 2;
    instructions.y = 100;

    this.container.addChild(instructions);

    // Auto-hide instructions after 5 seconds
    setTimeout(() => {
      this.container.removeChild(instructions);
    }, 5000);
  }

  /**
   * Show pause message
   */
  public showPause(): void {
    const pauseText = new Text({
      text: 'PAUSED',
      style: {
        ...this.TEXT_STYLE,
        fontSize: 48,
        fill: 0xf39c12,
        align: 'center',
      },
    });

    pauseText.x = this.gameWidth / 2 - pauseText.width / 2;
    pauseText.y = 250;

    this.container.addChild(pauseText);
  }

  /**
   * Hide pause message
   */
  public hidePause(): void {
    // Remove all pause-related text
    this.container.children.forEach((child) => {
      if (child instanceof Text && child.text === 'PAUSED') {
        this.container.removeChild(child);
      }
    });
  }

  /**
   * Show restart button
   */
  public showRestartButton(): void {
    const restartText = new Text({
      text: 'Press R to restart',
      style: {
        ...this.TEXT_STYLE,
        fontSize: 18,
        fill: 0x3498db,
        align: 'center',
      },
    });

    restartText.x = this.gameWidth / 2 - restartText.width / 2;
    restartText.y = 350;

    this.container.addChild(restartText);
  }

  /**
   * Clear all UI elements except score
   */
  public clear(): void {
    // Keep only the score text and background
    const childrenToRemove = this.container.children.filter(
      (child) => child !== this.scoreText && child instanceof Text
    );

    childrenToRemove.forEach((child) => {
      this.container.removeChild(child);
    });
  }

  /**
   * Destroy the UI
   */
  public destroy(): void {
    this.container.removeChildren();
  }
}
