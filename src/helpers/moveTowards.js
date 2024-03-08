export function moveTowards(person, destinationPosition, speed) {
    let distanceToTravelX = destinationPosition.x - person.position.x;
    let distanceToTravelY = destinationPosition.y - person.position.y;

    let distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);

    if (distance <= speed) {
        // If close enough just move there
        person.position.x = destinationPosition.x;
        person.position.y = destinationPosition.y;
    } else {
        // Otherwise move at specified speed in direction of destination
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;

        person.position.x += normalizedX * speed;
        person.position.y += normalizedY * speed;

        // Recalculate remaining distance after the move
        distanceToTravelX = destinationPosition.x - person.position.x;
        distanceToTravelY = destinationPosition.y - person.position.y;
        distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);
    }

    return distance;
}