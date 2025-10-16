import { Container, Graphics } from 'pixi.js';
import { Collision } from './utils/Collision';
import type { IVector2D } from '../types.d';

/**
 * Yard class - destination area where animals are delivered
 */
export class Yard {
  private container: Container;
  private graphics: Graphics;
  private position: IVector2D;
  private size: { width: number; height: number };

  // Yard visual properties
  private readonly YARD_COLOR = 0xf1c40f; // Yellow color
  private readonly YARD_BORDER_COLOR = 0xe67e22; // Orange border

  constructor(
    parentContainer: Container,
    position: IVector2D,
    size: { width: number; height: number }
  ) {
    this.container = parentContainer;
    this.position = { x: position.x, y: position.y };
    this.size = { width: size.width, height: size.height };

    // Create yard graphics
    this.graphics = new Graphics();
    this.graphics.interactive = false; // Make sure yard doesn't block clicks

    // Draw yard with proper yellow color
    console.log(`🎨 Drawing yard with yellow color`);
    this.graphics.beginFill(this.YARD_COLOR, 1.0); // Yellow color
    this.graphics.drawRect(0, 0, this.size.width, this.size.height);
    this.graphics.endFill();

    // Add a border for better visibility
    this.graphics.lineStyle(3, this.YARD_BORDER_COLOR);
    this.graphics.drawRect(0, 0, this.size.width, this.size.height);

    this.container.addChild(this.graphics);

    // Position the yard graphics at the correct location
    this.graphics.x = this.position.x;
    this.graphics.y = this.position.y;

    console.log(
      `🏠 Yard created at (${this.graphics.x}, ${this.graphics.y}) with size ${this.size.width}x${this.size.height}`
    );
  }

  /**
   * Check if a point is inside the yard
   */
  public containsPoint(point: IVector2D): boolean {
    return Collision.pointInRect(
      point,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  /**
   * Check if a circle intersects with the yard
   */
  public intersectsCircle(center: IVector2D, radius: number): boolean {
    return Collision.circleRectIntersect(
      center,
      radius,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  /**
   * Get yard position
   */
  public getPosition(): IVector2D {
    return { ...this.position };
  }

  /**
   * Get yard size
   */
  public getSize(): { width: number; height: number } {
    return { ...this.size };
  }

  /**
   * Get yard bounds for collision detection
   */
  public getBounds(): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.size.width,
      height: this.size.height,
    };
  }

  /**
   * Reset yard to initial state
   */
  public reset(): void {
    // Yard doesn't need reset as it's static
  }

  /**
   * Draw the yard area
   */
  private drawYard(): void {
    this.graphics.clear();

    // Draw yard background (at 0,0 since graphics object is positioned)
    console.log(
      `🎨 Drawing yard with color: ${this.YARD_COLOR.toString(16)} (bright yellow)`
    );
    console.log(`🎨 Yard size: ${this.size.width}x${this.size.height}`);

    // Try a different approach - draw multiple rectangles to ensure visibility
    this.graphics.beginFill(this.YARD_COLOR, 1.0);
    this.graphics.drawRect(0, 0, this.size.width, this.size.height);
    this.graphics.endFill();

    // Draw a second rectangle to ensure it's visible
    this.graphics.beginFill(this.YARD_COLOR, 1.0);
    this.graphics.drawRect(2, 2, this.size.width - 4, this.size.height - 4);
    this.graphics.endFill();

    // Draw yard border
    this.graphics.lineStyle(5, this.YARD_BORDER_COLOR); // Thicker border
    this.graphics.drawRect(0, 0, this.size.width, this.size.height);

    // Add yard label
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0x000000);
    this.graphics.drawRect(
      this.size.width / 2 - 20,
      this.size.height / 2 - 5,
      40,
      10
    );
    this.graphics.endFill();

    // Add some decorative elements
    this.addYardDecorations();
  }

  /**
   * Add decorative elements to the yard
   */
  private addYardDecorations(): void {
    // Add fence posts
    const postSpacing = this.size.width / 6;
    for (let i = 0; i < 5; i++) {
      const x = postSpacing * (i + 1);
      this.graphics.lineStyle(2, 0x8b4513);
      this.graphics.moveTo(x, 0);
      this.graphics.lineTo(x, this.size.height);
    }

    // Add grass texture
    this.graphics.lineStyle(1, 0x27ae60, 0.3);
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.size.width;
      const y = Math.random() * this.size.height;
      this.graphics.moveTo(x, y);
      this.graphics.lineTo(x + 2, y + 2);
    }
  }

  /**
   * Destroy the yard
   */
  public destroy(): void {
    this.container.removeChild(this.graphics);
    this.graphics.destroy();
  }
}
