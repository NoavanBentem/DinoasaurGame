export const gridCells = n => {
    return n * 16;
}

export const isSpaceFree = (walls, x, y) => {
    // Convert to string for easy handling
    const str = `${x},${y}`;
    // Check if walls has an entry here
    const isWallPresent = walls.has(str);
    return !isWallPresent;
}