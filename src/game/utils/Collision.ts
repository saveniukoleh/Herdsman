import type { IVector2D } from '../../types.d';

/**
 * Collision detection utilities
 */
export class Collision {
  /**
   * Check if a point is inside a rectangle
   */
  public static pointInRect(
    point: IVector2D,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ): boolean {
    return (
      point.x >= rectX &&
      point.x <= rectX + rectWidth &&
      point.y >= rectY &&
      point.y <= rectY + rectHeight
    );
  }

  /**
   * Check if a point is inside a circle
   */
  public static pointInCircle(
    point: IVector2D,
    circleCenter: IVector2D,
    radius: number
  ): boolean {
    const distance = Math.sqrt(
      (point.x - circleCenter.x) ** 2 + (point.y - circleCenter.y) ** 2
    );
    return distance <= radius;
  }

  /**
   * Check if two circles intersect
   */
  public static circleIntersect(
    center1: IVector2D,
    radius1: number,
    center2: IVector2D,
    radius2: number
  ): boolean {
    const distance = Math.sqrt(
      (center1.x - center2.x) ** 2 + (center1.y - center2.y) ** 2
    );
    return distance <= radius1 + radius2;
  }

  /**
   * Check if a circle intersects with a rectangle
   */
  public static circleRectIntersect(
    circleCenter: IVector2D,
    radius: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ): boolean {
    // Find the closest point on the rectangle to the circle center
    const closestX = Math.max(
      rectX,
      Math.min(circleCenter.x, rectX + rectWidth)
    );
    const closestY = Math.max(
      rectY,
      Math.min(circleCenter.y, rectY + rectHeight)
    );

    // Calculate distance between circle center and closest point
    const distanceX = circleCenter.x - closestX;
    const distanceY = circleCenter.y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    return distanceSquared <= radius * radius;
  }

  /**
   * Check if two rectangles intersect
   */
  public static rectIntersect(
    x1: number,
    y1: number,
    width1: number,
    height1: number,
    x2: number,
    y2: number,
    width2: number,
    height2: number
  ): boolean {
    return (
      x1 < x2 + width2 &&
      x1 + width1 > x2 &&
      y1 < y2 + height2 &&
      y1 + height1 > y2
    );
  }

  /**
   * Get the closest point on a rectangle to a given point
   */
  public static closestPointOnRect(
    point: IVector2D,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ): IVector2D {
    const closestX = Math.max(rectX, Math.min(point.x, rectX + rectWidth));
    const closestY = Math.max(rectY, Math.min(point.y, rectY + rectHeight));
    return { x: closestX, y: closestY };
  }

  /**
   * Check if a point is within a certain distance of another point
   */
  public static withinDistance(
    point1: IVector2D,
    point2: IVector2D,
    distance: number
  ): boolean {
    const dist = Math.sqrt(
      (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2
    );
    return dist <= distance;
  }
}
