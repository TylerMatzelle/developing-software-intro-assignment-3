const POST_WIDTH = 3.5;
const BOARD_LENGTH = 8 * 12;
const WASTE_MULTIPLIER = 0.1;
const STUDS_OFFSET = 16;

// POSTS are required every 20 feet at minimum
const POSTS_REQUIRED_EVERY_INCHES = 20 * 12;
const FULL_BOARDS_IN_SECTION = Math.floor(
    POSTS_REQUIRED_EVERY_INCHES / BOARD_LENGTH
);
const FULL_BOARD_SECTION_SIZE = FULL_BOARDS_IN_SECTION * BOARD_LENGTH;

function convertFeetToInches(feet: number) {
    return feet * 12;
}

function getPlatesInLength(inches: number) {
    // devide the length by 96 inches (8 feet) and round up
    // multiply by two because we're doing the top and bottom in one calculation
    return Math.ceil(inches / BOARD_LENGTH) * 2;
}

function getStudsInLength(inches: number) {
    // calculate the studs across
    // round up to account for the last one
    const studs = Math.ceil(inches / STUDS_OFFSET);

    // make sure we add an end piece if we have a perfect multiple of 16
    const isNotPerfectWidth = Math.min(inches % STUDS_OFFSET, 1);
    const perfectWidthExtension = isNotPerfectWidth * -1 + 1;
    return studs + perfectWidthExtension;
}

function getBoardsInLength(inches: number): number {
    const plates = getPlatesInLength(inches);
    const studs = getStudsInLength(inches);

    return plates + studs;
}

function getRequiredPOSTSInLength(inches: number) {
    // for every 20 feet, we need one POST
    // we know our wall is at least 20 feet, so calculate the required POSTS for the REST of the wall
    // if our wall is under 20 feet, this will return zero
    const wallLengthOverMinRequired = getWallLengthOverMinimumRequiredBeforePOST(
        inches
    );
    const wallLengthPlusPOST = POSTS_REQUIRED_EVERY_INCHES + POST_WIDTH;
    const requiredPOSTS = Math.ceil(
        wallLengthOverMinRequired / wallLengthPlusPOST
    );

    return requiredPOSTS;
}

function getWallLengthOverMinimumRequiredBeforePOST(inches: number): number {
    return Math.max(inches - POSTS_REQUIRED_EVERY_INCHES, 0);
}

// any number of inches past POSTS_REQUIRED_EVERY_INCHES will return 1
// any number of inches below or equal to POSTS_REQUIRED_EVERY_INCHES return 0
function isPOSTRequired(inches: number): number {
    // negative numbers are zero
    const wallLengthOverMinRequired = Math.max(
        inches - POSTS_REQUIRED_EVERY_INCHES,
        0
    );

    // remove decimals
    const wholeNumber = Math.ceil(wallLengthOverMinRequired);

    // returns 1 (at least one POST required ) or 0 (no POSTS required)
    const isPOSTRequired = Math.min(wholeNumber, 1);

    return isPOSTRequired;
}

function getFullSections(inches: number, POSTS: number) {
    // how many inches will we remove from a section between POSTS to get to the last full board
    const inchesReducedPerSection =
        POSTS_REQUIRED_EVERY_INCHES - FULL_BOARD_SECTION_SIZE;

    // how big is the last section if all POSTS are at POSTS_REQUIRED_EVERY_INCHES
    const lastSectionSize =
        inches - POSTS * (POSTS_REQUIRED_EVERY_INCHES + POST_WIDTH);

    // how many inches of boards can we add to the last section before it will add an additional POST to the structure
    const remainingBeforeNewPOST =
        POSTS_REQUIRED_EVERY_INCHES - lastSectionSize;

    // how many complete portions of the inchesReducedPerSection can we move to the last section
    let fullSections = Math.floor(
        remainingBeforeNewPOST / inchesReducedPerSection
    );

    // even if we can FIT fullSections moved into the last portion, we might not HAVE them in our length
    fullSections = Math.min(fullSections, POSTS);

    // safeguard inches not requiring a POST and return value
    fullSections = fullSections * isPOSTRequired(inches);

    return fullSections;
}

function getLastSectionSize(inches: number, POSTS: number) {
    const fullSections = getFullSections(inches, POSTS);
    const lastSectionSize =
        inches - POSTS * POST_WIDTH - fullSections * FULL_BOARD_SECTION_SIZE;

    return lastSectionSize;
}

function buildWall(inches: number) {
    // get required POSTS
    const requiredPOSTS = getRequiredPOSTSInLength(inches);
    const fullSections = getFullSections(inches, requiredPOSTS);
    const lastSectionSize = getLastSectionSize(inches, requiredPOSTS);
    const studs =
        getBoardsInLength(FULL_BOARD_SECTION_SIZE) * fullSections +
        getBoardsInLength(lastSectionSize);

    return {
        function: "buildWall",
        inches,
        studs: studs,
        POSTS: requiredPOSTS,
    };
}

function accountForWaste(items: number): number {
    const waste = Math.ceil(items * WASTE_MULTIPLIER);
    return waste + items;
}

export function calculateHouseRequirements(
    widthInFeet: number,
    lengthInFeet: number
) {
    // convert feet to inches
    const outerWidthOfHouse = convertFeetToInches(widthInFeet);
    const outerLengthOfHouse = convertFeetToInches(lengthInFeet);

    // calculate the space inbetween corner POSTS
    const innerWidthOfHouse = outerWidthOfHouse - POST_WIDTH * 2;
    const innerLengthOfHouse = outerLengthOfHouse - POST_WIDTH * 2;

    const wall1 = buildWall(innerWidthOfHouse);
    const wall2 = buildWall(innerLengthOfHouse);

    const studs = accountForWaste((wall1.studs + wall2.studs) * 2);
    const POSTS = accountForWaste((wall1.POSTS + wall2.POSTS) * 2 + 4);

    return {
        studs: studs,
        posts: POSTS,
    };
}
